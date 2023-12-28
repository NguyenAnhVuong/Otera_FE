import { antdActions } from "@/features/antd";
import { useAppDispatch } from "@/rtk/hook";
import { message, notification } from "antd";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AntdProvider = ({ children }: Props) => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(antdActions.setMessageApi(messageApi));
    dispatch(antdActions.setNotificationApi(notificationApi));
  }, [dispatch, messageApi, notificationApi]);
  return (
    <>
      {messageContextHolder}
      {notificationContextHolder}
      {children}
    </>
  );
};

export default AntdProvider;
