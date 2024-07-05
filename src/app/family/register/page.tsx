"use client";
import { familyApi } from "@/api/familyApi";
import PageTitle from "@/components/Atoms/PageTitle";
import TempleSelect from "@/components/Atoms/TempleSelect";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import { useLogout } from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { TextArea } = Input;

type Props = {};

const FamilyRegister = (props: Props) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatar, setAvatar] = useState<File>();
  const handleLogout = useLogout();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const newFamily = new FormData();
    if (avatar) {
      newFamily.append("avatar", avatar);
    }
    for (const key in values) {
      if (key !== "avatar") {
        if (values[key] !== null && values[key] !== undefined) {
          newFamily.append(key, values[key]);
        }
      }
    }
    const res = await familyApi.createFamily(newFamily);
    if (res) {
      messageApi.open({
        type: "success",
        content: localeText.family.register.registerSuccessMessage,
      });
      handleLogout(dispatch);
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: localeText.family.register.registerFailMessage,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center pt-header">
      <div className="bg-white flex flex-col items-center px-4 py-4 pt-8 shadow-xl w-full max-w-[480px]">
        <PageTitle size="small" title={localeText.family.register.title} />
        <Form
          name="basic"
          className="w-full text-center mt-4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              className="col-span-1"
              label={localeText.family.register.name}
              name="name"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.family.register.name
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.family.register.name} />
            </Form.Item>
            <Form.Item
              label={localeText.family.register.phone}
              name="phone"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.family.register.phone
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.family.register.phone} />
            </Form.Item>
          </div>

          <Form.Item
            className="flex-1"
            label={localeText.family.register.address}
            name="address"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.family.register.address
                ),
              },
            ]}
          >
            <Input placeholder={localeText.family.register.address} />
          </Form.Item>

          <Form.Item
            label={localeText.family.register.avatar}
            name="avatar"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.family.register.avatar
                ),
              },
            ]}
          >
            <div className="flex justify-center">
              <UploadSingleImage setUploadImage={setAvatar} />
            </div>
          </Form.Item>

          <Form.Item
            label={localeText.family.register.description}
            name="description"
            rules={[
              {
                max: 5000,
                message: localeText.validateMessages.max(5000),
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder={localeText.family.register.description}
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

export default FamilyRegister;
