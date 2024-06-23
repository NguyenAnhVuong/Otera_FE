import useTrans from "@/hooks/useTrans";
import { formatDate } from "@/utils/constants";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  avatar: string;
  name: string;
  address: string;
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
  address,
  startDateEvent,
  endDateEvent,
  startDateBooking,
  endDateBooking,
  maxParticipant,
}: Props) => {
  const { localeText } = useTrans();

  return (
    <Link
      className="no-underline shadow-lg rounded-lg "
      href={`/event/${id}`}
      key={id}
    >
      <Card
        className="h-[420px]"
        hoverable
        cover={
          <Image
            className="h-[280px] object-cover"
            alt={`temple-avatar-${id}`}
            src={avatar}
            width={300}
            height={280}
          />
        }
      >
        <Meta
          title={name}
          description={
            <div>
              <p>
                {localeText.event.startTime}:{" "}
                {dayjs(startDateEvent).format(formatDate.HH_mm_DD_MM_YYYY)}
              </p>
              <p>
                {localeText.event.endTime}:{" "}
                {dayjs(endDateEvent).format(formatDate.HH_mm_DD_MM_YYYY)}
              </p>
              <p className="truncate">
                {localeText.event.address}: {address}
              </p>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default Event;
