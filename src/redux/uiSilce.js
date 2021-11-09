import { createSlice } from "@reduxjs/toolkit";

export const { actions, reducer } = createSlice({
  name: "ui",
  initialState: {
    asideSize: 25,
    activity: null,
  },
  reducers: {
    resizeAside(state, { payload: [asideSize] }) {
      state.asideSize = asideSize;
    },
    toggleActivity(state, { payload: { id, showOrHide } }) {
      state.activity = showOrHide ? id : null;
    },
  },
});

export const selectors = {
  activity(state) {
    return state.ui.activity;
  },
  asideContentSize(state) {
    const asideSize = state.ui.activity ? state.ui.asideSize : 0;
    const contentSize = 100 - asideSize;
    return [asideSize, contentSize];
  },
};
