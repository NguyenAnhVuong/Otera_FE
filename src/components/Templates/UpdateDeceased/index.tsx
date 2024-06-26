import { uploadApi } from "@/api/uploadApi";
import Loading from "@/components/Atoms/Loading";
import TempleSelect from "@/components/Atoms/TempleSelect";
import Tiptap from "@/components/Organisms/TipTap";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  EGender,
  FamilyGetListDeceasedDocument,
  GetDeceasedDocument,
  VUpdateDeceasedInput,
  useGetDeceasedQuery,
  useUpdateDeceasedMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import { Button, DatePicker, Form, FormProps, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UpdateDeceasedProps = {
  id: number;
};

type FieldType = {
  name: string;
  gender: EGender;
  address: string;
  birthday: dayjs.Dayjs;
  dateOfDeath: dayjs.Dayjs;
  description: string;
  citizenNumber?: string;
  avatar?: string;
  descriptionImages?: string[];
  templeId: number;
  tombAddress: string;
};

const UpdateDeceased: React.FC<UpdateDeceasedProps> = ({ id }) => {
  const [form] = Form.useForm();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [oldAvatar, setOldAvatar] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [oldDescriptionImages, setOldDescriptionImages] = useState<string[]>(
    []
  );
  const [newDescriptionImages, setNewDescriptionImages] = useState<File[]>([]);
  const [newDescriptionImagePreviews, setNewDescriptionImagePreviews] =
    useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const { localeText } = useTrans();
  const router = useRouter();

  const { loading } = useGetDeceasedQuery({
    variables: {
      id,
    },
    onCompleted: (data) => {
      const formValues = {
        name: data.getDeceased.data.userDetail.name,
        gender: data.getDeceased.data.userDetail.gender,
        address: data.getDeceased.data.userDetail.address,
        birthday: dayjs(data.getDeceased.data.userDetail.birthday),
        dateOfDeath: dayjs(data.getDeceased.data.dateOfDeath),
        description: data.getDeceased.data.description,
        templeId: data.getDeceased.data.templeId,
        tombAddress: data.getDeceased.data.tombAddress,
        avatar: data.getDeceased.data.userDetail.avatar,
        ...(data.getDeceased.data.userDetail.citizenNumber && {
          citizenNumber: data.getDeceased.data.userDetail.citizenNumber,
        }),
      };
      setOldAvatar(data.getDeceased.data.userDetail.avatar);
      setOldDescriptionImages(
        data.getDeceased.data.images.map((image) => image.image)
      );

      form.setFieldsValue(formValues);
    },
    onError: () => {
      messageApi.success(localeText.errorOccurred);
      router.push(`/deceased/${id}`);
    },
    skip: !id,
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const [updateDeceased, { loading: updateLoading }] =
    useUpdateDeceasedMutation({
      onCompleted: () => {
        messageApi.open({
          type: "success",
          content: localeText.deceased.updateSuccessMessage,
        });
        form.resetFields();
        setOldAvatar("");
        setOldDescriptionImages([]);
        router.push(`/deceased/${id}`);
      },
      onError: () => {
        messageApi.error(localeText.deceased.updateFailedMessage);
      },
      refetchQueries: [GetDeceasedDocument, FamilyGetListDeceasedDocument],
    });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const newDeceased: VUpdateDeceasedInput = {
      id,
      name: values.name,
      gender: values.gender,
      address: values.address,
      birthday: dayjs(values.birthday).format(formatDate.YYYY_MM_DD),
      dateOfDeath: dayjs(values.dateOfDeath).format(formatDate.YYYY_MM_DD),
      description: values.description,
      citizenNumber: values.citizenNumber,
      images: oldDescriptionImages,
    };

    if (avatar) {
      setIsUploading(true);
      const avatarFormData = new FormData();
      avatarFormData.append("file", avatar);
      const res = await uploadApi.uploadImage(avatarFormData);
      newDeceased.avatar = res.data.url;
    }

    if (newDescriptionImages.length) {
      setIsUploading(true);
      const newDescriptionImageFormData = new FormData();
      newDescriptionImages?.forEach((newDescriptionImage) => {
        newDescriptionImageFormData.append("files", newDescriptionImage);
      });
      const res = await uploadApi.uploadImages(newDescriptionImageFormData);
      const newDescriptionImageUrls = res.data.map((image: any) => image.url);

      newDeceased.images = [
        ...oldDescriptionImages,
        ...newDescriptionImageUrls,
      ];
    }

    await updateDeceased({
      variables: {
        updateDeceasedInput: newDeceased,
      },
    });
    setIsUploading(false);
  };

  return (
    <div className="flex justify-center items-center mt-header">
      {(loading || updateLoading || isUploading) && <Loading />}
      <div className="bg-white flex justify-center px-5 py-4 pt-8 shadow-xl w-full w-full max-w-[688px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
              <Input disabled placeholder={localeText.deceased.tombAddress} />
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
                <Radio value={EGender.Male}>{localeText.gender.male}</Radio>
                <Radio value={EGender.Female}>{localeText.gender.female}</Radio>
                <Radio value={EGender.Other}>{localeText.gender.other}</Radio>
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
            <TempleSelect disabled />
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
                <UploadSingleImage
                  imageSrc={oldAvatar}
                  setUploadImage={setAvatar}
                />
              </div>
            </Form.Item>
            <Form.Item
              className="col-span-4"
              label={localeText.deceased.descriptionImages}
              name="descriptionImages"
            >
              <div className="">
                <UploadDescriptionImage
                  oldDescriptionImages={oldDescriptionImages}
                  setOldDescriptionImages={setOldDescriptionImages}
                  setNewDescriptionImages={setNewDescriptionImages}
                  newDescriptionImagePreviews={newDescriptionImagePreviews}
                  setNewDescriptionImagePreviews={
                    setNewDescriptionImagePreviews
                  }
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
              defaultValue={form.getFieldValue("description") || ""}
              setContent={(newContent) =>
                form.setFieldsValue({ description: newContent })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {localeText.save}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateDeceased;
