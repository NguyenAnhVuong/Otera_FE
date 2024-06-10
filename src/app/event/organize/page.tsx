"use client";
import axiosJWT from "@/api/axiosJWT";
import FormLayout from "@/components/Atoms/FormLayout";
import {
  ERole,
  TempleGetEventsDocument,
  useCreateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate, participantTypeOptions } from "@/utils/constants";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type Props = {};

const EventOrganize = (props: Props) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [descriptionImagePreviews, setDescriptionImagePreviews] =
    useState<string[]>();
  const [avatar, setAvatar] = useState<File>();
  const [descriptionImages, setDescriptionImages] = useState<any[]>();
  const [form] = Form.useForm();
  const eventTime = Form.useWatch("eventTime", form);
  const [createEvent] = useCreateEventMutation();
  const router = useRouter();

  function handleUploadAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  }

  function handleUploadDescriptionImages(e: any) {
    const files = e.target.files;
    const newDescriptionImages = [];
    const newDescriptionImagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      newDescriptionImages.push(files[i]);
      newDescriptionImagePreviews.push(URL.createObjectURL(files[i]));
    }
    setDescriptionImages(newDescriptionImages);
    setDescriptionImagePreviews(newDescriptionImagePreviews);
  }

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      if (avatar) {
        formData.append("files", avatar);
      }
      if (descriptionImages) {
        descriptionImages.forEach((descriptionImage) => {
          formData.append("files", descriptionImage);
        });
      }

      let eventAvatar;
      let eventImages;

      if (avatar || descriptionImages) {
        const res = await axiosJWT.post("/cloudinary/uploads", formData);
        eventAvatar = res.data.data[0].url;
        eventImages = res.data.data.slice(1).map((item: any) => item.url);
      }

      const roles: ERole[] = [];
      values.participants.forEach((participant: string) => {
        switch (participant) {
          case localeText.temple.title:
            roles.push(ERole.TempleAdmin);
            roles.push(ERole.TempleMember);
            break;
          case localeText.family.title:
            roles.push(ERole.FamilyAdmin);
            roles.push(ERole.FamilyMember);
            break;
          case localeText.publicUser:
            roles.push(ERole.PublicUser);
            break;
          default:
            break;
        }
      });

      const newEvent = {
        name: values.name,
        ...(eventAvatar && { avatar: eventAvatar }),
        ...(eventImages.length > 0 && {
          images: eventImages,
        }),
        description: values.description,
        startDateEvent: values.eventTime[0],
        endDateEvent: values.eventTime[1],
        startDateBooking: values.bookingTime[0],
        endDateBooking: values.bookingTime[1],
        address: values.address,
        phone: values.phone,
        email: values.email,
        maxParticipant: Number(values.maxParticipant),
        roles,
      };

      await createEvent({
        variables: {
          createEventInput: newEvent,
        },
        onCompleted() {
          messageApi.open({
            type: "success",
            content: localeText.event.organizeEventSuccessMessage,
          });
          form.resetFields();
          setAvatarPreview("");
          setDescriptionImagePreviews([]);
          setAvatar(undefined);
          setDescriptionImages([]);
          router.push("/event/temple");
        },
        onError() {
          messageApi.open({
            type: "error",
            content: localeText.event.organizeEventFailMessage,
          });
        },
        refetchQueries: [TempleGetEventsDocument],
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <FormLayout title={localeText.event.organizeEvent}>
      <Form
        form={form}
        className="w-full text-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label={localeText.event.name}
          name="name"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.event.name
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={localeText.event.address}
          name="address"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.event.address
              ),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={localeText.event.description} name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label={localeText.event.eventTime}
          name="eventTime"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.event.eventTime
              ),
            },
          ]}
        >
          <RangePicker
            showTime
            format={formatDate.HH_mm_DD_MM_YYYY}
            className="w-full"
            placeholder={[localeText.event.startTime, localeText.event.endTime]}
            disabledDate={(current) => {
              return current && current < dayjs().endOf("day");
            }}
          />
        </Form.Item>

        <Form.Item
          label={localeText.event.bookingTime}
          name="bookingTime"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.event.bookingTime
              ),
            },
          ]}
          dependencies={["eventTime"]}
        >
          <RangePicker
            disabled={!eventTime || eventTime.length === 0}
            format={formatDate.HH_mm_DD_MM_YYYY}
            showTime
            className="w-full"
            placeholder={[localeText.event.startTime, localeText.event.endTime]}
            disabledDate={(current) => {
              return (
                (current && current < dayjs().endOf("day")) ||
                current >= eventTime[0]
              );
            }}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          label={localeText.event.participants}
          name="participants"
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={participantTypeOptions(localeText).map(
            (item) => item.value
          )}
        >
          <Checkbox.Group
            className="flex justify-between"
            options={participantTypeOptions(localeText)}
          />
        </Form.Item>

        <Form.Item
          label={localeText.event.maxParticipantLabel}
          name="maxParticipant"
          className="flex justify-start"
        >
          <Input type="number" className="w-full" />
        </Form.Item>

        <Form.Item label={localeText.event.phone} name="phone">
          <Input type="number" className="w-full" />
        </Form.Item>

        <Form.Item
          label={localeText.event.email}
          name="email"
          rules={[
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label={localeText.event.avatar} name="avatar">
          {avatarPreview ? (
            <img className="max-w-[80px]" src={avatarPreview} />
          ) : (
            <input
              name="avatar"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleUploadAvatar(e)
              }
            />
          )}
        </Form.Item>

        <Form.Item label="Ảnh mô tả" name="descriptionImages">
          <div>
            {descriptionImagePreviews &&
              descriptionImagePreviews.length > 0 &&
              descriptionImagePreviews?.map(
                (descriptionImagePreview: any, index: number) => (
                  <img
                    key={index}
                    className="max-w-[80px] p-1"
                    src={descriptionImagePreview}
                    alt="temple-description-image"
                  />
                )
              )}
            <input
              name="descriptionImages"
              type="file"
              multiple
              onChange={(e) => handleUploadDescriptionImages(e)}
            />
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {localeText.register}
          </Button>
        </Form.Item>
      </Form>
    </FormLayout>
  );
};

export default EventOrganize;
