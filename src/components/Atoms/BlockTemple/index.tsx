import BlockModal from "@/components/Atoms/BlockModal";
import BlockButton from "@/components/Atoms/BlockButton";

type BlockTempleProps = {
  handleBlockTemple: (blockReason: string) => Promise<void>;
  defaultBlockReason?: string | null;
  isReadOnly?: boolean;
};

const BlockTemple: React.FC<BlockTempleProps> = ({
  handleBlockTemple,
  defaultBlockReason,
  isReadOnly,
}) => {
  return (
    <BlockModal
      onSubmit={handleBlockTemple}
      defaultBlockReason={defaultBlockReason}
      isReadOnly={isReadOnly}
      isRequired
    >
      <BlockButton />
    </BlockModal>
  );
};

export default BlockTemple;
