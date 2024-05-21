import NoData from "@/components/Atoms/NoData";
import Notification from "@/components/Molecules/Notification";
import {
  useNotificationCountSubscription,
  useNotificationsSubscription,
} from "@/graphql/generated/schema";
import useTrans from "@/hooks/useTrans";
import { useAppSelector } from "@/rtk/hook";
import { TAKE } from "@/utils/constants";
import { useMemo, useState } from "react";

const NotificationList = () => {
  const { localeText } = useTrans();
  const [limit, setLimit] = useState(TAKE);
  const { id } = useAppSelector((state) => state.auth);

  const { data: notificationData } = useNotificationsSubscription({
    variables: {
      userId: id,
      limit: TAKE,
      offset: 0,
    },
  });

  const { data: notificationCount } = useNotificationCountSubscription({
    variables: {
      userId: id,
    },
  });

  const isCanSeeMore = useMemo(
    () =>
      notificationCount?.notifications_aggregate.aggregate?.count &&
      limit < notificationCount?.notifications_aggregate.aggregate?.count,
    [limit, notificationCount?.notifications_aggregate.aggregate?.count]
  );
  return (
    <div>
      <div
        className={`max-w-[360px] border-t border-0 border-solid border-divider pt-2 ${
          isCanSeeMore && "border-b pb-2"
        }`}
      >
        {notificationData?.notifications.length ? (
          notificationData?.notifications.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              type={notification.type}
              title={notification.title}
              description={notification.description}
              isRead={notification.isRead}
              redirectTo={notification.redirectTo}
              inviteFamilyId={notification.inviteFamilyId}
              createdAt={notification.createdAt}
            />
          ))
        ) : (
          <NoData text={localeText.noNotification} />
        )}
      </div>

      {isCanSeeMore && (
        <div
          className="flex justify-center items-center p-1 mt-2 hover:bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            if (isCanSeeMore) {
              setLimit((oldLimit) => oldLimit + TAKE);
            }
          }}
        >
          <span>{localeText.seeMore}</span>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
