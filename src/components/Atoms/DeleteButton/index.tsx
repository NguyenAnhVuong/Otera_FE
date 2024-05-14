import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import React from "react";

type DeleteButtonProps = {
  disabled?: boolean;
  okText: string;
  cancelText: string;
  tooltipTitle: string;
  popConfirmTitle: string;
  popConfirmDescription: string;
  popConfirmOnConfirm: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  disabled = true,
  okText,
  cancelText,
  tooltipTitle,
  popConfirmTitle,
  popConfirmDescription,
  popConfirmOnConfirm,
}) => {
  return (
    <Tooltip placement="top" title={tooltipTitle}>
      <Popconfirm
        title={popConfirmTitle}
        description={popConfirmDescription}
        onConfirm={popConfirmOnConfirm}
        okText={okText}
        cancelText={cancelText}
      >
        <DeleteOutlined
          className="text-red-500 text-xl cursor-pointer"
          disabled={disabled}
          size={20}
        />
      </Popconfirm>
    </Tooltip>
  );
};

export default DeleteButton;
