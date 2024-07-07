"use client";
import { uploadApi } from "@/api/uploadApi";
import Loading from "@/components/Atoms/Loading";
import Tiptap from "@/components/Organisms/TipTap";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  GetTempleDetailDocument,
  GetTemplesDocument,
  VUpdateTempleInput,
  useGetTempleDetailQuery,
  useUpdateTempleMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UpdateTempleProps = {
  id: number;
};

type FieldType = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  avatar?: string;
  descriptionImages?: string[];
  description?: string;
};

const UpdateTemple: React.FC<UpdateTempleProps> = ({ id }) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [oldAvatar, setOldAvatar] = useState<string>("");
  const [oldDescriptionImages, setOldDescriptionImages] = useState<string[]>(
    []
  );
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState<
    string[]
  >([]);
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const [updateTemple, { loading }] = useUpdateTempleMutation({
    refetchQueries: [GetTemplesDocument, GetTempleDetailDocument],
    onCompleted: () => {
      messageApi.open({
        type: "success",
        content: localeText.temple.updateTemple.successMessage,
      });
      router.push(`/temple/${id}`);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: localeText.temple.updateTemple.failMessage,
      });
    },
  });

  useGetTempleDetailQuery({
    variables: { id },
    onCompleted: (data) => {
      form.setFieldsValue({
        name: data.getTempleDetail.data.name,
        phone: data.getTempleDetail.data.phone,
        email: data.getTempleDetail.data.email,
        address: data.getTempleDetail.data.address,
        website: data.getTempleDetail.data.website,
        description: data.getTempleDetail.data.description,
        avatar: data.getTempleDetail.data.avatar,
        descriptionImages: data.getTempleDetail.data.images.map(
          (image) => image.image
        ),
      });
      setOldAvatar(data.getTempleDetail.data.avatar);
      setOldDescriptionImages(
        data.getTempleDetail.data.images.map((image) => image.image)
      );
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsUploading(true);
    const updateTempleInput: VUpdateTempleInput = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      website: values.website,
      description: values.description,
    };
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      const res = await uploadApi.uploadImage(formData);
      updateTempleInput.avatar = res.data.url;
    }

    if (descriptionImages && descriptionImages.length > 0) {
      const formData = new FormData();
      descriptionImages.forEach((image) => {
        formData.append("files", image);
      });

      const res = await uploadApi.uploadImages(formData);
      updateTempleInput.descriptionImages = res.data.map(
        (image: any) => image.url
      );
    }

    await updateTemple({
      variables: {
        updateTempleInput,
      },
    });
    setIsUploading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center py-header ">
      {(loading || isUploading) && <Loading />}
      <div className="bg-white flex justify-center px-5 py-4 pt-8 shadow-xl w-full max-w-[688px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <div className="grid grid-cols-9 gap-2">
            <Form.Item<FieldType>
              className="col-span-3"
              label={localeText.temple.name}
              name="name"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.temple.name
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.temple.name} />
            </Form.Item>

            <Form.Item<FieldType>
              className="col-span-2"
              label={localeText.temple.phone}
              name="phone"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.temple.phone
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.temple.phone} />
            </Form.Item>

            <Form.Item<FieldType>
              className="col-span-4"
              label={localeText.temple.email}
              name="email"
              rules={[
                {
                  type: "email",
                  message: localeText.validateMessages.types.email,
                },
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.temple.email
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.temple.email} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-6 gap-2">
            <Form.Item<FieldType>
              className="col-span-4"
              label={localeText.temple.address}
              name="address"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.temple.address
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.temple.address} />
            </Form.Item>

            <Form.Item<FieldType>
              className="col-span-2"
              label={localeText.temple.website}
              name="website"
            >
              <Input placeholder={localeText.temple.website} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-5">
            <Form.Item<FieldType>
              className="col-span-1"
              label={localeText.temple.avatar}
              name="avatar"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.temple.avatar
                  ),
                },
              ]}
            >
              <div>
                <UploadSingleImage
                  imageSrc={oldAvatar}
                  setUploadImage={setAvatar}
                />
              </div>
            </Form.Item>

            <Form.Item<FieldType>
              className="col-span-4"
              label={localeText.temple.descriptionImages}
              name="descriptionImages"
            >
              <UploadDescriptionImage
                oldDescriptionImages={oldDescriptionImages}
                setOldDescriptionImages={setOldDescriptionImages}
                setNewDescriptionImages={setDescriptionImages}
                newDescriptionImagePreviews={descriptionImagePreviews}
                setNewDescriptionImagePreviews={setDescriptionImagePreviews}
              />
            </Form.Item>
          </div>

          <Form.Item<FieldType>
            label={localeText.temple.description}
            name="description"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.temple.description
                ),
              },
            ]}
          >
            <Tiptap
              defaultValue={form.getFieldValue("description")}
              setContent={(newContent) =>
                form.setFieldValue("description", newContent)
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {localeText.save}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTemple;
