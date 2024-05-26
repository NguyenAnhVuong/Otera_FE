import { uploadApi } from "@/api/uploadApi";
import Loading from "@/components/Atoms/Loading";
import TempleSelect from "@/components/Atoms/TempleSelect";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  EGender,
  GetDeceasedDocument,
  GetListDeceasedDocument,
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
};

const UpdateDeceased: React.FC<UpdateDeceasedProps> = ({ id }) => {
  const [form] = Form.useForm();
  const { familyId } = useAppSelector((state) => state.auth);
  const { messageApi } = useAppSelector((state) => state.antd);
  const [oldAvatar, setOldAvatar] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [oldDescriptionImages, setOldDescriptionImages] = useState<string[]>(
    []
  );
  const [newDescriptionImages, setNewDescriptionImages] = useState<File[]>([]);
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
      refetchQueries: [GetDeceasedDocument, GetListDeceasedDocument],
    });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const newDeceased: VUpdateDeceasedInput = {
      id,
      name: values.name,
      gender: values.gender,
      address: values.address,
      birthday: values.birthday.format(formatDate.YYYY_MM_DD),
      dateOfDeath: values.dateOfDeath.format(formatDate.YYYY_MM_DD),
      description: values.description,
      citizenNumber: values.citizenNumber,
      templeId: values.templeId,
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
      <div className="bg-white flex justify-center px-12 py-4 pt-8 shadow-xl w-full max-w-[408px]">
        <Form
          name="basic"
          className="w-full text-center"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Form.Item<FieldType>
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

          <Form.Item<FieldType>
            className="text-left"
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

          <Form.Item<FieldType>
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

          <Form.Item<FieldType>
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
            />
          </Form.Item>

          <Form.Item<FieldType>
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
            />
          </Form.Item>

          <Form.Item<FieldType>
            className="text-left"
            label={localeText.deceased.citizenNumber}
            name="citizenNumber"
          >
            <Input placeholder={localeText.deceased.citizenNumber} />
          </Form.Item>

          <Form.Item<FieldType>
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
            <TextArea rows={4} placeholder={localeText.deceased.description} />
          </Form.Item>

          <Form.Item<FieldType>
            label={localeText.deceased.avatar}
            name="avatar"
          >
            <UploadSingleImage
              setUploadImage={setAvatar}
              imageSrc={oldAvatar}
            />
          </Form.Item>

          <Form.Item<FieldType>
            className="h-fit"
            label={localeText.deceased.descriptionImages}
            name="descriptionImages"
          >
            <UploadDescriptionImage
              oldDescriptionImages={oldDescriptionImages}
              setOldDescriptionImages={setOldDescriptionImages}
              setNewDescriptionImages={setNewDescriptionImages}
            />
          </Form.Item>

          <TempleSelect familyId={familyId} />

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
