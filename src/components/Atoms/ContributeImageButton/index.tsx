import useTrans from "@/hooks/useTrans";
import { CheckOutlined, FileImageOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type ContributeImageButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const ContributeImageButton: React.FC<ContributeImageButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  const { localeText } = useTrans();
  return (
    <>
      <Tooltip placement="top" title={localeText.deceased.contributeImage}>
        <FileImageOutlined
          className="text-primary text-2xl cursor-pointer"
          onClick={onClick}
          disabled={disabled}
        />
      </Tooltip>
    </>
  );
};

export default ContributeImageButton;
