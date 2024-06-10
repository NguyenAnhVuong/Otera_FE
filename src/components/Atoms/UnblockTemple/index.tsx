import RedoButton from "@/components/Atoms/RedoButton";
import useTrans from "@/hooks/useTrans";
import { Popconfirm, PopconfirmProps } from "antd";

type UnblockTempleProps = {
  templeName: string;
  handleUnblockTemple: () => Promise<void>;
};

const UnblockTemple: React.FC<UnblockTempleProps> = ({
  templeName,
  handleUnblockTemple,
}) => {
  const { localeText } = useTrans();
  return (
    <Popconfirm
      title={localeText.system.temple.status.unblock}
      description={localeText.system.temple.status.unblockMessage(templeName)}
      onConfirm={handleUnblockTemple}
      okText={localeText.OK}
      cancelText={localeText.cancel}
    >
      <RedoButton title={localeText.unblock} />
    </Popconfirm>
  );
};

export default UnblockTemple;
