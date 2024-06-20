import DeathAnniversaryInforModal from "@/components/Molecules/DeathAnniversaryInforModal";
import RejectInforModal from "@/components/Molecules/RejectInforModal";
import {
  EDeathAnniversaryStatus,
  EDeathAnniversaryType,
  FamilyGetDeathAnniversariesDocument,
  useCancelDeathAnniversaryMutation,
  useFamilyUpdateDeathAnniversaryMutation,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import React, { useState } from "react";

type FamilyDeathAnniversaryActionsProps = {
  id: number;
  enableUpdate: boolean;
  status: EDeathAnniversaryStatus;
  rejectReason?: string | null;
  desiredStartTime: Date;
  desiredEndTime: Date;
  note?: string | null;
  isLiveStream: boolean;
  offeringIds: number[];
  deathAnniversaryType: EDeathAnniversaryType;
};

const FamilyDeathAnniversaryActions: React.FC<
  FamilyDeathAnniversaryActionsProps
> = ({
  id,
  enableUpdate,
  status,
  rejectReason,
  desiredStartTime,
  desiredEndTime,
  note,
  isLiveStream,
  offeringIds,
  deathAnniversaryType,
}) => {
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [familyUpdateDeathAnniversary] =
    useFamilyUpdateDeathAnniversaryMutation({
      refetchQueries: [FamilyGetDeathAnniversariesDocument],
      onCompleted: () => {
        messageApi.open({
          type: "success",
          content:
            localeText.deathAnniversary.updateDeathAnniversarySuccessMessage,
        });
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content:
            localeText.deathAnniversary.updateDeathAnniversaryFailMessage,
        });
      },
    });

  const [cancelDeathAnniversary] = useCancelDeathAnniversaryMutation();

  const handleEditDeathAnniversary = async (values: any) => {
    const updateDeathAnniversaryInput = {
      id,
      desiredStartTime: new Date(desiredStartTime).setHours(
        values.desiredTime[0].$H,
        values.desiredTime[0].$m
      ),
      desiredEndTime: new Date(desiredEndTime).setHours(
        values.desiredTime[1].$H,
        values.desiredTime[1].$m
      ),
      note: values.note,
      offeringIds: values.offeringIds,
      isLiveStream: values.isLiveStream,
      deathAnniversaryType: values.deathAnniversaryType,
    };

    await familyUpdateDeathAnniversary({
      variables: {
        updateDeathAnniversaryInput,
      },
    });
  };

  const handleCancelDeathAnniversary = async () => {
    const { data } = await cancelDeathAnniversary({
      variables: {
        cancelDeathAnniversaryInput: {
          id,
        },
      },
      refetchQueries: [FamilyGetDeathAnniversariesDocument],
    });

    if (data && !data.cancelDeathAnniversary.errorCode) {
      messageApi.open({
        type: "success",
        content:
          localeText.deathAnniversary.cancelDeathAnniversarySuccessMessage,
      });
    } else {
      messageApi.open({
        type: "error",
        content: localeText.deathAnniversary.cancelDeathAnniversaryFailMessage,
      });
    }
  };

  switch (status) {
    case EDeathAnniversaryStatus.Pending:
      return (
        <div className="flex justify-center gap-2 items-center">
          {new Date(desiredStartTime) > new Date() && (
            <DeathAnniversaryInforModal
              title={localeText.deathAnniversary.updateDeathAnniversary}
              isModalOpen={isEditModalOpen}
              setIsModalOpen={setIsEditModalOpen}
              handleSubmitForm={handleEditDeathAnniversary}
              data={{
                desiredStartTime,
                desiredEndTime,
                note,
                isLiveStream,
                offeringIds,
                deathAnniversaryType,
              }}
              openButton={
                <Tooltip
                  placement="top"
                  title={localeText.deathAnniversary.editInfo}
                >
                  <EditOutlined
                    className="text-green-400 text-xl cursor-pointer"
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                    size={20}
                  />
                </Tooltip>
              }
            />
          )}

          <Tooltip
            placement="top"
            title={localeText.deathAnniversary.cancelRegister}
          >
            <Popconfirm
              title={
                localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                  .title
              }
              description={
                localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                  .description
              }
              onConfirm={handleCancelDeathAnniversary}
              okText={localeText.OK}
              cancelText={localeText.cancel}
            >
              <DeleteOutlined className="text-red-500 text-xl h-fit cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      );

    case EDeathAnniversaryStatus.Rejected:
      return (
        <div className="flex justify-center items-center gap-2">
          {rejectReason && <RejectInforModal infor={rejectReason} />}
          {enableUpdate && (
            <DeathAnniversaryInforModal
              title={localeText.deathAnniversary.updateDeathAnniversary}
              isModalOpen={isEditModalOpen}
              setIsModalOpen={setIsEditModalOpen}
              handleSubmitForm={handleEditDeathAnniversary}
              data={{
                desiredStartTime,
                desiredEndTime,
                note,
                isLiveStream,
                offeringIds,
                deathAnniversaryType,
              }}
              openButton={
                <Tooltip
                  placement="top"
                  title={localeText.deathAnniversary.editInfo}
                >
                  <EditOutlined
                    className="text-green-400 text-xl cursor-pointer"
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                    size={20}
                  />
                </Tooltip>
              }
            />
          )}

          <Tooltip
            placement="top"
            title={localeText.deathAnniversary.cancelRegister}
          >
            <Popconfirm
              title={
                localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                  .title
              }
              description={
                localeText.deathAnniversary.cancelDeathAnniversaryPopConfirm
                  .description
              }
              onConfirm={handleCancelDeathAnniversary}
              okText={localeText.OK}
              cancelText={localeText.cancel}
            >
              <DeleteOutlined className="text-red-500 text-xl h-fit cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      );
    default:
      return <></>;
  }
};

export default FamilyDeathAnniversaryActions;
