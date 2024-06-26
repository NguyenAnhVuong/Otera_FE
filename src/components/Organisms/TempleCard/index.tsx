import useTrans from "@/hooks/useTrans";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TempleCardProps = {
  id: number;
  name: string;
  address: string;
  avatar: string;
};

const TempleCard: React.FC<TempleCardProps> = ({
  id,
  name,
  address,
  avatar,
}) => {
  const { localeText } = useTrans();
  return (
    <Link
      className="no-underline shadow-lg rounded-lg "
      href={`/temple/${id}`}
      key={id}
    >
      <Card
        className="h-[420px]"
        hoverable
        cover={
          <Image
            className="h-[280px] object-cover"
            alt={`temple-avatar-${id}`}
            src={avatar}
            width={300}
            height={280}
          />
        }
      >
        <Meta
          title={localeText.temple.preName + " " + name}
          description={address}
        />
      </Card>
    </Link>
  );
};

export default TempleCard;
