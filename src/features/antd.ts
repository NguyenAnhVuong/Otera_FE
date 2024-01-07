import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";

export interface AntdAPI {
  messageApi: MessageInstance;
  notificationApi: NotificationInstance;
}

const initialState: AntdAPI = {
  messageApi: message,
  notificationApi: notification,
};

const antdSlice = createSlice({
  name: "antd",
  initialState,
  reducers: {
    setMessageApi: (state, action: PayloadAction<MessageInstance>) => {
      state.messageApi = action.payload;
    },
    setNotificationApi: (
      state,
      action: PayloadAction<NotificationInstance>
    ) => {
      state.notificationApi = action.payload;
    },
  },
});

export const antdActions = antdSlice.actions;
export const antdReducer = antdSlice.reducer;
export const messageApiSelector = (state: { antd: AntdAPI }) =>
  state.antd.messageApi;
export const notificationApiSelector = (state: { antd: AntdAPI }) =>
  state.antd.notificationApi;
