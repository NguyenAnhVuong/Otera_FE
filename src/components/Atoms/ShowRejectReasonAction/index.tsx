import RejectModal from "@/components/Atoms/RejectModal";
import ShowRejectReasonButton from "@/components/Atoms/ShowRejectReasonButton";
import React from "react";

type ShowRejectReasonActionProps = {
  rejectReason?: string | null;
};

const ShowRejectReasonAction: React.FC<ShowRejectReasonActionProps> = ({
  rejectReason,
}) => {
  return (
    <RejectModal isReadOnly defaultRejectReason={rejectReason}>
      <ShowRejectReasonButton />
    </RejectModal>
  );
};

export default ShowRejectReasonAction;
