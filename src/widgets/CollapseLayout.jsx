import React, { useState } from "react";
import { Collapse, Dropdown, Menu } from "antd";
import { BsHddStackFill } from "react-icons/bs";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";
import { RiMoreLine } from "react-icons/ri";
import DashboardItem from "../components/DashboardItem";
import IconButton from "../components/IconButton";
import { RenameModal } from "../components/Rename";
import uid from "../utils/uid";

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
  const [modal, setModal] = useState(null);
  if (layout == null) return null;

  const handleChange = (key) => {
    dispatch(updateItem({ id, activeId: key }));
  };

  const handleAdd = () => {
    const nextPaneId = uid();
    const nextGrid = { id: nextPaneId, type: "grid-layout", layout: [] };
    const nextPane = { id: nextPaneId, name: "New Page" };
    const nextLayout = layout.concat(nextPane);
    dispatch(addItem(nextGrid));
    dispatch(
      updateItem({
        id,
        layout: nextLayout,
        activeId: accordion
          ? nextPaneId
          : Array.isArray(activeId)
          ? activeId.concat(nextPaneId)
          : [nextPaneId],
      })
    );
  };
  const handleRemove = ({ id: paneId }) => {
    const nextLayout = layout.filter((pane) => pane.id !== paneId);
    let nextActiveId = activeId;
    if (accordion && activeId === paneId) {
      nextActiveId = nextLayout[0]?.id;
    }
    if (!accordion && Array.isArray(activeId) && activeId.includes(paneId)) {
      nextActiveId = activeId.filter((pId) => pId !== paneId);
    }
    dispatch(removeItem({ id: paneId, parentId: id }));
    dispatch(
      updateItem({
        id,
        layout: nextLayout,
        activeId: nextActiveId,
      })
    );
  };
  const handleRename = (name) => {
    const paneId = modal.id;
    setModal(null);
    const nextLayout = layout.map((pane) =>
      pane.id === paneId ? { ...pane, name } : pane
    );
    dispatch(updateItem({ id, layout: nextLayout }));
  };
  const handleSwitchMode = () => {
    let nextActiveId = activeId;
    if (accordion && activeId) {
      nextActiveId = [activeId];
    }
    if (!accordion && Array.isArray(activeId) && activeId.length) {
      nextActiveId = activeId[0];
    }
    dispatch(updateItem({ id, activeId: nextActiveId, accordion: !accordion }));
  };

  const renderOverlay = (pane) => {
    return (
      <Menu>
        <Menu.Item
          key="add"
          icon={<FiPlus className="text-base" />}
          onClick={() => handleAdd(pane)}
        >
          Add Panel
        </Menu.Item>
        <Menu.Item
          key="switch-mode"
          icon={<BsHddStackFill className="text-base" />}
          onClick={handleSwitchMode}
        >
          Toggle Mode
        </Menu.Item>
        <Menu.Item
          key="rename"
          icon={<FiEdit className="text-base" />}
          onClick={() =>
            setModal({ id: pane.id, name: pane.name, type: "rename" })
          }
        >
          Rename Panel
        </Menu.Item>
        <Menu.Item
          key="remove"
          icon={<FiX className="text-base" />}
          disabled={layout.length <= 1}
          onClick={() => handleRemove(pane)}
        >
          Remove Panel
        </Menu.Item>
      </Menu>
    );
  };

  const renderExtra = (pane) => {
    return (
      <nav onClick={(event) => event.stopPropagation()}>
        <Dropdown overlay={renderOverlay(pane)} trigger={["click"]}>
          <IconButton>
            <RiMoreLine className="text-xl" />
          </IconButton>
        </Dropdown>
      </nav>
    );
  };

  return (
    <div className="max-h-full overflow-auto">
      <Collapse
        accordion={accordion}
        activeKey={activeId}
        onChange={handleChange}
      >
        {layout.map((pane) => (
          <Collapse.Panel
            key={pane.id}
            header={pane.name}
            extra={renderExtra(pane)}
          >
            <DashboardItem id={pane.id} parentId={id} />
          </Collapse.Panel>
        ))}
      </Collapse>
      {modal?.type === "rename" && (
        <RenameModal
          value={modal.name}
          title="Rename Pane"
          onOk={handleRename}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}

export function Preview() {
  return <BsHddStackFill className="text-2xl" />;
}

const plugin = {
  id: "collapse-layout",
  category: "Layout",
  name: "Collapse",
  component: CollapseLayout,
  preview: Preview,
  beforeCreate(state) {
    state.showBorder = true;
    state.accordion = true;
  },
  afterCreate(state, dispatch, actions) {
    const grid = {
      id: uid(),
      type: "grid-layout",
      layout: [],
    };
    const layout = [{ id: grid.id, name: "Start Panel" }];
    dispatch(actions.addItem(grid));
    dispatch(
      actions.updateItem({ id: state.id, layout: layout, activeId: grid.id })
    );
  },
};

export default plugin;
