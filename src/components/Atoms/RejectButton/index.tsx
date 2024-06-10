import useTrans from "@/hooks/useTrans";
import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type RejectButtonProps = {
  onClick?: () => void;
};

const RejectButton: React.FC<RejectButtonProps> = ({ onClick }) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.event.rejected}>
      <CloseOutlined
        className="text-red-500 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default RejectButton;
