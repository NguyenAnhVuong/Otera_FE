import { uploadApi } from "@/api/uploadApi";
import Loading from "@/components/Atoms/Loading";
import { authActions } from "@/features/auth";
import {
  EGender,
  GetUserDocument,
  GetUserQuery,
  VUpdateUserDetailInput,
  useGetUserLazyQuery,
  useUpdateUserMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { User } from "@/models/auth";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import { Button, DatePicker, Form, FormProps, Input, Radio } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

type PersonalInforTabProps = {
  user: GetUserQuery["getUser"]["data"];
  newAvatar?: File | null;
};

type FieldType = {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  gender?: EGender;
};

const PersonalInforTab: React.FC<PersonalInforTabProps> = ({
  user,
  newAvatar,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const authUser = useAppSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [updateUserDetail, { loading }] = useUpdateUserMutation({
    onCompleted: async () => {
      messageApi.open({
        type: "success",
        content: localeText.user.updateUserDetail.successMessage,
      });
      // TODO reload header
      window.location.reload();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: localeText.user.updateUserDetail.failMessage,
      });
    },
    refetchQueries: [GetUserDocument],
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsUploading(true);
    const updateUserDetailInput: VUpdateUserDetailInput = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      birthday: values.birthday,
      gender: values.gender,
    };

    if (newAvatar) {
      const formData = new FormData();
      formData.append("file", newAvatar);
      const res = await uploadApi.uploadImage(formData);
      updateUserDetailInput.avatar = res.data.url;
    }

    await updateUserDetail({
      variables: {
        updateUserDetailInput,
      },
    });

    setIsUploading(false);
  };

  return (
    <div>
      {(loading || isUploading) && <Loading />}
      <div className="text-center">
        <span className="text-xl font-medium">
          {localeText.user.personalInformation}
        </span>
      </div>
      <Form
        className="p-4 text-center"
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: user.userDetail.name,
          email: user.email,
          gender: user.userDetail.gender,
          birthday: dayjs(user.userDetail.birthday),
          phone: user.userDetail.phone,
          address: user.userDetail.address,
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            className="col-span-1"
            label={localeText.user.name}
            name="name"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.user.name
                ),
              },
            ]}
          >
            <Input placeholder={localeText.user.name} />
          </Form.Item>

          <Form.Item<FieldType>
            label={localeText.user.email}
            name="email"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.user.email
                ),
              },
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
            ]}
          >
            <Input disabled placeholder={localeText.user.email} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            className="text-left"
            label={localeText.user.gender}
            name="gender"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.user.gender
                ),
              },
            ]}
          >
            <Radio.Group>
              <Radio value={EGender.Male}>{localeText.gender.male}</Radio>
              <Radio value={EGender.Female}>{localeText.gender.female}</Radio>
              <Radio value={EGender.Other}>{localeText.gender.other}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            className="w-full"
            label={localeText.user.birthday}
            name="birthday"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.user.birthday
                ),
              },
            ]}
          >
            <DatePicker className="w-full" format={formatDate.DD_MM_YYYY} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Form.Item<FieldType>
            className="col-span-1"
            label={localeText.user.phone}
            name="phone"
            rules={[]}
          >
            <Input placeholder={localeText.user.phone} />
          </Form.Item>

          <Form.Item<FieldType>
            className="col-span-2"
            label={localeText.user.address}
            name="address"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.user.address
                ),
              },
            ]}
          >
            <Input placeholder={localeText.user.address} />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {localeText.save}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInforTab;
