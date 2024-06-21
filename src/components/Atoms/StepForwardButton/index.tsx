import useTrans from "@/hooks/useTrans";
import { FileExcelOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type StepForwardButtonProps = {
  onClick?: () => void;
};

const StepForwardButton: React.FC<StepForwardButtonProps> = ({ onClick }) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.deathAnniversary.ready}>
      <StepForwardOutlined
        className="text-primary text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default StepForwardButton;
