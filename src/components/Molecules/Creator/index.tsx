import useTrans from "@/hooks/useTrans";
import Image from "next/image";
import React from "react";

type CreatorProps = {
  avatar: string;
  name: string;
  email: string;
};
// TODO add link user profile
const Creator: React.FC<CreatorProps> = ({ avatar, name, email }) => {
  const { localeText } = useTrans();
  return (
    <div className="flex cursor-pointer">
      <div className="w-12 h-12">
        <Image
          className="object-contain static"
          src={avatar}
          alt={localeText.temple.followers.avatar}
          fill
        />
      </div>

      <div className="flex flex-col items-start">
        <span className="ml-2 font-bold">{name}</span>
        <span className="ml-2">{email}</span>
      </div>
    </div>
  );
};

export default Creator;
