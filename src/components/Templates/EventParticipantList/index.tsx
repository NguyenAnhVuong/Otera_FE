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
  const [isFollowing, setIsFollowing] = useState(false);

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
    if (value === "isFollowing") {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
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
            style={{ width: 128 }}
            onChange={handleChange}
            options={[
              { value: "all", label: localeText.all },
              {
                value: "isFollowing",
                label: localeText.event.participant.isFollowing,
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
        isFollowing={isFollowing}
        bookingStatus={bookingStatus}
      />
    </div>
  );
};

export default EventParticipantList;
