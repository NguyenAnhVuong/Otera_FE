import { EDeathAnniversaryStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tag } from "antd";

type DeathAnniversaryStatusProps = {
  status: EDeathAnniversaryStatus;
};

const DeathAnniversaryStatus: React.FC<DeathAnniversaryStatusProps> = ({
  status,
}) => {
  const { localeText } = useTrans();
  switch (status) {
    case EDeathAnniversaryStatus.Rejected:
      return (
        <Tag className="m-0" color="red">
          {localeText.deathAnniversary.reject}
        </Tag>
      );
    case EDeathAnniversaryStatus.Approved:
      return (
        <Tag className="m-0" color="green">
          {localeText.deathAnniversary.approve}
        </Tag>
      );
    case EDeathAnniversaryStatus.Ready:
      return (
        <Tag className="m-0" color="cyan">
          {localeText.deathAnniversary.ready}
        </Tag>
      );
    case EDeathAnniversaryStatus.Finished:
      return (
        <Tag className="m-0" color="gold">
          {localeText.deathAnniversary.finished}
        </Tag>
      );
    default:
      return (
        <Tag className="m-0" color="blue">
          {localeText.deathAnniversary.pending}
        </Tag>
      );
  }
};

export default DeathAnniversaryStatus;
