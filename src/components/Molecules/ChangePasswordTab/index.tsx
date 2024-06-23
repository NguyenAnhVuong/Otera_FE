import Loading from "@/components/Atoms/Loading";
import { useChangePasswordMutation } from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { Button, Form, FormProps, Input } from "antd";
import React from "react";

type ChangePasswordTabProps = {};

type FieldType = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordTab: React.FC<ChangePasswordTabProps> = ({}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const handleLogout = useLogout();
  const dispatch = useAppDispatch();
  const [changePassword, { loading }] = useChangePasswordMutation({
    onCompleted: () => {
      messageApi.success(localeText.user.changePasswordSuccessMessage);
      handleLogout(dispatch);
    },
    onError: () => {
      messageApi.success(localeText.user.changePasswordFailMessage);
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await changePassword({
      variables: {
        changePasswordInput: {
          password: values.password,
          newPassword: values.newPassword,
        },
      },
    });
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="text-center">
        <span className="text-xl font-medium">
          {localeText.user.changePassword}
        </span>
      </div>

      <Form
        className="px-14 pt-4 text-center"
        name="basic"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={localeText.user.currentPassword}
          name="password"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.user.currentPassword
              ),
            },
            {
              min: 6,
              message: localeText.validateMessages.min(6),
            },
          ]}
        >
          <Input.Password placeholder={localeText.user.currentPassword} />
        </Form.Item>

        <Form.Item<FieldType>
          label={localeText.user.newPassword}
          name="newPassword"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.user.newPassword
              ),
            },
            {
              min: 6,
              message: localeText.validateMessages.min(6),
            },
          ]}
        >
          <Input.Password placeholder={localeText.user.newPassword} />
        </Form.Item>

        <Form.Item
          label={localeText.user.confirmPassword}
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.registerAccount.confirmPassword
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(localeText.validateMessages.confirmPassword)
                );
              },
            }),
            {
              min: 6,
              message: localeText.validateMessages.min(6),
            },
          ]}
        >
          <Input.Password
            placeholder={localeText.registerAccount.confirmPassword}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {localeText.save}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordTab;
