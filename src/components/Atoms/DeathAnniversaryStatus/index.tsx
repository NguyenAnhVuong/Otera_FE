import { EStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tag } from "antd";

type DeathAnniversaryStatusProps = {
  status: EStatus;
};

const DeathAnniversaryStatus: React.FC<DeathAnniversaryStatusProps> = ({
  status,
}) => {
  const { localeText } = useTrans();
  switch (status) {
    case EStatus.Rejected:
      return <Tag color="red">{localeText.deathAnniversary.reject}</Tag>;
    case EStatus.Approved:
      return <Tag color="green">{localeText.deathAnniversary.approve}</Tag>;
    default:
      return <Tag color="blue">{localeText.deathAnniversary.pending}</Tag>;
  }
};

export default DeathAnniversaryStatus;
