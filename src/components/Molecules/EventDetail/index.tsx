"use client";

import DeleteButton from "@/components/Atoms/DeleteButton";
import EditButton from "@/components/Atoms/EditButton";
import Loading from "@/components/Atoms/Loading";
import TimeInterval from "@/components/Atoms/TimeInterval";
import {
  ERole,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { getParticipants } from "@/utils/helper";
import { Carousel, Image as ImageAntd } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  id: number;
};

const EventDetail = ({ id }: Props) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const { role } = useAppSelector((state) => state.auth);
  const [event, setEvent] = useState<any>({});
  const [images, setImages] = useState<any>([]);
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
    },
  });

  const [updateEvent] = useUpdateEventMutation();

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

  useEffect(() => {
    if (data?.getEventById?.data) {
      const eventData = data?.getEventById?.data;
      setEvent(eventData);
      setImages([
        eventData.avatar,
        ...(eventData.images
          ? eventData.images.map((image: any) => image.image)
          : []),
      ]);
    }
  }, [id, data]);

  return (
    <div className="lg:flex lg:justify-center lg:mt-10 lg:p-4">
      {loading && <Loading />}
      <div className="lg:w-[1200px] lg:grid lg:grid-cols-10">
        <div className="lg:col-span-6 lg:grid lg:grid-cols-6 lg:pt-4">
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

        <div className="text-black lg:col-span-4 p-4 text-base font-medium lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold uppercase">{event.name}</h2>
              {(role === ERole.TempleAdmin || role === ERole.TempleMember) && (
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
              )}
            </div>
            <p>
              {localeText.event.address}: {event.address}
            </p>
            <TimeInterval
              title={localeText.event.time}
              startTime={event.startDateEvent}
              endTime={event.endDateEvent}
              format={localeText.event.eventTimeFormat}
            />
            <div className="mt-3">
              <TimeInterval
                title={localeText.event.registration}
                startTime={event.startDateBooking}
                endTime={event.endDateBooking}
                format={localeText.event.eventTimeFormat}
              />
            </div>
            <div className="mt-3">
              {event.maxParticipant && (
                <span className="mr-2">
                  {localeText.event.maxParticipant(event.maxParticipant)}
                </span>
              )}
              (
              {participants &&
                participants.length &&
                participants.map((participant, index) => (
                  <span key={index}>
                    {participant}
                    {index < participants.length - 1 && ", "}
                  </span>
                ))}
              )
            </div>
            {event.phone && (
              <p>
                {localeText.event.phone}: {event.phone}
              </p>
            )}
            {event.email && (
              <p>
                {localeText.event.email}: {event.email}
              </p>
            )}
            <p className="min-h-[128px]">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
