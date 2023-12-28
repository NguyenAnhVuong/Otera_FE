"use client";
import { authApi } from "@/api/authApi";
import {
  UserRegisterInput,
  useUserRegisterMutation,
} from "@/graphql/generated/schema";
import { Button, Checkbox, DatePicker, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [userRegister] = useUserRegisterMutation();
  const onFinish = async (
    input: UserRegisterInput & { confirmPassword?: string }
  ) => {
    // const success = await authApi.register(values);
    delete input.confirmPassword;
    const { data, errors } = await userRegister({
      variables: {
        input,
      },
    });

    if (!errors) {
      messageApi.open({
        type: "success",
        content: "Register success!",
      });
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: "Register fail!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {contextHolder}
      <div className="bg-white shadow-xl p-12 flex items-center flex-col w-full max-w-[320px]">
        <h3>Đăng ký</h3>
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
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <DatePicker placeholder="Ngày sinh" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
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

          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Hai mật khẩu không trùng khớp. Vui lòng nhập lại!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          {/* <Form.Item
            name="privacyPolicyAgreed"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox> プライバシーポリシーと利用規約に同意します</Checkbox>
          </Form.Item> */}
          <Form.Item className="flex justify-center">
            <Button className="px-8 " type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
