import { Popover } from "antd";
import Image from "next/image";
import React from "react";

type UserPopoverProps = {
  user: {
    name: string;
    avatar: string;
    email: string;
    phone?: string;
  };
};

const UserPopover: React.FC<UserPopoverProps> = ({ user }) => {
  return (
    <Popover
      content={
        <div className="flex gap-2">
          <div className="w-12 h-12 ">
            <Image
              className="object-cover static rounded-full"
              src={user.avatar}
              alt={user.name}
              fill
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">{user.email}</span>
            {user.phone && <span className="text-gray-500">{user.phone}</span>}
          </div>
        </div>
      }
      title={user.name}
    >
      <div className="w-8 h-8 ">
        <Image
          className="object-cover static rounded-full"
          src={user.avatar}
          alt={user.name}
          fill
        />
      </div>
    </Popover>
  );
};

export default UserPopover;
