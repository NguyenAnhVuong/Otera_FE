import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

type OfferingsProps = {
  offerings: {
    id: number;
    name: string;
    image: string;
  }[];
};

const Offerings: React.FC<OfferingsProps> = ({ offerings }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {offerings.map((offering) => (
        <Tooltip title={offering.name} key={offering.id}>
          <Image
            key={offering.name}
            src={offering.image}
            alt={offering.name}
            width={24}
            height={24}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default Offerings;
