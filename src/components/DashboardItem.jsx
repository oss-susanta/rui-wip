import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import MoreButton from "./MoreButton";
import EmptyDashboardItem from "./EmptyDashboardItem";
import useConfig from "../config";
import { actions, selectors } from "../redux/dashboardSlice";

export default function DashboardItem({ id: propId, parentId }) {
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
    <div
      className={clsx([
        "w-full h-full flex flex-col",
        dashboardItem.showBorder && "border border-solid border-divider2",
      ])}
    >
      {dashboardItem.showHeader && (
        <header
          className={clsx([
            "flex-none p-2 flex gap-2 items-center",
            "border-0 border-b border-solid border-b-divider2 bg-body",
          ])}
        >
          <h3 className="flex-1 m-0 truncate text-sm text-inherit">
            {dashboardItem.title || `Untitled ${widget.name}`}
          </h3>
          <nav className="flex-none flex items-center">
            <MoreButton
              options={widget.moreOptions}
              onCommand={(plugin) => {
                plugin.onTrigger({
                  ...dashboardItem,
                  ...actions,
                  parentId,
                  dispatch,
                });
              }}
            />
          </nav>
        </header>
      )}
      <section className="flex-1 min-h-0 bg-body">
        <widget.component
          {...dashboardItem}
          {...actions}
          parentId={parentId}
          dispatch={dispatch}
        />
      </section>
    </div>
  );
}
