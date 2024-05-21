import { useNewNotificationCountSubscription } from "@/graphql/generated/schema";
import { useAppSelector } from "@/rtk/hook";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Popover } from "antd";
import NotificationList from "@/components/Molecules/NotificationList";
import useTrans from "@/hooks/useTrans";

const Notifications = () => {
  const { id } = useAppSelector((state) => state.auth);
  const { localeText } = useTrans();
  const { data: newNotiCountData } = useNewNotificationCountSubscription({
    variables: {
      userId: id,
    },
  });

  return (
    <div className="mx-4">
      <Popover
        className="cursor-pointer"
        placement="bottomRight"
        content={<NotificationList />}
        title={localeText.notification}
        trigger="click"
      >
        <Badge
          className="text-xl"
          count={newNotiCountData?.notifications_aggregate.aggregate?.count}
          overflowCount={99}
          size="small"
        >
          <BellOutlined className="text-2xl" />
        </Badge>
      </Popover>
    </div>
  );
};

export default Notifications;
