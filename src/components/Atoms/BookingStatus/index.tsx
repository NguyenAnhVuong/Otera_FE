import { EBookingStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tag } from "antd";
import React from "react";

type BookingStatusProps = {
  bookingStatus: EBookingStatus;
};

const BookingStatus: React.FC<BookingStatusProps> = ({ bookingStatus }) => {
  const { localeText } = useTrans();
  switch (bookingStatus) {
    case EBookingStatus.Booking:
      return <Tag color="gold">{localeText.event.participant.pending}</Tag>;
    case EBookingStatus.Approved:
      return <Tag color="green">{localeText.event.participant.approved}</Tag>;
    case EBookingStatus.Rejected:
      return <Tag color="red">{localeText.event.participant.rejected}</Tag>;
    default:
      return <Tag color="gold">{localeText.event.participant.pending}</Tag>;
  }
};

export default BookingStatus;
