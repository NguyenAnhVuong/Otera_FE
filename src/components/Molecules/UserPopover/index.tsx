import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
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
          <Image
            className="object-cover static"
            src={user.avatar}
            alt={user.name}
            width={48}
            height={48}
          />
          <div className="flex flex-col">
            <span className="text-gray-500">{user.email}</span>
            {user.phone && <span className="text-gray-500">{user.phone}</span>}
          </div>
        </div>
      }
      title={user.name}
    >
      <Image
        className="object-cover static"
        src={user.avatar}
        alt={user.name}
        width={32}
        height={32}
      />
    </Popover>
  );
};

export default UserPopover;
