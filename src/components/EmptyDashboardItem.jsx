import React from "react";
import { useDispatch } from "react-redux";
import { Button, Empty } from "antd";
import { actions } from "../redux/uiSilce";
import { actions as dashboardActions } from "../redux/dashboardSlice";
import useConfig from "../config";
import uid from "../utils/uid";

export default function EmptyDashboardItem({ description, onAdd }) {
  const config = useConfig();
  const dispatch = useDispatch();
  return (
    <div
      className="w-full h-full grid place-items-center bg-body shadow"
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copyMove";
      }}
      onDrop={(event) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("type");
        const widget = config.widgets[type];
        const newItem = { type, id: uid() };
        widget?.beforeCreate?.(newItem, dispatch, dashboardActions);
        onAdd(newItem);
        widget?.afterCreate?.(newItem, dispatch, dashboardActions);
      }}
    >
      <Empty description={description}>
        <Button
          type="primary"
          onClick={() =>
            dispatch(
              actions.toggleActivity({ id: "widgets", showOrHide: true })
            )
          }
        >
          Open Widgets
        </Button>
      </Empty>
    </div>
  );
}
