import React from "react";
import clsx from "clsx";
import { Avatar, Dropdown, Menu } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillQuestionOctagonFill, BsGridFill } from "react-icons/bs";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import IconButton from "./IconButton";
import useConfig from "../config";

const mainMenu = [
  {
    id: "newDashboard",
    text: "New Dashboard",
    shortcut: "Ctrl+N",
  },
  {
    id: "openDashboard",
    text: "Open Dashboard",
    shortcut: "Ctrl+O",
  },
  {
    id: "saveDashboard",
    text: "Save",
    shortcut: "Ctrl+S",
  },
  {
    id: "saveAsDashbaord",
    text: "Save As...",
    shortcut: "Ctrl+Shift+S",
  },
  {
    id: "divider1",
    type: "divider",
  },
  {
    id: "undo",
    text: "Undo",
    shortcut: "Ctrl+Z",
  },
  {
    id: "redo",
    text: "Redo",
    shortcut: "Ctrl+Y",
  },
];

const avatarOptions = [
  {
    id: "showMyProfile",
    text: "My Profile",
    icon: FiUser,
  },
  {
    id: "showSettings",
    text: "Settings",
    icon: FiSettings,
    shortcut: "Ctrl+,",
  },
  {
    id: "logOut",
    text: "Log Out",
    icon: FiLogOut,
  },
];

function renderMenu(options, onClick) {
  return (
    <Menu onClick={({ key }) => onClick(key)}>
      {options.map((option) => {
        if (option.type === "divider") {
          return <Menu.Divider key={option.id} />;
        }
        return (
          <Menu.Item
            key={option.id}
            icon={option.icon ? <option.icon /> : null}
          >
            <div className="flex items-center gap-4">
              <span>{option.text}</span>
              {option.shortcut && (
                <span className="ml-auto opacity-95">{option.shortcut}</span>
              )}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default function Header({ userId, name = "Untitled Dashboard" }) {
  const { helpUrl } = useConfig();
  return (
    <header
      className={clsx([
        "flex-none p-2 flex items-center gap-2 bg-body",
        "border-0 border-b border-solid border-b-divider",
      ])}
    >
      <h1 className="flex-1 m-0 truncate text-base text-inherit">{name}</h1>
      <nav className="flex-none flex items-center gap-2">
        <Dropdown overlay={renderMenu(mainMenu)}>
          <IconButton>
            <BsGridFill className="text-icon text-2xl" />
          </IconButton>
        </Dropdown>
        <a
          href={helpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="grid place-items-center flex-none"
        >
          <BsFillQuestionOctagonFill className="text-icon text-2xl" />
        </a>
        <i className="flex-none w-px h-4 m-0 bg-divider" />
        <Dropdown overlay={renderMenu(avatarOptions)}>
          <figure className="flex-none m-0 flex items-center gap-2">
            <Avatar size="small" icon={<AiOutlineUser />} />
            <figcaption className="text-xs">{userId}</figcaption>
          </figure>
        </Dropdown>
      </nav>
    </header>
  );
}
