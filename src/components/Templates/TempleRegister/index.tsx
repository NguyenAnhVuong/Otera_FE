"use client";
import { templeApi } from "@/api/templeApi";
import Tiptap from "@/components/Organisms/TipTap";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import { useGetTemplesQuery } from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const TempleRegister = (props: Props) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState<
    string[]
  >([]);
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const handleLogout = useLogout();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { refetch } = useGetTemplesQuery({ variables: { keyword: "" } });

  const onFinish = async (values: any) => {
    if (!avatar) return;
    const newTemple = new FormData();
    newTemple.append("images[]", avatar);
    descriptionImages?.forEach((descriptionImage) => {
      newTemple.append("images[]", descriptionImage);
    });
    for (const key in values) {
      if (key !== "images" && key !== "descriptionImages") {
        newTemple.append(key, values[key]);
      }
    }
    const res = await templeApi.createTemple(newTemple);

    if (res) {
      refetch();
      messageApi.open({
        type: "success",
        content: localeText.temple.templeRegister.successMessage,
      });
      handleLogout(dispatch);
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: localeText.temple.templeRegister.failMessage,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center py-header ">
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
            <Form.Item
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

            <Form.Item
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

            <Form.Item
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
            <Form.Item
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

            <Form.Item
              className="col-span-2"
              label={localeText.temple.website}
              name="website"
            >
              <Input placeholder={localeText.temple.website} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-5">
            <Form.Item
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
                <UploadSingleImage setUploadImage={setAvatar} />
              </div>
            </Form.Item>

            <Form.Item
              className="col-span-4"
              label={localeText.temple.descriptionImages}
              name="descriptionImages"
            >
              <UploadDescriptionImage
                setNewDescriptionImages={setDescriptionImages}
                newDescriptionImagePreviews={descriptionImagePreviews}
                setNewDescriptionImagePreviews={setDescriptionImagePreviews}
              />
            </Form.Item>
          </div>

          <Form.Item
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
              setContent={(newContent) =>
                form.setFieldValue("description", newContent)
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {localeText.register}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TempleRegister;
