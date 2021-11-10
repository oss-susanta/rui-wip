import { createContext, useContext } from "react";
import actions from "./actions";
import widgets from "./widgets";

export const config = {
  actions,
  widgets,
  shortcuts: [
    [["mod", "n"], "newDashboard"],
    [["mod", "o"], "openDashboard"],
    [["mod", "s"], "saveDashboard"],
    [["mod", "z"], "undo"],
    [["mod", "y"], "redo"],
    [["mod", ","], "showSettings"],
  ],
  helpUrl: "https://sc.com",
};

export const Context = createContext();

export default function useConfig() {
  return useContext(Context) || config;
}
