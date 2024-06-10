import ShowDetailButton from "@/components/Atoms/ShowDetailButton";
import useTrans from "@/hooks/useTrans";
import { formatDate } from "@/utils/constants";
import { Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

type EventApprovedActionProps = {
  approverName?: string;
  checkInAt?: Date | null;
  updatedAt?: Date | null;
};

const EventApprovedAction: React.FC<EventApprovedActionProps> = ({
  approverName,
  checkInAt,
  updatedAt,
}) => {
  const { localeText } = useTrans();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ShowDetailButton onClick={showModal} />
      <Modal
        title={localeText.detail}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={localeText.OK}
        cancelButtonProps={{
          style: { display: "none" },
        }}
      >
        <div className="mb-2">
          <span>{localeText.event.participant.checkInAt}: </span>
          <span>
            {checkInAt
              ? dayjs(checkInAt).format(formatDate.HH_mm_DD_MM_YYYY)
              : localeText.event.participant.notCheckIn}
          </span>
        </div>

        {approverName && updatedAt && (
          <div>
            <span>{localeText.event.participant.approvedBy(approverName)}</span>
            <span> {localeText.event.participant.at} </span>
            <span>{dayjs(updatedAt).format(formatDate.HH_mm_DD_MM_YYYY)}</span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EventApprovedAction;
