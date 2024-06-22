import { Image } from "antd";
import React from "react";

type AlbumImageProps = {
  images: string[];
};

const AlbumImage: React.FC<AlbumImageProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((image) => (
        <div
          className="overflow-hidden rounded-lg w-[88px] h-[88px]"
          key={image}
        >
          <Image
            className="rounded-lg object-cover"
            src={image}
            alt={image}
            width={88}
            height={88}
          />
        </div>
      ))}
    </div>
  );
};

export default AlbumImage;
