import useTrans from "@/hooks/useTrans";
import Image from "next/image";
import React from "react";

type AvatarCustomProps = {
  src: string;
};

const AvatarCustom: React.FC<AvatarCustomProps> = ({ src }) => {
  const { localeText } = useTrans();
  return (
    <Image
      className="object-contain static w-16"
      src={src}
      alt={localeText.temple.followers.avatar}
      fill
    />
  );
};

export default AvatarCustom;
