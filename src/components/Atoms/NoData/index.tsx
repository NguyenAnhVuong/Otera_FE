import useTrans from "@/hooks/useTrans";
import { Empty } from "antd";
import React from "react";

type NoDataProps = {
  text?: string;
};

const NoData: React.FC<NoDataProps> = ({ text }) => {
  const { localeText } = useTrans();
  return <Empty description={text ?? localeText.noData} />;
};

export default NoData;
