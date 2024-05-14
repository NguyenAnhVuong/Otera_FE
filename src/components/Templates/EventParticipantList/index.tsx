"use client";
import Loading from "@/components/Atoms/Loading";
import PageTitle from "@/components/Atoms/PageTitle";
import SearchInput from "@/components/Atoms/SearchInput";
import CheckInModal from "@/components/Molecules/CheckInModal";
import EventParticipantTable from "@/components/Organisms/EventParticipantTable";
import {
  EBookingStatus,
  useGetEventByIdQuery,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Select, Tabs, TabsProps } from "antd";
import React, { useState } from "react";

type EventParticipantListProps = {
  eventId: number;
};

const EventParticipantList: React.FC<EventParticipantListProps> = ({
  eventId,
}) => {
  const { localeText } = useTrans();
  const [bookingStatus, setBookingStatus] = useState<EBookingStatus>(
    EBookingStatus.Booking
  );
  const [isBelongToTemple, setIsBelongToTemple] = useState(false);

  const { data, loading } = useGetEventByIdQuery({
    variables: {
      id: eventId,
    },
  });

  const onChange = (key: string) => {
    setBookingStatus(key as EBookingStatus);
  };

  const items: TabsProps["items"] = [
    {
      key: EBookingStatus.Booking,
      label: localeText.event.registration,
    },
    {
      key: EBookingStatus.Approved,
      label: localeText.event.approved,
    },
    {
      key: EBookingStatus.Rejected,
      label: localeText.event.rejected,
    },
  ];

  const handleChange = (value: string) => {
    if (value === "isBelongToTemple") {
      setIsBelongToTemple(true);
    } else {
      setIsBelongToTemple(false);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <PageTitle title={data?.getEventById.data?.name} />
      <div className="flex justify-between items-center gap-2">
        <Tabs
          className="flex-1"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
        <div className="flex gap-2">
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "all", label: localeText.all },
              {
                value: "isBelongToTemple",
                label: localeText.event.participant.belongsToTemple,
              },
            ]}
          />
          <CheckInModal
            eventId={eventId}
            eventName={data?.getEventById.data?.name || localeText.event.event}
            startDateEvent={data?.getEventById.data?.startDateEvent}
            endDateEvent={data?.getEventById.data?.endDateEvent}
          />
        </div>
      </div>
      <EventParticipantTable
        eventId={eventId}
        isBelongToTemple={isBelongToTemple}
        bookingStatus={bookingStatus}
      />
    </div>
  );
};

export default EventParticipantList;
