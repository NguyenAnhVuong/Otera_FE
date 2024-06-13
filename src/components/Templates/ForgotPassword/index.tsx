"use client";
import Loading from "@/components/Atoms/Loading";
import { useForgotPasswordMutation } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import React from "react";

type ForgotPasswordProps = {};

type FieldType = {
  email: string;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [form] = Form.useForm();

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => {
      messageApi.success(localeText.forgotPassword.sendSuccessMessage);
      form.resetFields();
    },
    onError: () => {
      messageApi.error(localeText.forgotPassword.sendFailMessage);
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await forgotPassword({
      variables: {
        forgotPasswordInput: {
          email: values.email,
        },
      },
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      {loading && <Loading />}
      <div className="bg-white shadow-xl p-6 flex items-center flex-col w-full max-w-[320px] rounded-xl">
        <h3 className="text-black">{localeText.forgotPassword.title}</h3>
        <Form
          className="w-full"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label={localeText.forgotPassword.email}
            name="email"
            rules={[
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.forgotPassword.email
                ),
              },
            ]}
          >
            <Input placeholder={localeText.forgotPassword.email} />
          </Form.Item>

          <Form.Item className="flex w-full justify-center mb-0">
            <Button type="primary" htmlType="submit">
              {localeText.send}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
