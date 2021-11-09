import React from "react";
import { Collapse } from "antd";

export function CollapseLayout({
  id,
  accordion,
  activeId,
  layout,
  dispatch,
  addItem,
  removeItem,
  updateItem,
}) {
  return (
    <Collapse activeKey={activeId} accordion={accordion}>
      {layout.map((pane) => (
        <Collapse.Panel key={pane.id}>{pane.id}</Collapse.Panel>
      ))}
    </Collapse>
  );
}
