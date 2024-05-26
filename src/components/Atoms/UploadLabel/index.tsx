import useTrans from "@/hooks/useTrans";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

type UploadLabelProps = {
  htmlFor: string;
};

const UploadLabel: React.FC<UploadLabelProps> = ({ htmlFor }) => {
  const { localeText } = useTrans();
  return (
    <label
      htmlFor={htmlFor}
      className="w-24 h-24 flex flex-col cursor-pointer justify-center items-center border hover:text-primary hover:border-primary border-dashed rounded-lg bg-gray-50 "
    >
      <PlusOutlined className="text-xl" />
      <span className="mt-1 text-sm">{localeText.upload}</span>
    </label>
  );
};

export default UploadLabel;
