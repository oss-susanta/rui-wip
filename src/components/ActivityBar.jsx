import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import clsx from "clsx";
import { BsFillBookmarksFill, BsTerminalFill } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { MdWidgets } from "react-icons/md";
import Trustmark from "./Trustmark";

export const options = [
  {
    id: "bookmarks",
    text: "Bookmarks",
    icon: BsFillBookmarksFill,
  },
  {
    id: "widgets",
    text: "Widgets",
    icon: MdWidgets,
  },
  {
    id: "filters",
    text: "Filter",
    icon: FaFilter,
  },
  {
    id: "state",
    text: "State",
    icon: BsTerminalFill,
  },
];

export default function ActivityBar({ value, onChange }) {
  return (
    <aside
      className={clsx([
        "flex-none full-h min-h-0",
        "p-2 flex flex-col gap-4",
        "bg-body shadow",
      ])}
    >
      <Link to="/" className="flex-none mx-auto">
        <Trustmark />
      </Link>
      <nav className="flex-1 min-h-0 overflow-auto">
        <ul className="m-0 p-0 flex flex-col items-center gap-4">
          {options.map((menu) => (
            <Tooltip key={menu.id} placement="right" title={menu.text}>
              <li className="list-none">
                <button
                  type="button"
                  className={clsx([
                    "grid place-items-center",
                    "border-0 p-0 bg-transparent outline-none rounded-sm",
                    value === menu.id ? "text-primary" : "text-icon",
                    "hover:text-primary focus:text-primary cursor-pointer",
                  ])}
                  onClick={() => onChange(menu.id, value !== menu.id)}
                >
                  <menu.icon className="text-2xl" />
                </button>
              </li>
            </Tooltip>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
