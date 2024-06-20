import { EDeathAnniversaryType } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tag } from "antd";
import React from "react";

type DeathAnniversaryTypeProps = {
  deathAnniversaryType: EDeathAnniversaryType;
};

const DeathAnniversaryType: React.FC<DeathAnniversaryTypeProps> = ({
  deathAnniversaryType,
}) => {
  const { localeText } = useTrans();
  switch (deathAnniversaryType) {
    case EDeathAnniversaryType.FirstAnniversary:
      return (
        <Tag className="m-0" color="gold">
          {localeText.deathAnniversary.firstAnniversary}
        </Tag>
      );
    case EDeathAnniversaryType.SecondAnniversary:
      return (
        <Tag className="m-0" color="cyan">
          {localeText.deathAnniversary.secondAnniversary}
        </Tag>
      );
    case EDeathAnniversaryType.RegularAnniversary:
      return (
        <Tag className="m-0" color="green">
          {localeText.deathAnniversary.regularAnniversary}
        </Tag>
      );
    default:
      return <></>;
  }
};

export default DeathAnniversaryType;
