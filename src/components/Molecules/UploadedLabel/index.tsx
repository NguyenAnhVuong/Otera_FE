import { Image } from "antd";
import React from "react";

type UploadedLabelProps = {
  preview: string;
  htmlFor: string;
};

const UploadedLabel: React.FC<UploadedLabelProps> = ({ htmlFor, preview }) => {
  return (
    <label htmlFor={htmlFor} className="overflow-hidden cursor-pointer">
      <Image
        className="object-cover w-24 h-24 rounded-lg"
        src={preview}
        alt="avatar"
        preview={false}
      />
    </label>
  );
};

export default UploadedLabel;
