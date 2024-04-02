import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-screen w-full bg-white z-50 fixed opacity-60 top-0 left-0">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
  </div>
);
export default Loading;
