"use client";
import { deceasedApi } from "@/api/deceasedApi";
import Loading from "@/components/Atoms/Loading";
import TempleSelect from "@/components/Atoms/TempleSelect";
import Tiptap from "@/components/Organisms/TipTap";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import { EGender } from "@/utils/enum";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

type Props = {};

const DeceasedDeclare = (props: Props) => {
  const [form] = Form.useForm();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatar, setAvatar] = useState<any>();
  const [descriptionImagePreviews, setDescriptionImagePreviews] = useState<
    string[]
  >([]);
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const { localeText } = useTrans();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const newDeceased = new FormData();
    newDeceased.append("images[]", avatar);
    descriptionImages?.forEach((descriptionImage) => {
      newDeceased.append("images[]", descriptionImage);
    });
    for (const key in values) {
      if (key !== "avatar" && key !== "descriptionImages") {
        if (values[key] !== null && values[key] !== undefined) {
        newDeceased.append(key, values[key]);
        }
      }
    }
    const res = await deceasedApi.declareDeceased(newDeceased);
    if (res) {
      messageApi.open({
        type: "success",
        content: localeText.deceased.declare.declareSuccessMessage,
      });
      form.resetFields();
      setDescriptionImagePreviews([]);
    } else {
      messageApi.open({
        type: "error",
        content: localeText.deceased.declare.declareFailMessage,
      });
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center mt-header">
      {loading && <Loading />}
      <div className="bg-white flex justify-center px-5 py-4 pt-8 shadow-xl w-full max-w-[688px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <div className="grid grid-cols-3 gap-2">
            <Form.Item
              className="col-span-1"
              label={localeText.deceased.name}
              name="name"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deceased.name
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.deceased.name} />
            </Form.Item>

            <Form.Item
              label={localeText.deceased.citizenNumber}
              name="citizenNumber"
            >
              <Input placeholder={localeText.deceased.citizenNumber} />
            </Form.Item>
            <Form.Item
              label={localeText.deceased.tombAddress}
              name="tombAddress"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deceased.tombAddress
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.deceased.tombAddress} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3">
            <Form.Item
              className="text-left col-span-1"
              label={localeText.deceased.gender}
              name="gender"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deceased.gender
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
            <div className="grid grid-cols-2 gap-2 col-span-2">
              <Form.Item
                className="text-left"
                label={localeText.deceased.birthday}
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: localeText.validateMessages.required(
                      localeText.deceased.birthday
                    ),
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder={localeText.deceased.birthday}
                  format={formatDate.DD_MM_YYYY}
                  disabledDate={(current) => current && current > dayjs()}
                />
              </Form.Item>

              <Form.Item
                className="text-left"
                label={localeText.deceased.dateOfDeath}
                name="dateOfDeath"
                rules={[
                  {
                    required: true,
                    message: localeText.validateMessages.required(
                      localeText.deceased.dateOfDeath
                    ),
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  picker="date"
                  placeholder={localeText.deceased.dateOfDeath}
                  format={formatDate.DD_MM_YYYY}
                  disabledDate={(current) => current && current > dayjs()}
                />
              </Form.Item>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <TempleSelect />
            <Form.Item
              className="col-span-2"
              label={localeText.deceased.address}
              name="address"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deceased.address
                  ),
                },
              ]}
            >
              <Input placeholder={localeText.deceased.address} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <Form.Item
              className="col-span-1"
              label={localeText.deceased.avatar}
              name="avatar"
              rules={[
                {
                  required: true,
                  message: localeText.validateMessages.required(
                    localeText.deceased.avatar
                  ),
                },
              ]}
            >
              <div className="">
                <UploadSingleImage setUploadImage={setAvatar} />
              </div>
            </Form.Item>
            <Form.Item
              className="col-span-4"
              label={localeText.deceased.descriptionImages}
              name="descriptionImages"
            >
              <div className="">
                <UploadDescriptionImage
                  setNewDescriptionImages={setDescriptionImages}
                  newDescriptionImagePreviews={descriptionImagePreviews}
                  setNewDescriptionImagePreviews={setDescriptionImagePreviews}
                />
              </div>
            </Form.Item>
          </div>
          <Form.Item
            label={localeText.deceased.description}
            name="description"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.deceased.description
                ),
              },
            ]}
          >
            <Tiptap
              setContent={(newContent) =>
                form.setFieldsValue({ description: newContent })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {localeText.declare}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DeceasedDeclare;
