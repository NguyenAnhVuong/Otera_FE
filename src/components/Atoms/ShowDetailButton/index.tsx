import useTrans from "@/hooks/useTrans";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

type ShowDetailButtonProps = {
  onClick?: () => void;
};

const ShowDetailButton: React.FC<ShowDetailButtonProps> = ({ onClick }) => {
  const { localeText } = useTrans();
  return (
    <Tooltip placement="top" title={localeText.detail}>
      <EyeOutlined
        className="text-blue-400 text-xl cursor-pointer"
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default ShowDetailButton;
