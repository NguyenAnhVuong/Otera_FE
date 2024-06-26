"use client";
import axiosJWT from "@/api/axiosJWT";
import Loading from "@/components/Atoms/Loading";
import Tiptap from "@/components/Organisms/TipTap";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  ERole,
  TempleGetEventsDocument,
  useCreateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate, participantTypeOptions } from "@/utils/constants";
import { Checkbox, DatePicker, Form, FormInstance, Input, Switch } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type EventOrganizeProps = {
  form: FormInstance;
  setIsModalOpen?: (value: boolean) => void;
};

const EventOrganize: React.FC<EventOrganizeProps> = ({
  form,
  setIsModalOpen,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatar, setAvatar] = useState<File>();
  const [descriptionImages, setDescriptionImages] = useState<File[]>([]);
  const [newDescriptionImagePreviews, setNewDescriptionImagePreviews] =
    useState<string[]>([]);
  const eventTime = Form.useWatch("eventTime", form);
  const [isFreeOpen, setIsFreeOpen] = useState(false);
  const [createEvent] = useCreateEventMutation();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
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
      if (
        !isFreeOpen &&
        values.participants &&
        values.participants.length > 0
      ) {
        values.participants.forEach((participant: string) => {
          switch (participant) {
            case localeText.participantType.familyAdmin:
              roles.push(ERole.FamilyAdmin);
              break;
            case localeText.participantType.familyMember:
              roles.push(ERole.FamilyMember);
              break;
            case localeText.participantType.publicUser:
              roles.push(ERole.PublicUser);
              break;
            default:
              break;
          }
        });
      }

      const newEvent = {
        name: values.name,
        ...(eventAvatar && { avatar: eventAvatar }),
        ...(eventImages.length > 0 && {
          images: eventImages,
        }),
        description: values.description,
        isFreeOpen: values.isFreeOpen,
        startDateEvent: values.eventTime[0],
        endDateEvent: values.eventTime[1],
        address: values.address,
        phone: values.phone,
        email: values.email,
        ...(!isFreeOpen && {
          maxParticipant: Number(values.maxParticipant),
          endDateBooking: values.bookingTime[1],
          startDateBooking: values.bookingTime[0],
          roles,
        }),
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
          setAvatar(undefined);
          setDescriptionImages([]);
          setNewDescriptionImagePreviews([]);
          setIsFreeOpen(false);
          setIsModalOpen && setIsModalOpen(false);
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
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      avatar,
    });
  }, [avatar, form]);

  return (
    <>
      <Form
        form={form}
        className="w-full text-center"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        {loading && <Loading />}
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
          <Input placeholder={localeText.event.name} />
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
          <Input placeholder={localeText.event.address} />
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
            className=""
            placeholder={[localeText.event.startTime, localeText.event.endTime]}
            disabledDate={(current) => {
              return current && current < dayjs().endOf("day");
            }}
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Form.Item
            className="flex justify-start"
            initialValue={isFreeOpen}
            label={localeText.event.isFreeOpen}
            name="isFreeOpen"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.event.isFreeOpen
                ),
              },
            ]}
          >
            <Switch onChange={(value) => setIsFreeOpen(value)} />
          </Form.Item>
          <Form.Item
            label={localeText.event.maxParticipantLabel}
            name="maxParticipant"
            hidden={isFreeOpen}
            rules={
              isFreeOpen
                ? []
                : [
                    {
                      required: true,
                      message: localeText.validateMessages.required(
                        localeText.event.maxParticipantLabel
                      ),
                    },
                  ]
            }
          >
            <Input
              type="number"
              className="w-full"
              placeholder={localeText.event.maxParticipantLabel}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={localeText.event.bookingTime}
          name="bookingTime"
          hidden={isFreeOpen}
          rules={
            isFreeOpen
              ? []
              : [
                  {
                    required: true,
                    message: localeText.validateMessages.required(
                      localeText.event.bookingTime
                    ),
                  },
                ]
          }
          dependencies={["eventTime"]}
        >
          <RangePicker
            disabled={!eventTime || eventTime.length === 0}
            format={formatDate.HH_mm_DD_MM_YYYY}
            showTime
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
          hidden={isFreeOpen}
          rules={
            isFreeOpen
              ? []
              : [
                  {
                    required: true,
                    message: localeText.validateMessages.required(
                      localeText.event.participants
                    ),
                  },
                ]
          }
          initialValue={participantTypeOptions(localeText).map(
            (item) => item.value
          )}
        >
          <Checkbox.Group
            className="flex justify-between"
            options={participantTypeOptions(localeText)}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label={localeText.event.phone}
            name="phone"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.event.phone
                ),
              },
            ]}
          >
            <Input
              type="number"
              className="w-full"
              placeholder={localeText.event.phone}
            />
          </Form.Item>

          <Form.Item
            label={localeText.event.email}
            name="email"
            rules={[
              {
                type: "email",
                message: localeText.validateMessages.types.email,
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3">
          <Form.Item
            className="flex justify-start"
            label={localeText.event.avatar}
            name="avatar"
            rules={[
              {
                required: true,
                message: localeText.validateMessages.required(
                  localeText.event.avatar
                ),
              },
            ]}
          >
            <UploadSingleImage setUploadImage={setAvatar} />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            label={localeText.event.descriptionImages}
            name="descriptionImages"
          >
            <UploadDescriptionImage
              setNewDescriptionImages={setDescriptionImages}
              newDescriptionImagePreviews={newDescriptionImagePreviews}
              setNewDescriptionImagePreviews={setNewDescriptionImagePreviews}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={localeText.event.description}
          name="description"
          rules={[
            {
              required: true,
              message: localeText.validateMessages.required(
                localeText.event.description
              ),
            },
          ]}
        >
          <Tiptap
            setContent={(newContent) =>
              form.setFieldValue("description", newContent)
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default EventOrganize;
