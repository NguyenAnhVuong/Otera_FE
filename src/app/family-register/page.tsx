"use client";
import { familyApi } from "@/api/familyApi";
import TempleSelect from "@/components/Atoms/TempleSelect";
import { useGetTemplesQuery } from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const { TextArea } = Input;

type Props = {};

const FamilyRegister = (props: Props) => {
  const [keyword, setKeyword] = useState("");
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const handleLogout = useLogout();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: templesData } = useGetTemplesQuery({
    variables: { keyword },
  });

  const temples = templesData?.getTemples?.data?.data || [];

  const options = temples.reduce(
    (arr: { label: string; value: string }[], temple) => {
      return temple
        ? [
            ...arr,
            {
              label: temple.name,
              value: temple.id.toString(),
            },
          ]
        : arr;
    },
    []
  );

  function handleUploadAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  }

  const onFinish = async (values: any) => {
    const newFamily = new FormData();
    if (avatar) {
      newFamily.append("avatar", avatar);
    }
    for (const key in values) {
      if (key !== "avatar") {
        newFamily.append(key, values[key]);
      }
    }
    const res = await familyApi.createFamily(newFamily);
    if (res) {
      messageApi.open({
        type: "success",
        content: "Đăng ký thành công!",
      });
      handleLogout(dispatch);
      router.push("/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center pt-header">
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
            label="Tên gia đình"
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUploadAvatar(e)
                }
              />
            )}
          </Form.Item>

          <TempleSelect />

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

export default FamilyRegister;
