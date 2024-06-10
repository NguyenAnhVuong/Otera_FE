import RejectModal from "@/components/Atoms/RejectModal";
import ShowBlockReasonButton from "@/components/Atoms/ShowBlockReasonButton";
import React from "react";

type ShowBlockReasonActionProps = {
  blockReason?: string | null;
};

const ShowBlockReasonAction: React.FC<ShowBlockReasonActionProps> = ({
  blockReason,
}) => {
  return (
    <RejectModal isReadOnly defaultRejectReason={blockReason}>
      <ShowBlockReasonButton />
    </RejectModal>
  );
};

export default ShowBlockReasonAction;
