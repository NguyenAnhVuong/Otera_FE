import RejectModal from "@/components/Atoms/RejectModal";
import {
  EBookingStatus,
  GetEventParticipantsDocument,
  useUpdateEventParticipantMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, Tooltip } from "antd";
import React, { useMemo } from "react";

type EventBookingStatusActionProps = {
  eventParticipantId: number;
  name: string;
  endDateBooking?: Date;
};

const EventBookingStatusAction: React.FC<EventBookingStatusActionProps> = ({
  eventParticipantId,
  name,
  endDateBooking,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);

  const isDisabledAction = useMemo(
    () => endDateBooking && new Date(endDateBooking) < new Date(),
    [endDateBooking]
  );

  const [updateEventParticipant] = useUpdateEventParticipantMutation({
    onCompleted: () => {
      messageApi.success(
        localeText.event.participant.approveSuccessMessage(name)
      );
    },
    onError: () => {
      messageApi.error(localeText.event.participant.approveFailMessage);
    },
    refetchQueries: [GetEventParticipantsDocument],
  });

  const handleApproveEventParticipant = async () => {
    await updateEventParticipant({
      variables: {
        bookingEventInput: {
          eventParticipantId: eventParticipantId,
          bookingStatus: EBookingStatus.Approved,
        },
      },
    });
  };

  const handleRejectEventParticipant = async (rejectReason: string) => {
    await updateEventParticipant({
      variables: {
        bookingEventInput: {
          eventParticipantId: eventParticipantId,
          bookingStatus: EBookingStatus.Rejected,
          rejectReason,
        },
      },
    });
  };

  const cancel = () => {};

  if (isDisabledAction) {
    return <Tag color="red">{localeText.expired}</Tag>;
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <Popconfirm
        title={localeText.event.approved}
        description={localeText.event.participant.approveMessage(name)}
        onConfirm={handleApproveEventParticipant}
        onCancel={cancel}
        okText={localeText.OK}
        cancelText={localeText.cancel}
      >
        <Tooltip placement="top" title={localeText.event.approved}>
          <CheckOutlined className="text-green-400 text-xl cursor-pointer" />
        </Tooltip>
      </Popconfirm>
      <RejectModal onSubmit={handleRejectEventParticipant}>
        <Tooltip placement="top" title={localeText.event.rejected}>
          <CloseOutlined className="text-red-500 text-xl cursor-pointer" />
        </Tooltip>
      </RejectModal>
    </div>
  );
};

export default EventBookingStatusAction;
