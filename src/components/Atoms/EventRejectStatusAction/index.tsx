import useTrans from "@/hooks/useTrans";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import RejectModal from "@/components/Atoms/RejectModal";

type EventRejectStatusActionProps = {
  rejectReason?: string | null;
};

const EventRejectStatusAction: React.FC<EventRejectStatusActionProps> = ({
  rejectReason,
}) => {
  const { localeText } = useTrans();
  return (
    <RejectModal isReadOnly defaultRejectReason={rejectReason}>
      <Tooltip placement="top" title={localeText.detail}>
        <EyeOutlined className="text-blue-400 text-xl cursor-pointer" />
      </Tooltip>
    </RejectModal>
  );
};

export default EventRejectStatusAction;
