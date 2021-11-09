import React from "react";
import clsx from "clsx";
import lazy from "./Lazy";

const COMPONENTS = {
  bookmarks: null,
  widgets: lazy(() => import("./Widgets")),
  state: null,
  filters: null,
};

export default function Aside({ activity, onClose }) {
  const Component = COMPONENTS[activity];
  const handleClose = () => onClose(activity, false);
  return (
    <aside className={clsx(["h-full", activity && "pl-2 py-2"])}>
      {Component && <Component onClose={handleClose} />}
    </aside>
  );
}
