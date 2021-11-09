import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import undoable from "redux-undo";
import * as dashboard from "./dashboardSlice";
import * as ui from "./uiSilce";

export default configureStore({
  reducer: {
    ui: ui.reducer,
    dashboard: undoable(dashboard.reducer),
  },
  middleware: (get) => get().concat(logger),
});
