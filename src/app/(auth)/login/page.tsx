"use client";
import { authApi } from "@/api/authApi";
import { messageApiSelector } from "@/features/antd";
import { authActions } from "@/features/auth";
import { useUserRegisterMutation } from "@/graphql/generated/schema";
import { User } from "@/models/auth";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  // const [messageApi, contextHolder] = message.useMessage();
  const messageApi = useAppSelector(messageApiSelector);
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    const res = await authApi.login(values);

    if (res) {
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công!",
      });

      dispatch(authActions.login(res.user as User));

      router.replace("/home");
    } else {
      messageApi.open({
        type: "error",
        content: "Sai tài khoản hoặc mật khẩu!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-xl p-12 flex items-center flex-col w-full max-w-[240px]">
        <h3 className="text-black">Đăng nhập</h3>
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

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item className="flex w-full justify-center mb-0">
            <Button className="w-40" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="flex flex-col items-center">
            <p>Không có tài khoản ?</p>
            <Button className="w-40">
              <Link href="/register">Đăng ký</Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
