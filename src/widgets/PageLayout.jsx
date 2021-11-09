import React from "react";
import { batch } from "react-redux";
import { Tabs } from "antd";
import { BsStack } from "react-icons/bs";
import EditableText from "../components/EditableText";
import DashboardItem from "../components/DashboardItem";
import uid from "../utils/uid";

export function PageLayout({
  id,
  activeId,
  layout,
  dispatch,
  addItem,
  removeItem,
  updateItem,
}) {
  const handlePageRenamed = (pageId, name) => {
    const next = layout.map((page) =>
      page.id === pageId ? { ...page, name } : page
    );
    dispatch(updateItem({ id, layout: next }));
  };
  const handlePageChanged = (activeId) => {
    dispatch(updateItem({ id, activeId }));
  };
  const handlePageEdited = (pageId, actionType) => {
    if (actionType === "add") {
      const nextPageId = uid();
      const nextGrid = { id: nextPageId, type: "grid-layout", layout: [] };
      const nextPage = { id: nextPageId, name: "New Page" };
      const nextLayout = layout.concat(nextPage);
      dispatch(addItem(nextGrid));
      dispatch(
        updateItem({
          id,
          layout: nextLayout,
          activeId: nextPageId,
        })
      );
    } else if (actionType === "remove") {
      const nextLayout = layout.filter((page) => page.id !== pageId);
      const nextActiveId = activeId === pageId ? nextLayout[0]?.id : activeId;
      dispatch(removeItem(pageId));
      dispatch(
        updateItem({
          id,
          layout: nextLayout,
          currentItem: nextActiveId,
        })
      );
    }
  };

  return (
    <div className="w-full h-full bg-body shadow">
      {layout && (
        <Tabs
          type="editable-card"
          activeKey={activeId}
          tabPosition="bottom"
          className="rui-tabs"
          destroyInactiveTabPane
          onChange={handlePageChanged}
          onEdit={handlePageEdited}
        >
          {layout.map((page) => (
            <Tabs.TabPane
              key={page.id}
              tab={
                <EditableText
                  className="select-none"
                  title="Reanme Page"
                  value={page.name}
                  onChange={(value) => handlePageRenamed(page.id, value)}
                />
              }
              closable={true}
              className="flex-1 min-h-0"
            >
              <DashboardItem id={page.id} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
}

export function Preview() {
  return <BsStack className="text-2xl" />;
}

const plugin = {
  id: "page-layout",
  category: "Layout",
  name: "Page",
  component: PageLayout,
  preview: Preview,
  afterCreate(state, dispatch, actions) {
    const grid = {
      id: uid(),
      type: "grid-layout",
      layout: [],
    };
    const layout = [{ id: grid.id, name: "Start Page" }];
    dispatch(actions.addItem(grid));
    dispatch(actions.updateItem({ id: state.id, layout: layout }));
  },
};

export default plugin;
