import {
  ENotificationType,
  EStatus,
  GetUserDocument,
  useResponseFamilyInvitationMutation,
  useUpdateNotificationMutation,
} from "@/graphql/generated/schema";
import { useLogout } from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { useAppDispatch, useAppSelector } from "@/rtk/hook";
import { formatTimeDifference } from "@/utils/helper";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type NotificationProps = {
  id: number;
  type: ENotificationType;
  title: string;
  redirectTo?: string | null;
  isRead: boolean;
  inviteFamilyId?: number | null;
  description?: string | null;
  createdAt: Date;
};

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  redirectTo,
  isRead,
  inviteFamilyId,
  description,
  createdAt,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = useLogout();
  const { localeText } = useTrans();
  const { messageApi } = useAppSelector((state) => state.antd);
  const [responseFamilyInvitation] = useResponseFamilyInvitationMutation({
    refetchQueries: [GetUserDocument],
  });

  const [updateNotification] = useUpdateNotificationMutation();

  const handleReadNotification = async () => {
    await updateNotification({
      variables: {
        updateNotificationInput: {
          id,
          isRead: true,
        },
      },
    });
  };

  const handleResponseFamilyInvitation = async (status: EStatus) => {
    await responseFamilyInvitation({
      variables: {
        responseInviteFamilyInput: {
          id: inviteFamilyId as number,
          status,
          notificationId: id,
        },
      },
      onCompleted: async () => {
        if (status === EStatus.Approved) {
          messageApi.success(
            localeText.family.familyMember.approveSuccessMessage
          );

          await handleLogout(dispatch);
          router.push("/login");
        } else {
          messageApi.success(
            localeText.family.familyMember.rejectSuccessMessage
          );
        }
      },
      onError: () => {
        if (status === EStatus.Approved) {
          messageApi.error(localeText.family.familyMember.approveFailMessage);
        } else {
          messageApi.error(localeText.family.familyMember.rejectFailMessage);
        }
      },
    });
  };

  switch (type) {
    case ENotificationType.InviteFamily:
      return (
        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg overflow-hidden">
          {!isRead && <div className="bg-primary p-1 rounded-full mr-2" />}
          <div className="flex flex-col">
            <span className="font-bold">{title}</span>
            <div>
              <span>{description}</span>
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-xs">
                  {formatTimeDifference(createdAt)}
                </span>
                <div>
                  <Button
                    className="mr-2"
                    size="small"
                    onClick={() =>
                      handleResponseFamilyInvitation(EStatus.Rejected)
                    }
                  >
                    {localeText.family.familyMember.reject}
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() =>
                      handleResponseFamilyInvitation(EStatus.Approved)
                    }
                  >
                    {localeText.family.familyMember.approve}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case ENotificationType.NewEvent:
    case ENotificationType.UpdateEvent:
    case ENotificationType.ApproveEventParticipant:
    case ENotificationType.RejectEventParticipant:
    case ENotificationType.RequestDeathAnniversary:
    case ENotificationType.ApproveDeathAnniversary:
    case ENotificationType.RejectDeathAnniversary:
    case ENotificationType.ReadyDeathAnniversary:
    case ENotificationType.FinishDeathAnniversary:
    case ENotificationType.ContributeDeceasedImage:
    case ENotificationType.DeclareDeceased:
    case ENotificationType.UpdateDeceased:
    case ENotificationType.ApproveDeceased:
    case ENotificationType.DeleteDeceased:
    case ENotificationType.CancelEvent:
    case ENotificationType.RejectDeceased:
    case ENotificationType.RestoreDeceased:
    case ENotificationType.TempleRegisterSent:
    case ENotificationType.TempleRegister:
    case ENotificationType.ApproveTemple:
    case ENotificationType.RejectTemple:
    case ENotificationType.BlockTemple:
    case ENotificationType.DeathAnniversaryComingAfterDays:
    case ENotificationType.DeathAnniversaryToday:
      return (
        <div
          className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg overflow-hidden"
          onClick={handleReadNotification}
        >
          <div
            className={`${
              isRead ? "bg-transparent" : "bg-primary"
            } p-1 rounded-full mr-2`}
          />
          <Link href={redirectTo ? redirectTo : "#"}>
            <span className="font-bold text-black">{title}</span>
            <div className="text-black text-xs">{description}</div>
            <span className="text-gray-400 text-xs">
              {formatTimeDifference(createdAt)}
            </span>
          </Link>
        </div>
      );
    default:
      return <div>Notification</div>;
  }
};

export default Notification;
