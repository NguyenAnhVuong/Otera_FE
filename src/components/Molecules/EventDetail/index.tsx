"use client";

import DeleteButton from "@/components/Atoms/DeleteButton";
import EditButton from "@/components/Atoms/EditButton";
import Loading from "@/components/Atoms/Loading";
import TimeInterval from "@/components/Atoms/TimeInterval";
import {
  ERole,
  GetEventByIdDocument,
  useBookingEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { formatDate } from "@/utils/constants";
import { getParticipants } from "@/utils/helper";
import { Button, Carousel, Image as ImageAntd } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type EventDetailProps = {
  id: number;
};

const EventDetail: React.FC<EventDetailProps> = ({ id }) => {
  const { id: userId } = useAppSelector((state) => state.auth);
  const { messageApi } = useAppSelector((state) => state.antd);
  const { role } = useAppSelector((state) => state.auth);
  const [images, setImages] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const { localeText } = useTrans();
  const router = useRouter();
  const ref: any = useRef();
  const goToSlide = (index: Number) => {
    ref.current.goTo(index);
  };

  const { data, loading } = useGetEventByIdQuery({
    variables: {
      id,
    },
    onCompleted: (data) => {
      setParticipants(
        getParticipants(
          data?.getEventById?.data?.eventParticipantTypes ?? [],
          localeText
        )
      );
      if (data?.getEventById?.data) {
        const eventData = data?.getEventById?.data;
        setImages([
          eventData.avatar,
          ...(eventData.images
            ? eventData.images.map((image) => image.image)
            : []),
        ]);
      }
    },
    fetchPolicy: "no-cache",
  });

  let event = data?.getEventById?.data;

  const [updateEvent] = useUpdateEventMutation();
  const [bookingEvent] = useBookingEventMutation({
    refetchQueries: [GetEventByIdDocument],
  });

  const handleCancelEvent = async () => {
    await updateEvent({
      variables: {
        updateEventInput: {
          id,
          isDeleted: true,
        },
      },
      onCompleted: () => {
        router.push("/event");
        messageApi.success(localeText.event.cancelEventSuccessMessage);
      },
      onError: () => {
        messageApi.error(localeText.event.cancelEventFailMessage);
      },
    });
  };

  const handleBookingEvent = async () => {
    if (userId) {
      await bookingEvent({
        variables: {
          bookingEventInput: {
            eventId: id,
          },
        },
        onCompleted: () => {
          messageApi.success(localeText.event.bookingEventSuccessMessage);
        },
        onError: () => {
          messageApi.error(localeText.event.bookingEventFailMessage);
        },
      });
    } else {
      router.push("/login");
    }
  };

  const getBookingStatus = () => {
    if (event?.isBooked) {
      return localeText.event.isBooked;
    } else if (
      event?.currentParticipant &&
      event?.maxParticipant &&
      event.currentParticipant >= event.maxParticipant
    ) {
      return localeText.event.isFull;
    }
    return localeText.event.bookingEvent;
  };

  return (
    <div className="lg:flex lg:justify-center lg:mt-10 lg:p-4">
      {loading && <Loading />}
      <div className="lg:w-[1200px] lg:grid lg:grid-cols-2">
        <div className="lg:col-span-1 lg:grid lg:grid-cols-6 lg:pt-4">
          <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:gap-2">
            {images.map((image: string, index: number) => {
              return (
                <div
                  className="lg:relative lg:pt-[56.25%] lg:w-full"
                  onClick={() => goToSlide(index)}
                  key={index}
                >
                  <Image
                    className="lg:absolute lg:rounded-lg lg:cursor-pointer lg:object-cover lg:h-full lg:w-full lg:top-0 lg:left-0 lg:right-0 lg:bottom-0"
                    src={image}
                    alt=""
                    key={index}
                    fill
                  />
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-5 lg:px-2">
            <Carousel
              className="lg:rounded-lg lg:overflow-hidden"
              dots={false}
              autoplay={true}
              ref={ref}
            >
              {images.map((image: string, index: number) => {
                return (
                  <div className="max-h-[329.0625px]" key={index}>
                    <ImageAntd
                      className="lg:rounded-lg lg:overflow-hidden lg:object-cover max-h-[329.0625px]"
                      src={image}
                      key={index}
                      width={"100%"}
                      alt={`temple-image${index}`}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        <div className="text-black lg:col-span-1 p-4 text-base font-medium lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium mb-2">{event?.name}</h2>
              {role === ERole.TempleAdmin || role === ERole.TempleMember ? (
                <div className="flex items-center gap-3">
                  <EditButton
                    title={localeText.event.updateEvent}
                    onClick={() => router.push(`${id}/update`)}
                  />
                  <DeleteButton
                    tooltipTitle={localeText.event.cancelEvent}
                    popConfirmTitle={localeText.event.cancelConfirmTitle}
                    popConfirmDescription={
                      localeText.event.cancelConfirmDescription
                    }
                    okText={localeText.OK}
                    cancelText={localeText.cancel}
                    popConfirmOnConfirm={handleCancelEvent}
                  />
                </div>
              ) : event && !!event.startDateBooking ? (
                <Button
                  type="primary"
                  onClick={handleBookingEvent}
                  disabled={
                    !(
                      new Date(event?.startDateBooking) < new Date() &&
                      new Date() < new Date(event?.endDateBooking)
                    ) ||
                    (event?.currentParticipant &&
                      event?.maxParticipant &&
                      event.currentParticipant >= event.maxParticipant) ||
                    event?.isBooked
                  }
                >
                  {getBookingStatus()}
                </Button>
              ) : (
                <></>
              )}
            </div>
            <p className="mb-2">
              {localeText.event.address}: {event?.address}
            </p>
            <div className="mb-2">
              <TimeInterval
                title={localeText.event.time}
                startTime={event?.startDateEvent}
                endTime={event?.endDateEvent}
                format={formatDate.HH_mm_DD_MM_YYYY}
              />
            </div>

            {event?.startDateBooking && event?.endDateBooking && (
              <div className="mb-2">
                <TimeInterval
                  title={localeText.event.registration}
                  startTime={event?.startDateBooking}
                  endTime={event?.endDateBooking}
                  format={formatDate.HH_mm_DD_MM_YYYY}
                />
              </div>
            )}
            {participants && !!participants.length ? (
              <div className="mb-2">
                <span>{localeText.event.participants}: </span>
                {participants.map((participant, index) => (
                  <span key={index}>
                    {participant}
                    {index < participants.length - 1 && ", "}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mb-2">{localeText.event.isFreeOpen}</div>
            )}
            {event?.maxParticipant && (
              <div className="flex gap-4">
                <div className="mb-2">
                  <span className="mr-2">
                    {localeText.event.maxParticipant(event.maxParticipant)}
                  </span>
                </div>
                <div className="mb-2">
                  <span>{localeText.event.currentParticipant}: </span>
                  <span>{event?.currentParticipant}</span>
                </div>
              </div>
            )}

            {event?.email && (
              <p className="mb-2">
                {localeText.event.email}: {event.email}
              </p>
            )}

            {event?.phone && (
              <p className="mb-2">
                {localeText.event.phone}: {event.phone}
              </p>
            )}

            {event?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
