import ApproveButton from "@/components/Atoms/ApproveButton";
import DeleteButton from "@/components/Atoms/DeleteButton";
import InforPreviewModal from "@/components/Atoms/InforPreviewModal";
import Loading from "@/components/Atoms/Loading";
import RedoButton from "@/components/Atoms/RedoButton";
import RejectButton from "@/components/Atoms/RejectButton";
import RejectModal from "@/components/Atoms/RejectModal";
import ShowRejectReasonButton from "@/components/Atoms/ShowRejectReasonButton";
import DeceasedDetail from "@/components/Templates/DeceasedDetail";
import {
  EStatus,
  TempleGetDeceasedListDocument,
  useDeleteDeceasedMutation,
  useRestoreDeceasedMutation,
  useUpdateDeceasedStatusMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { Popconfirm } from "antd";
import React from "react";

type TempleDeceasedActionsProps = {
  deceasedId: number;
  deceasedName: string;
  status: string;
  rejectReason?: string | null;
};

const TempleDeceasedActions: React.FC<TempleDeceasedActionsProps> = ({
  deceasedId,
  deceasedName,
  status,
  rejectReason,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [updateDeceasedStatus, { loading: updateDeceasedStatusLoading }] =
    useUpdateDeceasedStatusMutation({
      refetchQueries: [TempleGetDeceasedListDocument],
    });

  const [deleteDeceased, { loading: deleteDeceasedLoading }] =
    useDeleteDeceasedMutation({
      variables: {
        id: deceasedId,
      },
      onCompleted: () => {
        messageApi.success(
          localeText.temple.deceasedList.deleteDeceasedPopConfirm
            .deleteDeceasedSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(
          localeText.temple.deceasedList.deleteDeceasedPopConfirm
            .deleteDeceasedFailMessage
        );
      },

      refetchQueries: [TempleGetDeceasedListDocument],
    });

  const [restoreDeceased, { loading: restoreDeceasedLoading }] =
    useRestoreDeceasedMutation({
      variables: {
        id: deceasedId,
      },
      onCompleted: () => {
        messageApi.success(
          localeText.temple.deceasedList.restorePopconfirm
            .restoreDeceasedSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(
          localeText.temple.deceasedList.restorePopconfirm
            .restoreDeceasedFailMessage
        );
      },
      refetchQueries: [TempleGetDeceasedListDocument],
    });

  const handleApproveDeceased = async () => {
    await updateDeceasedStatus({
      variables: {
        updateDeceasedStatusInput: {
          id: deceasedId,
          status: EStatus.Approved,
        },
      },
      onCompleted: () => {
        messageApi.success(
          localeText.temple.deceasedList.status.approveSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(
          localeText.temple.deceasedList.status.approveFailMessage
        );
      },
    });
  };

  const handleRejectDeceased = async (rejectReason: string) => {
    await updateDeceasedStatus({
      variables: {
        updateDeceasedStatusInput: {
          id: deceasedId,
          status: EStatus.Rejected,
          rejectReason,
        },
      },
      onCompleted: () => {
        messageApi.success(
          localeText.temple.deceasedList.status.rejectSuccessMessage
        );
      },
      onError: () => {
        messageApi.error(
          localeText.temple.deceasedList.status.rejectFailMessage
        );
      },
    });
  };

  const handleDeleteDeceased = async () => {
    await deleteDeceased();
  };

  const handleUnblockTemple = async () => {
    await restoreDeceased();
  };

  switch (status) {
    case EStatus.Pending:
      return (
        <div className="flex gap-2 items-center">
          {updateDeceasedStatusLoading && <Loading />}
          <InforPreviewModal>
            <DeceasedDetail id={deceasedId} />
          </InforPreviewModal>
          <Popconfirm
            title={localeText.temple.deceasedList.status.approved}
            description={localeText.temple.deceasedList.status.approveMessage(
              deceasedName
            )}
            onConfirm={handleApproveDeceased}
            okText={localeText.OK}
            cancelText={localeText.cancel}
          >
            <ApproveButton />
          </Popconfirm>
          <RejectModal onSubmit={handleRejectDeceased} isRequired>
            <RejectButton />
          </RejectModal>
        </div>
      );
    case EStatus.Approved:
      return (
        <div className="flex items-center gap-2">
          {deleteDeceasedLoading && <Loading />}
          <InforPreviewModal>
            <DeceasedDetail id={deceasedId} />
          </InforPreviewModal>

          <DeleteButton
            okText={localeText.OK}
            cancelText={localeText.cancel}
            tooltipTitle={localeText.delete}
            popConfirmTitle={
              localeText.temple.deceasedList.deleteDeceasedPopConfirm.title
            }
            popConfirmDescription={localeText.temple.deceasedList.deleteDeceasedPopConfirm.description(
              deceasedName
            )}
            popConfirmOnConfirm={handleDeleteDeceased}
          />
        </div>
      );
    case EStatus.Rejected:
      return (
        <div>
          <RejectModal defaultRejectReason={rejectReason} isRequired isReadOnly>
            <ShowRejectReasonButton />
          </RejectModal>
        </div>
      );
    case "isDeleted":
      return (
        <div>
          {restoreDeceasedLoading && <Loading />}
          <Popconfirm
            title={localeText.temple.deceasedList.restorePopconfirm.title(
              deceasedName
            )}
            description={localeText.temple.deceasedList.restorePopconfirm.description(
              deceasedName
            )}
            onConfirm={handleUnblockTemple}
            okText={localeText.OK}
            cancelText={localeText.cancel}
          >
            <RedoButton title={localeText.restore} />
          </Popconfirm>
        </div>
      );
    default:
      return <div>Invalid status</div>;
  }
};

export default TempleDeceasedActions;
