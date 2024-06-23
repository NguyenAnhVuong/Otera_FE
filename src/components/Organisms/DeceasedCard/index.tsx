import { Card } from "antd";
import Link from "next/link";
import React from "react";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { getLongevity } from "@/utils/helper";
import useTrans from "@/hooks/useTrans";
import dayjs from "dayjs";
import { formatDate } from "@/utils/constants";

type DeceasedCardProps = {
  id: number;
  name: string;
  avatar: string;
  birthday: string;
  dateOfDeath: string;
};

const DeceasedCard: React.FC<DeceasedCardProps> = ({
  id,
  name,
  avatar,
  birthday,
  dateOfDeath,
}) => {
  const { localeText } = useTrans();
  return (
    <Link
      className="no-underline shadow-lg rounded-lg"
      href={`/deceased/${id}`}
      key={id}
    >
      <Card
        hoverable
        cover={
          <Image
            className="h-[280px] object-cover"
            alt={`deceased-avatar-${id}`}
            src={avatar}
            width={300}
            height={280}
          />
        }
      >
        <Meta
          className="h-[100px]"
          title={name}
          description={
            <div>
              <p>
                {localeText.deceased.birthday}:{" "}
                {dayjs(birthday).format(formatDate.DD_MM_YYYY)}
              </p>
              <p>
                {localeText.deceased.dateOfDeath}:{" "}
                {dayjs(dateOfDeath).format(formatDate.DD_MM_YYYY)}
              </p>
              <p>
                {localeText.deceased.longevity}:{" "}
                {getLongevity(new Date(birthday), new Date(dateOfDeath))}{" "}
                {localeText.deceased.age}
              </p>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default DeceasedCard;
