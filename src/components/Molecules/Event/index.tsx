import Image from "next/image";
import Link from "next/link";
import React from "react";
import TimeInterval from "@/components/Atoms/TimeInterval";
import useTrans from "@/hooks/useTrans";

type Props = {
  id: number;
  avatar: string;
  name: string;
  startDateEvent: string;
  endDateEvent: string;
  startDateBooking: string;
  endDateBooking: string;
  maxParticipant?: number | null;
};

const Event = ({
  id,
  avatar,
  name,
  startDateEvent,
  endDateEvent,
  startDateBooking,
  endDateBooking,
  maxParticipant,
}: Props) => {
  const { localeText } = useTrans();

  return (
    <Link
      href={`/event/${id}`}
      key={id}
      className="flex items-center border border-gray-300 hover:shadow-md border-solid p-2 cursor-pointer text-black no-underline"
    >
      <Image
        className="object-cover"
        src={avatar}
        alt={`event-avatar-${id}}`}
        width={60}
        height={60}
      />
      <div className="px-2">
        <span className="font-semibold text-lg">{name}</span>
        <div className="flex flex-col gap-2 mt-2">
          <TimeInterval
            title={localeText.event.time}
            startTime={startDateEvent}
            endTime={endDateEvent}
            format={localeText.event.eventTimeFormat}
          />
          <div className="flex gap-2">
            <TimeInterval
              title={localeText.event.registration}
              startTime={startDateBooking}
              endTime={endDateBooking}
              format={localeText.event.eventTimeFormat}
            />
            <div>
              {maxParticipant && (
                <span>({localeText.event.maxParticipant(maxParticipant)})</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Event;
