import useTrans from "@/hooks/useTrans";
import { Empty } from "antd";
import React from "react";

type Props = {};

const NoData = (props: Props) => {
  const { localeText } = useTrans();
  return <Empty description={localeText.noData} />;
};

export default NoData;
