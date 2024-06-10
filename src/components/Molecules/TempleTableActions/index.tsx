import ApproveTemple from "@/components/Atoms/ApproveTemple";
import BlockTemple from "@/components/Atoms/BlockTemple";
import Loading from "@/components/Atoms/Loading";
import PreviewTempleDetail from "@/components/Atoms/PreviewTempleDetail";
import RejectTemple from "@/components/Atoms/RejectTemple";
import ShowBlockReasonAction from "@/components/Atoms/ShowBlockReasonAction";
import ShowRejectReasonAction from "@/components/Atoms/ShowRejectReasonAction";
import UnblockTemple from "@/components/Atoms/UnblockTemple";
import {
  EStatus,
  GetTemplesDocument,
  SystemGetTemplesDocument,
  useUpdateStatusTempleMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import React from "react";

type TempleTableActionsProps = {
  status: EStatus;
  templeId: number;
  templeName: string;
  rejectReason?: string | null;
  blockReason?: string | null;
};

const TempleTableActions: React.FC<TempleTableActionsProps> = ({
  status,
  templeId,
  templeName,
  rejectReason,
  blockReason,
}) => {
  const { messageApi } = useAppSelector((state) => state.antd);
  const { localeText } = useTrans();
  const [updateTempleStatus, { loading }] = useUpdateStatusTempleMutation({
    refetchQueries: [SystemGetTemplesDocument, GetTemplesDocument],
  });

  const handleApproveTemple = async () => {
    await updateTempleStatus({
      variables: {
        updateStatusTempleInput: {
          id: templeId,
          status: EStatus.Approved,
        },
      },
      onCompleted: () => {
        messageApi.success(
          localeText.system.temple.status.approveSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(localeText.system.temple.status.approveFailMessage);
      },
    });
  };

  const handleRejectTemple = async (rejectReason: string) => {
    await updateTempleStatus({
      variables: {
        updateStatusTempleInput: {
          id: templeId,
          status: EStatus.Rejected,
          rejectReason,
        },
      },
      onCompleted: () => {
        messageApi.success(
          localeText.system.temple.status.rejectSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(localeText.system.temple.status.rejectFailMessage);
      },
    });
  };

  const handleBlockTemple = async (blockReason: string) => {
    await updateTempleStatus({
      variables: {
        updateStatusTempleInput: {
          id: templeId,
          status: EStatus.Blocked,
          blockReason,
        },
      },
      onCompleted: () => {
        messageApi.success(localeText.system.temple.status.blockSuccessMessage);
      },
      onError: () => {
        messageApi.error(localeText.system.temple.status.blockFailMessage);
      },
    });
  };

  const handleUnblockTemple = async () => {
    await updateTempleStatus({
      variables: {
        updateStatusTempleInput: {
          id: templeId,
          status: EStatus.Approved,
          blockReason: null,
        },
      },
      onCompleted: () => {
        messageApi.success(
          localeText.system.temple.status.unblockSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(localeText.system.temple.status.unblockFailMessage);
      },
    });
  };

  switch (status) {
    case EStatus.Pending:
      return (
        <div className="flex items-center gap-2 justify-center">
          {loading && <Loading />}
          <PreviewTempleDetail templeId={templeId} />
          <ApproveTemple
            templeName={templeName}
            handleApproveTemple={handleApproveTemple}
          />
          <RejectTemple handleRejectTemple={handleRejectTemple} />
        </div>
      );
    case EStatus.Approved:
      return (
        <div className="flex items-center gap-2 justify-center">
          <PreviewTempleDetail templeId={templeId} />
          <BlockTemple handleBlockTemple={handleBlockTemple} />
        </div>
      );
    case EStatus.Blocked:
      return (
        <div className="flex items-center gap-2 justify-center">
          <ShowBlockReasonAction blockReason={blockReason} />
          <UnblockTemple
            templeName={templeName}
            handleUnblockTemple={handleUnblockTemple}
          />
        </div>
      );
    case EStatus.Rejected:
      return <ShowRejectReasonAction rejectReason={rejectReason} />;
    default:
      return <PreviewTempleDetail templeId={templeId} />;
  }
};

export default TempleTableActions;
