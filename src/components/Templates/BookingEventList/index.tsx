"use client";
import PageTitle from "@/components/Atoms/PageTitle";
import BookingEventTable from "@/components/Organisms/BookingEventTable";
import { EBookingStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";

type BookingEventListProps = {};

const BookingEventList: React.FC<BookingEventListProps> = ({}) => {
  const { localeText } = useTrans();
  const [bookingStatus, setBookingStatus] = useState<EBookingStatus | null>(
    null
  );

  const onChange = (key: string) => {
    setBookingStatus(key as EBookingStatus);
  };

  const items: TabsProps["items"] = [
    {
      key: "",
      label: localeText.event.all,
    },
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

  return (
    <div>
      <PageTitle title={localeText.event.bookingEvents} />
      <Tabs
        className="flex-1"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
      <BookingEventTable bookingStatus={bookingStatus || null} />
    </div>
  );
};

export default BookingEventList;
