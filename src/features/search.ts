import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  keyword: string;
}

const initialState: SearchState = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
