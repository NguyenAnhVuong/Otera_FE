import useTrans from "@/hooks/useTrans";
import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type BlockButtonProps = {
  onClick?: () => void;
};

const BlockButton: React.FC<BlockButtonProps> = ({ onClick }) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.block}>
      <CloseOutlined
        className="text-red-500 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default BlockButton;
