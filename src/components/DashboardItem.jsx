import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyDashboardItem from "./EmptyDashboardItem";
import useConfig from "../config";
import { actions, selectors } from "../redux/dashboardSlice";

export default function DashboardItem({ id: propId }) {
  const config = useConfig();
  const dispatch = useDispatch();
  const startId = useSelector(selectors.startId);
  const id = propId ?? startId;
  const dashboardItem = useSelector(selectors.contentById(id));
  const widget = config.widgets[dashboardItem?.type];

  if (!widget?.component) {
    return (
      <EmptyDashboardItem
        description="Empty dashboard. Please drag and drop widgets."
        onAdd={(item) => dispatch(actions.addItem(item))}
      />
    );
  }

  return (
    <widget.component
      {...dashboardItem}
      dispatch={dispatch}
      updateItem={actions.updateItem}
      addItem={actions.addItem}
      removeItem={actions.removeItem}
    />
  );
}
