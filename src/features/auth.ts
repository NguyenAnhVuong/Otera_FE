import { User } from "@/models/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  // -1 means not logged in
  id: -1,
  name: "",
  email: "",
  avatar: "",
  role: "",
  familyId: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
      state.familyId = action.payload.familyId;
    },
    logout: (state) => {
      state.id = -1;
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.role = "";
      state.familyId = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
