import React, { useMemo, useRef } from "react";
import { pick } from "lodash";
import useSize from "@react-hook/size";
import ReactGridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { BsGrid1X2Fill } from "react-icons/bs";
import DashboardItem from "../components/DashboardItem";
import EmptyDashboardItem from "../components/EmptyDashboardItem";
import useConfig from "../config";
import uid from "../utils/uid";

const defaults = {
  margin: [8, 8],
  resizeHandles: ["se"],
  isDroppable: true,
  droppingItem: { i: "__dropping-elem__", w: 3, h: 12 },
};
const itemProps = ["x", "y", "w", "h"];

export function GridLayout({ id, layout, dispatch, updateItem, addItem }) {
  const containerRef = useRef();
  const [width] = useSize(containerRef);
  const config = useConfig();

  const grid = useMemo(() => {
    if (layout == null) return [];
    return layout.map((item) => {
      const newItem = pick(item, itemProps);
      newItem.i = item.id;
      return newItem;
    });
  }, [layout]);

  const handleLayoutChange = (eventLayout) => {
    const newLayout = eventLayout.map((item) => {
      const newItem = pick(item, itemProps);
      newItem.id = item.i;
      return newItem;
    });
    dispatch(updateItem({ id, layout: newLayout }));
  };

  const handleDrop = (eventLayout, eventItem, event) => {
    event.preventDefault();
    event.stopPropagation();
    const type = event.dataTransfer.getData("type");
    const widget = config.widgets[type];
    let newItem = { type, id: uid() };
    widget?.afterCreate?.(newItem);
    dispatch(addItem(newItem));
    const newLayout = eventLayout.map((item) => {
      if (item.i === eventItem.i) {
        return { ...eventItem, i: newItem.id };
      }
      return item;
    });
    handleLayoutChange(newLayout);
  };

  const handleCreate = (item) => {
    dispatch(addItem(item));
    const newLayout = [{ id: item.id, x: 0, y: 0, w: 3, h: 12 }];
    dispatch(updateItem({ id, layout: newLayout }));
  };

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto">
      {grid.length ? (
        <ReactGridLayout
          {...defaults}
          width={width}
          className="rui-grid-layout"
          cols={12}
          rowHeight={8}
          layout={grid}
          onLayoutChange={handleLayoutChange}
          onDrop={handleDrop}
        >
          {layout.map((item) => (
            <div key={item.id} className="rui-grid-layout-item">
              {item.id !== "__dropping-elem__" && (
                <DashboardItem id={item.id} />
              )}
            </div>
          ))}
        </ReactGridLayout>
      ) : (
        <EmptyDashboardItem
          description="Empty Grid. Please drag and drop widgets."
          onAdd={handleCreate}
        />
      )}
    </div>
  );
}

export function Preview() {
  return <BsGrid1X2Fill className="text-2xl" />;
}

const plugin = {
  id: "grid-layout",
  category: "Layout",
  name: "Grid",
  component: GridLayout,
  preview: Preview,
};

export default plugin;
