import { antdReducer } from "@/features/antd";
import { authReducer } from "@/features/auth";
import { searchReducer } from "@/features/search";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    antd: antdReducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
