import useTrans from "@/hooks/useTrans";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";

type CopyBoxProps = {
  tooltip?: string;
  text: string;
};

const CopyBox: React.FC<CopyBoxProps> = ({ tooltip, text }) => {
  const { localeText } = useTrans();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyTextToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <>
      {isCopied ? (
        <Tooltip title={localeText.copied}>
          <CheckOutlined className="ml-1 cursor-pointer text-green-400 text-base" />
        </Tooltip>
      ) : (
        <Tooltip title={tooltip ?? localeText.copy}>
          <CopyOutlined
            className="ml-1 cursor-pointer text-blue-400 text-base"
            onClick={handleCopyTextToClipboard}
          />
        </Tooltip>
      )}
    </>
  );
};

export default CopyBox;
