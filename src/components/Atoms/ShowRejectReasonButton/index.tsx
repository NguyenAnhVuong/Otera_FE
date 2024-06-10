import useTrans from "@/hooks/useTrans";
import { FileExcelOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type ShowRejectReasonButtonProps = {
  onClick?: () => void;
};

const ShowRejectReasonButton: React.FC<ShowRejectReasonButtonProps> = ({
  onClick,
}) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.rejectReason}>
      <FileExcelOutlined
        className="text-red-400 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ShowRejectReasonButton;
