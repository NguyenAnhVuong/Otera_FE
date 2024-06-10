import useTrans from "@/hooks/useTrans";
import { RedoOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type RedoButtonProps = {
  title?: string;
  onClick?: () => void;
};

const RedoButton: React.FC<RedoButtonProps> = ({ title, onClick }) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={title ?? localeText.redo}>
      <RedoOutlined
        className="text-green-400 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default RedoButton;
