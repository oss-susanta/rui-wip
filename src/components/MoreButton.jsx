import React from "react";
import { Dropdown, Menu } from "antd";
import { RiMoreLine } from "react-icons/ri";
import IconButton from "./IconButton";
import useConfig from "../config";

const trigger = ["click"];

function renderMenuItems(options, actions) {
  return options.map((optionOrId) => {
    const option =
      typeof optionOrId === "string" ? actions[optionOrId] : optionOrId;
    if (option == null) return null;
    if (option.type === "divider") {
      return <Menu.Divider key={option.id} />;
    }
    if (option.children) {
      return (
        <Menu.SubMenu title={option.text}>
          {renderMenuItems(option.children, onCommand)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item
        key={option.id}
        icon={option.icon && <option.icon className="text-base" />}
      >
        {option.text}
      </Menu.Item>
    );
  });
}
function renderMenu(options, actions, onCommand) {
  const handleCommand = ({ key }) => {
    const action = actions[key] || options.find((option) => option.id === key);
    onCommand(action);
  };
  return (
    <Menu onClick={handleCommand}>{renderMenuItems(options, actions)}</Menu>
  );
}

export default function MoreButton({ options, onCommand }) {
  const { actions } = useConfig();
  const overlay = renderMenu(options, actions, onCommand);
  return (
    <Dropdown overlay={overlay} trigger={trigger}>
      <IconButton>
        <RiMoreLine className="text-base" />
      </IconButton>
    </Dropdown>
  );
}
