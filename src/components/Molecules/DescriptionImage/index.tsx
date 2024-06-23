import { CloseOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";

type DescriptionImageProps = {
  imageSrc: string;
  handleRemove: (imageSrc: string) => void;
};

const DescriptionImage: React.FC<DescriptionImageProps> = ({
  imageSrc,
  handleRemove,
}) => {
  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden w-24 h-24">
        <Image
          className="w-24 h-24 object-cover"
          src={imageSrc}
          alt="temple-description-image"
        />
      </div>
      <div
        className="bg-primary rounded-full text-white absolute -top-2 -right-2 flex p-1 cursor-pointer"
        onClick={() => handleRemove(imageSrc)}
      >
        <CloseOutlined className="text-xs" />
      </div>
    </div>
  );
};

export default DescriptionImage;
