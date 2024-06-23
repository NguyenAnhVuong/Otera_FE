"use client";
import { messageApiSelector } from "@/features/antd";
import {
  UserRegisterInput,
  useUserRegisterMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { EGender } from "@/utils/enum";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { useRouter } from "next/navigation";
type RegisterProps = {};

const Register: RegisterProps = ({}) => {
  const router = useRouter();
  const [userRegister] = useUserRegisterMutation();
  const messageApi = useAppSelector(messageApiSelector);
  const { localeText } = useTrans();
  const onFinish = async (
    input: UserRegisterInput & { confirmPassword?: string }
  ) => {
    delete input.confirmPassword;
    const { errors } = await userRegister({
      variables: {
        input,
      },
    });

    if (!errors) {
      messageApi.open({
        type: "success",
        content: localeText.registerAccount.registerSuccessMessage,
      });
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: localeText.registerAccount.registerFailMessage,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-white shadow-xl p-6 flex items-center flex-col w-full max-w-[360px] rounded-xl">
        <h3 className="font-medium">{localeText.register}</h3>
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
            label={localeText.registerAccount.name}
            name="name"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.registerAccount.name
                ),
              },
            ]}
          >
            <Input placeholder={localeText.registerAccount.name} />
          </Form.Item>

          <Form.Item
            className="text-left"
            label={localeText.registerAccount.gender}
            name="gender"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.registerAccount.gender
                ),
              },
            ]}
          >
            <Radio.Group>
              <Radio value={EGender.MALE}>{localeText.gender.male}</Radio>
              <Radio value={EGender.FEMALE}>{localeText.gender.female}</Radio>
              <Radio value={EGender.OTHER}>{localeText.gender.other}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={localeText.registerAccount.birthday}
            name="birthday"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.registerAccount.birthday
                ),
              },
            ]}
          >
            <DatePicker
              className="w-full"
              placeholder={localeText.registerAccount.birthday}
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <Form.Item
            label={localeText.registerAccount.email}
            name="email"
            rules={[
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.registerAccount.email
                ),
              },
            ]}
          >
            <Input placeholder={localeText.registerAccount.email} />
          </Form.Item>

          <Form.Item
            label={localeText.registerAccount.password}
            name="password"
            rules={[
              { required: true, message: localeText.registerAccount.password },
            ]}
          >
            <Input.Password placeholder={localeText.registerAccount.password} />
          </Form.Item>

          <Form.Item
            label={localeText.registerAccount.confirmPassword}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.registerAccount.confirmPassword
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
              placeholder={localeText.registerAccount.confirmPassword}
            />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button className="px-8 " type="primary" htmlType="submit">
              {localeText.register}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
