import { createSlice } from "@reduxjs/toolkit";

export const { actions, reducer } = createSlice({
  name: "dashboard",
  initialState: {
    startId: null,
    content: {},
  },
  reducers: {
    addItem(state, { payload: item }) {
      state.content[item.id] = item;
      if (state.startId == null) {
        state.startId = item.id;
      }
    },
    removeItem(state, { payload }) {
      function remove(id, parentId) {
        const item = state.content[id];
        if (item == null) return;
        if (item.layout) {
          for (const child of item.layout) {
            remove(child.id, id);
          }
        }
        const parentItem = state.content[parentId];
        if (parentItem && parentItem.layout) {
          const index = parentItem.layout.findIndex((child) => child.id === id);
          if (index !== -1) {
            parentItem.layout.splice(index, 1);
          }
        }

        delete state.content[item.id];
      }
      remove(payload.id, payload.parentId);
    },
    updateItem(state, { payload }) {
      Object.assign(state.content[payload.id], payload);
    },
  },
});

export const selectors = {
  startId(state) {
    return state.dashboard.present.startId;
  },
  contentById(id) {
    return (state) => state.dashboard.present.content[id];
  },
};
