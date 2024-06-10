import EventApprovedAction from "@/components/Atoms/EventApprovedAction";
import EventBookingStatusAction from "@/components/Atoms/EventBookingStatusAction";
import ShowRejectReasonAction from "@/components/Atoms/ShowRejectReasonAction";
import { EBookingStatus } from "@/graphql/generated/schema";
import React from "react";

type EventParticipantListActionsProps = {
  eventParticipantId: number;
  bookingStatus: EBookingStatus;
  name: string;
  rejectReason?: string | null;
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
  endDateBooking?: Date;
};

const EventParticipantListActions: React.FC<
  EventParticipantListActionsProps
> = ({
  approverName,
  checkInAt,
  updatedAt,
  eventParticipantId,
  bookingStatus,
  name,
  rejectReason,
  endDateBooking,
}) => {
  switch (bookingStatus) {
    case EBookingStatus.Booking:
      return (
        <EventBookingStatusAction
          eventParticipantId={eventParticipantId}
          name={name}
          endDateBooking={endDateBooking}
        />
      );
    case EBookingStatus.Approved:
      return (
        <EventApprovedAction
          approverName={approverName}
          checkInAt={checkInAt}
          updatedAt={updatedAt}
        />
      );
    case EBookingStatus.Rejected:
      return <ShowRejectReasonAction rejectReason={rejectReason} />;
    default:
      return (
        <EventBookingStatusAction
          eventParticipantId={eventParticipantId}
          name={name}
        />
      );
  }
};

export default EventParticipantListActions;
