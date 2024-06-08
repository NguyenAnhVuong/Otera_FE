import EventApprovedAction from "@/components/Atoms/EventApproveAction";
import EventBookingStatusAction from "@/components/Atoms/EventBookingStatusAction";
import EventRejectStatusAction from "@/components/Atoms/EventRejectStatusAction";
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
      return <EventRejectStatusAction rejectReason={rejectReason} />;
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
