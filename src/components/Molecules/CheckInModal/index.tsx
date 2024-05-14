import {
  GetEventParticipantsDocument,
  useEventParticipantCheckInMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { CHECK_IN_BEFORE } from "@/utils/constants";
import { Button, Input, Modal } from "antd";
import React, { useMemo, useState } from "react";

type CheckInModalProps = {
  eventId: number;
  eventName: string;
  startDateEvent: Date;
  endDateEvent: Date;
};

const CheckInModal: React.FC<CheckInModalProps> = ({
  eventId,
  eventName,
  startDateEvent,
  endDateEvent,
}) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const { localeText } = useTrans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const checkInIsAvailable = useMemo(() => {
    const startDateMinus3Hours = new Date(
      new Date(startDateEvent).getTime() - CHECK_IN_BEFORE
    );
    return (
      new Date() >= startDateMinus3Hours && new Date() <= new Date(endDateEvent)
    );
  }, [startDateEvent, endDateEvent]);

  const [eventParticipantCheckIn] = useEventParticipantCheckInMutation({
    onCompleted: () => {
      messageApi.success(localeText.event.participant.checkInSuccessMessage);
    },
    onError: () => {
      messageApi.error(localeText.event.participant.checkInFailMessage);
    },
    refetchQueries: [GetEventParticipantsDocument],
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await eventParticipantCheckIn({
      variables: {
        eventParticipantCheckInInput: {
          eventId,
          code,
        },
      },
    });
    setCode("");
  };

  const handleCancel = () => {
    setCode("");
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} disabled={!checkInIsAvailable}>
        {checkInIsAvailable
          ? localeText.event.participant.checkIn
          : localeText.event.participant.checkInNotAvailable}
      </Button>
      <Modal
        title={localeText.event.participant.checkIn + " " + eventName}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={localeText.event.participant.checkIn}
        cancelText={localeText.cancel}
      >
        <Input
          placeholder={localeText.event.participant.code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CheckInModal;
