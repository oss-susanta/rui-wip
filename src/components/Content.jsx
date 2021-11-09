import React from "react";
import clsx from "clsx";
import DashboardItem from "./DashboardItem";

export default function Content({ activity }) {
  return (
    <main
      className={clsx([
        "w-full h-full overflow-hidden",
        activity ? "pl-0 pr-2 py-2" : "p-2",
      ])}
    >
      <DashboardItem />
    </main>
  );
}
