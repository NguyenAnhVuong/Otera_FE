"use client";
import { deceasedApi } from "@/api/deceasedApi";
import TempleSelect from "@/components/Atom/TempleSelect";
import { useAppSelector } from "@/rtk/hook";
import { EGender } from "@/utils/enum";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type Props = {};

const DeceasedDeclare = (props: Props) => {
  const [form] = Form.useForm();
  const { familyId } = useAppSelector((state) => state.auth);
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [avatar, setAvatar] = useState<any>();
  const [descriptionImagePreviews, setDescriptionImagePreviews] =
    useState<string[]>();
  const [descriptionImages, setDescriptionImages] = useState<any[]>();

  function handleUploadAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
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
    const newDeceased = new FormData();
    newDeceased.append("images[]", avatar);
    descriptionImages?.forEach((descriptionImage) => {
      newDeceased.append("images[]", descriptionImage);
    });
    for (const key in values) {
      if (key !== "avatar" && key !== "descriptionImages") {
        newDeceased.append(key, values[key]);
      }
    }
    const res = await deceasedApi.declareDeceased(newDeceased);
    if (res) {
      messageApi.open({
        type: "success",
        content: "Khai báo thành công!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center mt-header">
      <div className="bg-white flex justify-center px-12 py-4 pt-8 shadow-xl w-full max-w-[380px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: "Please input your temple name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="text-left"
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Please input your gender!" }]}
          >
            <Radio.Group>
              <Radio value={EGender.MALE}>Nam</Radio>
              <Radio value={EGender.FEMALE}>Nữ</Radio>
              <Radio value={EGender.OTHER}>Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="text-left"
            label="Ngày sinh"
            name="birthday"
            rules={[{ required: true, message: "Please " }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            className="text-left"
            label="Ngày mất"
            name="dateOfDeath"
            rules={[{ required: true, message: "Please " }]}
          >
            <DatePicker className="w-full" picker="date" />
          </Form.Item>

          <Form.Item
            className="text-left"
            label="Căn cước công dân/CMND"
            name="citizenNumber"
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
            label="Avatar"
            name="avatar"
            rules={[{ required: true, message: "Please input your Avatar!" }]}
          >
            {avatarPreview ? (
              <img className="max-w-[80px]" src={avatarPreview} />
            ) : (
              <input
                name="avatar"
                type="file"
                onChange={(e) => handleUploadAvatar(e)}
              />
            )}
          </Form.Item>

          <Form.Item
            className="h-fit"
            label="Ảnh mô tả"
            name="descriptionImages"
          >
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleUploadDescriptionImages(e)
              }
            />
          </Form.Item>

          <TempleSelect familyId={familyId} />

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

export default DeceasedDeclare;
