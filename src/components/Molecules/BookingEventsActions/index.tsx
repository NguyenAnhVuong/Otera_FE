import DeleteButton from "@/components/Atoms/DeleteButton";
import EventApproveAction from "@/components/Atoms/EventApproveAction";
import EventRejectStatusAction from "@/components/Atoms/EventRejectStatusAction";
import {
  EBookingStatus,
  GetBookingEventsDocument,
  GetEventByIdDocument,
  useCancelBookingEventMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import React from "react";

type BookingEventsActionsProps = {
  eventId: number;
  bookingStatus: EBookingStatus;
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
  rejectReason?: string | null;
};

const BookingEventsActions: React.FC<BookingEventsActionsProps> = ({
  eventId,
  bookingStatus,
  approverName,
  checkInAt,
  updatedAt,
  rejectReason,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [cancelBooking] = useCancelBookingEventMutation({
    onCompleted: () => {
      messageApi.success(
        localeText.event.participant.cancelBookingSuccessMessage
      );
    },
    onError: () => {
      messageApi.error(localeText.event.participant.cancelBookingFailedMessage);
    },
    refetchQueries: [GetBookingEventsDocument, GetEventByIdDocument],
  });

  const handleCancelBooking = async () => {
    await cancelBooking({
      variables: {
        eventId,
      },
    });
  };

  switch (bookingStatus) {
    case EBookingStatus.Booking:
      return (
        <DeleteButton
          okText={localeText.OK}
          cancelText={localeText.cancel}
          tooltipTitle={
            localeText.event.participant.cancelBookingPopConfirm.title
          }
          popConfirmTitle={
            localeText.event.participant.cancelBookingPopConfirm.title
          }
          popConfirmDescription={
            localeText.event.participant.cancelBookingPopConfirm.description
          }
          popConfirmOnConfirm={handleCancelBooking}
        />
      );
    case EBookingStatus.Approved:
      return (
        <div className="flex justify-center items-center gap-2">
          <EventApproveAction
            approverName={approverName}
            checkInAt={checkInAt}
            updatedAt={updatedAt}
          />
          <DeleteButton
            okText={localeText.OK}
            cancelText={localeText.cancel}
            tooltipTitle={
              localeText.event.participant.cancelBookingPopConfirm.title
            }
            popConfirmTitle={
              localeText.event.participant.cancelBookingPopConfirm.title
            }
            popConfirmDescription={
              localeText.event.participant.cancelBookingPopConfirm.description
            }
            popConfirmOnConfirm={handleCancelBooking}
          />
        </div>
      );
    case EBookingStatus.Rejected:
      return <EventRejectStatusAction rejectReason={rejectReason} />;
    default:
      return null;
  }
};

export default BookingEventsActions;
