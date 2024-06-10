import RejectButton from "@/components/Atoms/RejectButton";
import RejectModal from "@/components/Atoms/RejectModal";

type RejectTempleProps = {
  handleRejectTemple: (rejectReason: string) => Promise<void>;
  defaultRejectReason?: string | null;
  isReadOnly?: boolean;
};

const RejectTemple: React.FC<RejectTempleProps> = ({
  handleRejectTemple,
  defaultRejectReason,
  isReadOnly,
}) => {
  return (
    <RejectModal
      onSubmit={handleRejectTemple}
      defaultRejectReason={defaultRejectReason}
      isReadOnly={isReadOnly}
      isRequired
    >
      <RejectButton />
    </RejectModal>
  );
};

export default RejectTemple;
