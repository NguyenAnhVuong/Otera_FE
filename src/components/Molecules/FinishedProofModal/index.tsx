import { uploadApi } from "@/api/uploadApi";
import FinishButton from "@/components/Atoms/FinishButton";
import Loading from "@/components/Atoms/Loading";
import ShowDetailButton from "@/components/Atoms/ShowDetailButton";
import StepForwardButton from "@/components/Atoms/StepForwardButton";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  EDeathAnniversaryStatus,
  TempleGetDeathAnniversariesDocument,
  useTempleUpdateDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Form, FormProps, Modal } from "antd";
import React, { useState } from "react";

type FinishedProofModalProps = {
  deathAnniversaryId: number;
  readyImage?: string | null;
  finishedImage?: string | null;
  isReadOnly?: boolean;
  actualEndTime?: Date | null;
};

type FieldType = {
  readyProof: string;
};

const FinishedProofModal: React.FC<FinishedProofModalProps> = ({
  deathAnniversaryId,
  readyImage,
  finishedImage,
  isReadOnly = false,
  actualEndTime,
}) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { localeText } = useTrans();
  const [finishProof, setFinishProof] = useState<File | null>(null);
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [templeUpdateDeathAnniversary, { loading }] =
    useTempleUpdateDeathAnniversaryMutation({
      onCompleted: () => {
        messageApi.success(localeText.deathAnniversary.finishSuccessMessage);
        setIsModalOpen(false);
      },
      onError: () => {
        messageApi.error(localeText.deathAnniversary.finishFailMessage);
      },
      refetchQueries: [TempleGetDeathAnniversariesDocument],
    });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {
      return;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    if (!finishProof) return;
    const formData = new FormData();
    formData.append("file", finishProof);
    setUploadLoading(true);
    const res = await uploadApi.uploadImage(formData);
    setUploadLoading(false);
    const finishedImageUrl = res.data.url;

    await templeUpdateDeathAnniversary({
      variables: {
        templeUpdateDeathAnniversaryInput: {
          id: deathAnniversaryId,
          finishedImage: finishedImageUrl,
          status: EDeathAnniversaryStatus.Finished,
        },
      },
    });
  };

  return (
    <>
      {isReadOnly ? (
        <ShowDetailButton onClick={showModal} />
      ) : (
        actualEndTime &&
        new Date(actualEndTime) < new Date() && (
          <FinishButton onClick={showModal} />
        )
      )}
      <Modal
        title={localeText.deathAnniversary.finish}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={380}
        footer={isReadOnly ? null : undefined}
      >
        {(loading || uploadLoading) && <Loading />}
        <div className="flex items-center justify-center">
          <UploadSingleImage
            imageSrc={readyImage}
            setUploadImage={setFinishProof}
            isReadOnly={true}
          />
          <ArrowRightOutlined className="text-6xl text-primary mx-4" />
          <Form
            form={form}
            className="flex justify-center"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              className="text-center"
              name="readyProof"
              label={localeText.deathAnniversary.proofImage}
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deathAnniversary.proofImage
                  ),
                },
              ]}
            >
              <div className="flex justify-center">
                <UploadSingleImage
                  imageSrc={finishedImage}
                  setUploadImage={setFinishProof}
                  isReadOnly={isReadOnly}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default FinishedProofModal;
