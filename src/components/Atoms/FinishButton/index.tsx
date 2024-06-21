import useTrans from "@/hooks/useTrans";
import { CheckOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type FinishButtonButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const FinishButton: React.FC<FinishButtonButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  const { localeText } = useTrans();
  return (
    <>
      <Tooltip placement="top" title={localeText.deathAnniversary.finish}>
        <FileDoneOutlined
          className="text-green-400 text-xl cursor-pointer"
          onClick={onClick}
        />
      </Tooltip>
    </>
  );
};

export default FinishButton;
