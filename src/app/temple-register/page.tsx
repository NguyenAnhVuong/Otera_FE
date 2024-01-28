"use client";
import { templeApi } from "@/api/templeApi";
import { useLogout } from "@/hooks/useLogout";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { TextArea } = Input;

type Props = {};

const TempleRegister = (props: Props) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [avatar, setAvatar] = useState<any>();
  const [descriptionImagePreviews, setDescriptionImagePreviews] =
    useState<string[]>();
  const [descriptionImages, setDescriptionImages] = useState<any[]>();
  const handleLogout = useLogout();
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleUploadAvatar(e: any) {
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  }

  function handleUploadDescriptionImages(e: any) {
    const files = e.target.files;
    const newDescriptionImages = [];
    const newDescriptionImagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      newDescriptionImages.push(files[i]);
      newDescriptionImagePreviews.push(URL.createObjectURL(files[i]));
    }
    setDescriptionImages(newDescriptionImages);
    setDescriptionImagePreviews(newDescriptionImagePreviews);
  }

  const onFinish = async (values: any) => {
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
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
      handleLogout(dispatch);
      router.replace("/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen py-header mt-header">
      <div className="bg-white flex justify-center px-12 py-4 pt-8 shadow-xl w-full max-w-[380px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Tên chùa"
            name="name"
            rules={[
              { required: true, message: "Please input your temple name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email!",
              },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input placeholder="Website" />
          </Form.Item>

          <Form.Item
            label="Avatar"
            name="images"
            rules={[{ required: true, message: "Please input your Avatar!" }]}
          >
            {avatarPreview ? (
              <img className="max-w-[80px]" src={avatarPreview} />
            ) : (
              <input
                name="images"
                type="file"
                onChange={(e) => handleUploadAvatar(e)}
              />
            )}
          </Form.Item>

          <Form.Item label="Ảnh mô tả" name="descriptionImages">
            {descriptionImagePreviews &&
              descriptionImagePreviews.length > 0 &&
              descriptionImagePreviews?.map(
                (descriptionImagePreview: any, index: number) => (
                  <img
                    key={index}
                    className="max-w-[80px] p-1"
                    src={descriptionImagePreview}
                    alt="temple-description-image"
                  />
                )
              )}
            <input
              name="descriptionImages"
              type="file"
              multiple
              onChange={(e) => handleUploadDescriptionImages(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TempleRegister;
