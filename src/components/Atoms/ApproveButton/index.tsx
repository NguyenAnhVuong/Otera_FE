import useTrans from "@/hooks/useTrans";
import { CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type ApproveButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const ApproveButton: React.FC<ApproveButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  const { localeText } = useTrans();
  return (
    <>
      <Tooltip placement="top" title={localeText.event.approved}>
        <CheckOutlined
          className="text-green-400 text-xl cursor-pointer"
          onClick={onClick}
          disabled={disabled}
        />
      </Tooltip>
    </>
  );
};

export default ApproveButton;
