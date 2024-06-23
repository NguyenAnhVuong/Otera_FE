import { Image } from "antd";
import React from "react";

type UploadedLabelProps = {
  preview: string;
  htmlFor: string;
  isReadOnly?: boolean;
};

const UploadedLabel: React.FC<UploadedLabelProps> = ({
  htmlFor,
  preview,
  isReadOnly = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="overflow-hidden cursor-pointer w-24 h-24  rounded-lg"
    >
      <Image
        className="object-cover w-24 h-24 rounded-lg"
        src={preview}
        alt="avatar"
        preview={isReadOnly}
      />
    </label>
  );
};

export default UploadedLabel;
