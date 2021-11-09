import React from "react";
import { Dropdown, Menu } from "antd";
import { RiMoreLine } from "react-icons/ri";
import IconButton from "./IconButton";

const trigger = ["click"];

function renderMenuItems(options) {
  return options.map((option) => {
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
function renderMenu(options, onCommand) {
  return <Menu onClick={onCommand}>{renderMenuItems(options)}</Menu>;
}

export default function MoreButton({ options, onCommand }) {
  const handleCommand = ({ key }) => {
    onCommand(key);
  };
  const overlay = renderMenu(options, handleCommand);
  return (
    <Dropdown overlay={overlay} trigger={trigger}>
      <IconButton>
        <RiMoreLine className="text-base" />
      </IconButton>
    </Dropdown>
  );
}
