import { EStatus } from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { Tag } from "antd";

type DeceasedStatusProps = {
  status: EStatus;
  isDeleted?: boolean;
};

const DeceasedStatus: React.FC<DeceasedStatusProps> = ({
  status,
  isDeleted = false,
}) => {
  const { localeText } = useTrans();
  if (isDeleted)
    return (
      <Tag className="m-0" color="red">
        {localeText.deceased.status.isDeleted}
      </Tag>
    );
  switch (status) {
    case EStatus.Pending:
      return (
        <Tag className="m-0" color="blue">
          {localeText.deceased.status.pending}
        </Tag>
      );
    case EStatus.Approved:
      return (
        <Tag className="m-0" color="green">
          {localeText.deceased.status.approved}
        </Tag>
      );
    case EStatus.Rejected:
      return (
        <Tag className="m-0" color="red">
          {localeText.deceased.status.rejected}
        </Tag>
      );
    default:
      return <></>;
  }
};

export default DeceasedStatus;
