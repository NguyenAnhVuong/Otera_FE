import Loading from "@/components/Atoms/Loading";
import { useResetPasswordMutation } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Button, Form, Input } from "antd";
import { FormProps } from "antd/lib";
import { useRouter } from "next/navigation";
import React from "react";

type ResetPasswordProps = { token: string };

type FieldType = {
  password: string;
  passwordConfirm: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const router = useRouter();
  const [resetPassword, { loading }] = useResetPasswordMutation({
    onCompleted: () => {
      messageApi.success(localeText.resetPassword.successMessage);
      router.push("/login");
    },
    onError: () => {
      messageApi.error(localeText.resetPassword.failMessage);
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    resetPassword({
      variables: {
        resetPasswordInput: {
          password: values.password,
          token,
        },
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {loading && <Loading />}
      <div className="bg-white shadow-xl p-6 flex items-center flex-col w-full max-w-[280px] rounded-xl">
        <h3>{localeText.resetPassword.title}</h3>
        <Form className="w-full" layout="vertical" onFinish={onFinish}>
          <Form.Item<FieldType>
            label={localeText.resetPassword.password}
            name="password"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.resetPassword.password
                ),
              },
            ]}
          >
            <Input.Password placeholder={localeText.resetPassword.password} />
          </Form.Item>

          <Form.Item<FieldType>
            label={localeText.resetPassword.confirmPassword}
            name="passwordConfirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.resetPassword.confirmPassword
                ),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(localeText.validateMessages.confirmPassword)
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={localeText.resetPassword.confirmPassword}
            />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              {localeText.send}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
