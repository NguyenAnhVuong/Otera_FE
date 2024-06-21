import axiosJWT from "@/api/axiosJWT";
import { uploadApi } from "@/api/uploadApi";
import ContributeImageButton from "@/components/Atoms/ContributeImageButton";
import Loading from "@/components/Atoms/Loading";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import {
  GetDeceasedDocument,
  useAddDeceasedImageMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Form, FormProps, Modal } from "antd";
import React, { useState } from "react";

type ContributeImageModalProps = {
  deceasedId: number;
};

type FieldType = {
  images: string[];
};

const ContributeImageModal: React.FC<ContributeImageModalProps> = ({
  deceasedId,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [addDeceasedImage, { loading }] = useAddDeceasedImageMutation({
    onCompleted: () => {
      resetModal();
      setIsModalOpen(false);
      messageApi.success(localeText.deceased.contributeImageSuccessMessage);
    },
    onError: () => {
      messageApi.error(localeText.deceased.contributeImageFailMessage);
    },
    refetchQueries: [GetDeceasedDocument],
  });
  const resetModal = () => {
    form.resetFields();
    setNewImagePreviews([]);
    setNewImages([]);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (error) {}
  };

  const handleCancel = () => {
    resetModal();
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    setUploadLoading(true);
    const formData = new FormData();
    newImages.forEach((image) => {
      formData.append("files", image);
    });
    const res = await uploadApi.uploadImages(formData);
    const newContributeImages = res.data.map((image: any) => image.url);

    await addDeceasedImage({
      variables: {
        addDeceasedImageInput: {
          id: deceasedId,
          images: newContributeImages,
        },
      },
    });

    setUploadLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ContributeImageButton onClick={showModal} />
      <Modal
        title={localeText.deceased.contributeImage}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={456}
      >
        {(uploadLoading || loading) && <Loading />}
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            className="text-center"
            label={localeText.deceased.descriptionImages}
            name="images"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.deceased.descriptionImages
                ),
              },
            ]}
          >
            <div>
              <UploadDescriptionImage
                setNewDescriptionImages={setNewImages}
                newDescriptionImagePreviews={newImagePreviews}
                setNewDescriptionImagePreviews={setNewImagePreviews}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ContributeImageModal;
