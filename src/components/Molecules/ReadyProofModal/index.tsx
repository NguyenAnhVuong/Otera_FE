import { uploadApi } from "@/api/uploadApi";
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
import { Form, FormProps, Modal } from "antd";
import React, { useState } from "react";

type ProofModalProps = {
  deathAnniversaryId: number;
  proofImage?: string | null;
  isReadOnly?: boolean;
};

type FieldType = {
  readyProof: string;
};

const ReadyProofModal: React.FC<ProofModalProps> = ({
  deathAnniversaryId,
  proofImage,
  isReadOnly = false,
}) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { localeText } = useTrans();
  const [readyProof, setReadyProof] = useState<File | null>(null);
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [templeUpdateDeathAnniversary, { loading }] =
    useTempleUpdateDeathAnniversaryMutation({
      onCompleted: () => {
        messageApi.success(localeText.deathAnniversary.readySuccessMessage);
        setIsModalOpen(false);
      },
      onError: () => {
        messageApi.error(localeText.deathAnniversary.readyFailMessage);
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
    if (!readyProof) return;
    const formData = new FormData();
    formData.append("file", readyProof);
    setUploadLoading(true);
    const res = await uploadApi.uploadImage(formData);
    setUploadLoading(false);
    const readyImage = res.data.url;

    await templeUpdateDeathAnniversary({
      variables: {
        templeUpdateDeathAnniversaryInput: {
          id: deathAnniversaryId,
          readyImage: readyImage,
          status: EDeathAnniversaryStatus.Ready,
        },
      },
    });
  };

  return (
    <>
      {isReadOnly ? (
        <ShowDetailButton onClick={showModal} />
      ) : (
        <StepForwardButton onClick={showModal} />
      )}
      <Modal
        title={localeText.deathAnniversary.ready}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={200}
        footer={isReadOnly ? null : undefined}
      >
        {(loading || uploadLoading) && <Loading />}
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
                imageSrc={proofImage}
                setUploadImage={setReadyProof}
                isReadOnly={isReadOnly}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReadyProofModal;
