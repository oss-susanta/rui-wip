import React, { useMemo, useState } from "react";
import { Card, Input } from "antd";
import { FiX } from "react-icons/fi";
import { useDebounce } from "@react-hook/debounce";
import IconButton from "./IconButton";
import useConfig from "../config";

const tabList = [
  { key: "default", tab: "Default" },
  { key: "saved", tab: "Saved" },
];

function DefaultWidgets() {
  const config = useConfig();
  const [search, setSearch] = useDebounce("");
  const unfilteredGroups = useMemo(() => {
    const groups = {};
    Object.values(config.widgets).forEach((widget) => {
      const widgets = groups[widget.category] || [];
      widgets.push(widget);
      groups[widget.category] = widgets;
    });
    return groups;
  }, [config.widgets]);
  const groups = useMemo(() => {
    const term = search.toLowerCase();
    const groups = {};
    Object.entries(unfilteredGroups).forEach(([category, widgets]) => {
      const filteredWidgets = widgets.filter((widget) =>
        widget.name.toLowerCase().includes(term)
      );
      if (filteredWidgets.length > 0) {
        groups[category] = filteredWidgets;
      }
    });
    return groups;
  }, [search, unfilteredGroups]);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex-none px-2">
        <Input.Search
          enterButton
          placeholder="Search widget"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {Object.entries(groups).map(([group, widgets]) => (
          <div key={group} className="p-2">
            <h4 className="mb-1 text-center text-base">{group}</h4>
            <section className="flex flex-wrap gap-2">
              {widgets.map((widget) => (
                <Card
                  draggable
                  hoverable
                  key={widget.id}
                  title={widget.name}
                  size="small"
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "copyMove";
                    event.dataTransfer.setData("type", widget.id);
                  }}
                >
                  <div className="text-center">
                    {widget.preview ? <widget.preview /> : widget.name}
                  </div>
                </Card>
              ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Widgets({ onClose }) {
  const [activeKey, setActiveKey] = useState(tabList[0].key);
  return (
    <Card
      size="small"
      className="rui-card w-full h-full flex flex-col"
      tabList={tabList}
      tabProps={{ size: "small" }}
      activeTabKey={activeKey}
      tabBarExtraContent={
        <IconButton onClick={onClose}>
          <FiX />
        </IconButton>
      }
      onTabChange={(key) => setActiveKey(key)}
    >
      {activeKey === "default" && <DefaultWidgets />}
    </Card>
  );
}
