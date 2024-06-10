import ApproveButton from "@/components/Atoms/ApproveButton";
import useTrans from "@/hooks/useTrans";
import { Popconfirm, PopconfirmProps } from "antd";

type ApproveTempleProps = {
  templeName: string;
  handleApproveTemple: () => Promise<void>;
};

const ApproveTemple: React.FC<ApproveTempleProps> = ({
  templeName,
  handleApproveTemple,
}) => {
  const { localeText } = useTrans();
  return (
    <Popconfirm
      title={localeText.system.temple.status.approved}
      description={localeText.system.temple.status.approveMessage(templeName)}
      onConfirm={handleApproveTemple}
      okText={localeText.OK}
      cancelText={localeText.cancel}
    >
      <ApproveButton />
    </Popconfirm>
  );
};

export default ApproveTemple;
