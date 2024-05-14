import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type EditButtonProps = {
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({
  title,
  disabled = true,
  onClick,
}) => {
  return (
    <Tooltip placement="top" title={title}>
      <EditOutlined
        className="text-green-400 text-xl cursor-pointer"
        onClick={onClick}
        disabled={disabled}
        size={20}
      />
    </Tooltip>
  );
};

export default EditButton;
