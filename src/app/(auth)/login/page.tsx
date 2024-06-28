"use client";
import { messageApiSelector } from "@/features/antd";
import { authActions } from "@/features/auth";
import {
  UserLoginInput,
  useUserLoginMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";

import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const messageApi = useAppSelector(messageApiSelector);
  const dispatch = useAppDispatch();
  const [userLogin] = useUserLoginMutation();
  const { localeText } = useTrans();

  const onFinish = async (values: UserLoginInput) => {
    await userLogin({
      variables: {
        input: values,
      },
      onCompleted: (data) => {
        messageApi.open({
          type: "success",
          content: localeText.login.loginSuccessMessage,
        });

        dispatch(authActions.login(data?.userLogin?.data?.user));
        const accessToken = data.userLogin?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        router.push("/");
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: localeText.login.loginFailMessage,
        });
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 flex items-center flex-col w-full max-w-[320px]">
        <h3 className="text-black font-medium">{localeText.login.title}</h3>
        <Form
          className="w-full"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label={localeText.login.email}
            name="email"
            rules={[
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.login.email
                ),
              },
            ]}
          >
            <Input placeholder={localeText.login.email} />
          </Form.Item>

          <Form.Item
            label={localeText.login.password}
            name="password"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.login.password
                ),
              },
            ]}
          >
            <Input.Password
              autoComplete="on"
              placeholder={localeText.login.password}
            />
          </Form.Item>

          <Form.Item className="flex w-full justify-center mb-0">
            <Button className="w-40" type="primary" htmlType="submit">
              {localeText.login.title}
            </Button>
          </Form.Item>
          <div className="flex flex-col items-center gap-2">
            <Link className="text-black mt-4" href="/forgot-password">
              {localeText.login.forgotPassword}
            </Link>
            <div>
              <span>{localeText.login.noAccount} </span>
              <Link href="/register">{localeText.register}</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
