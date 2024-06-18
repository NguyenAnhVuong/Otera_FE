"use client";
import { uploadApi } from "@/api/uploadApi";
import Loading from "@/components/Atoms/Loading";
import UploadDescriptionImage from "@/components/Organisms/UploadDescriptionImage";
import UploadSingleImage from "@/components/Organisms/UploadSingleImage";
import {
  ERole,
  GetEventByIdDocument,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate, participantTypeOptions } from "@/utils/constants";
import { getParticipants } from "@/utils/helper";
import { Checkbox, DatePicker, Form, FormInstance, Input, Switch } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type UpdateEventProps = {
  id: number;
  form: FormInstance;
  setIsModalOpen?: (value: boolean) => void;
};

const UpdateEvent: React.FC<UpdateEventProps> = ({
  id,
  form,
  setIsModalOpen,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [oldDescriptionImages, setOldDescriptionImages] = useState<string[]>(
    []
  );
  const [newDescriptionImages, setNewDescriptionImages] = useState<File[]>([]);
  const [newDescriptionImagePreviews, setNewDescriptionImagePreviews] =
    useState<string[]>([]);
  const eventTime = Form.useWatch("eventTime", form);
  const [isFreeOpen, setIsFreeOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updateEvent, { loading: updateLoading }] = useUpdateEventMutation();
  const { loading } = useGetEventByIdQuery({
    variables: { id },
    onCompleted(data) {
      setAvatarPreview(data?.getEventById?.data?.avatar);
      setOldDescriptionImages(
        data?.getEventById?.data?.images.map((image) => image.image) ?? []
      );
      setIsFreeOpen(data?.getEventById.data?.isFreeOpen ?? false);
      form.setFieldsValue({
        name: data.getEventById?.data?.name,
        address: data?.getEventById?.data?.address,
        phone: data?.getEventById?.data?.phone,
        email: data?.getEventById?.data?.email,
        description: data?.getEventById?.data?.description,
        isFreeOpen: data?.getEventById?.data?.isFreeOpen,
        eventTime: [
          dayjs(data?.getEventById?.data?.startDateEvent),
          dayjs(data?.getEventById?.data?.endDateEvent),
        ],
        ...(data?.getEventById?.data?.startDateBooking && {
          bookingTime: [
            dayjs(data?.getEventById?.data?.startDateBooking),
            dayjs(data?.getEventById?.data?.endDateBooking),
          ],
        }),
        maxParticipant: data?.getEventById?.data?.maxParticipant,
        participants: getParticipants(
          data?.getEventById?.data?.eventParticipantTypes ?? [],
          localeText
        ),
      });
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const onFinish = async (values: any) => {
    try {
      let eventAvatar = "";
      if (avatar) {
        setIsUploading(true);
        const avatarFormData = new FormData();
        avatarFormData.append("file", avatar);
        const res = await uploadApi.uploadImage(avatarFormData);
        eventAvatar = res.data.url;
      }
      let eventImages: string[] = [...oldDescriptionImages];
      if (newDescriptionImages.length) {
        setIsUploading(true);
        const newDescriptionImageFormData = new FormData();
        newDescriptionImages?.forEach((newDescriptionImage) => {
          newDescriptionImageFormData.append("files", newDescriptionImage);
        });
        const res = await uploadApi.uploadImages(newDescriptionImageFormData);
        const newDescriptionImageUrls = res.data.map((image: any) => image.url);

        eventImages = [...oldDescriptionImages, ...newDescriptionImageUrls];
      }

      const roles: ERole[] = [];
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

      const newEvent = {
        id,
        name: values.name,
        ...(eventAvatar && { avatar: eventAvatar }),
        ...(eventImages &&
          eventImages.length > 0 && {
            images: eventImages,
          }),
        description: values.description,
        startDateEvent: values.eventTime[0],
        endDateEvent: values.eventTime[1],
        address: values.address,
        phone: values.phone,
        email: values.email,
        isFreeOpen: values.isFreeOpen,
        ...(isFreeOpen
          ? {
              maxParticipant: null,
              endDateBooking: null,
              startDateBooking: null,
              roles: [],
            }
          : {
              roles,
              startDateBooking: values.bookingTime[0],
              endDateBooking: values.bookingTime[1],
              maxParticipant: Number(values.maxParticipant),
            }),
      };

      await updateEvent({
        variables: {
          updateEventInput: newEvent,
        },
        onCompleted() {
          messageApi.open({
            type: "success",
            content: localeText.event.updateEventSuccessMessage,
          });
          setIsUploading(false);
          setNewDescriptionImages([]);
          setNewDescriptionImagePreviews([]);
          setIsModalOpen && setIsModalOpen(false);
        },
        onError() {
          messageApi.open({
            type: "error",
            content: localeText.event.updateEventFailMessage,
          });
        },
        refetchQueries: [GetEventByIdDocument],
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {(loading || isUploading || updateLoading) && <Loading />}

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
            initialValue={false}
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
          <Form.Item label={localeText.event.phone} name="phone">
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
          >
            <UploadSingleImage
              imageSrc={avatarPreview}
              setUploadImage={setAvatar}
            />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            label={localeText.event.descriptionImages}
            name="descriptionImages"
          >
            <UploadDescriptionImage
              oldDescriptionImages={oldDescriptionImages}
              setOldDescriptionImages={setOldDescriptionImages}
              setNewDescriptionImages={setNewDescriptionImages}
              newDescriptionImagePreviews={newDescriptionImagePreviews}
              setNewDescriptionImagePreviews={setNewDescriptionImagePreviews}
            />
          </Form.Item>
        </div>

        <Form.Item label={localeText.event.description} name="description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateEvent;
