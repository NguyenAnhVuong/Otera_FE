import useTrans from "@/hooks/useTrans";
import { FileExcelOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type ShowBlockReasonButtonProps = {
  onClick?: () => void;
};

const ShowBlockReasonButton: React.FC<ShowBlockReasonButtonProps> = ({
  onClick,
}) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.blockReason}>
      <FileExcelOutlined
        className="text-red-400 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ShowBlockReasonButton;
