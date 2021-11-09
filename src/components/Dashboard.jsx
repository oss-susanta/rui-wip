import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Split from "react-split";
import { useHotkeys } from "@react-hook/hotkey";
import useLatest from "@react-hook/latest";
import ActivityBar from "./ActivityBar";
import Header from "./Header";
import Aside from "./Aside";
import Content from "./Content";
import useLogin from "../hooks/useLogin";
import { actions, selectors } from "../redux/uiSilce";
import useConfig from "../config";

export default function Dashboard() {
  const config = useConfig();
  const loginState = useLogin();
  const activity = useSelector(selectors.activity);
  const asideContentSize = useSelector(selectors.asideContentSize);
  const dispatch = useDispatch();

  const onCommand = useLatest((commandId) => {
    console.log(commandId);
  });
  const hotKeys = useMemo(() => {
    return config.shortcuts.map(([shortcut, commandId]) => [
      shortcut,
      (event) => {
        event.preventDefault();
        onCommand.current(commandId);
      },
    ]);
  }, [onCommand, config.shortcuts]);
  useHotkeys(document, hotKeys);

  return (
    <div className="w-full h-full flex bg-body2">
      <ActivityBar
        value={activity}
        onChange={(id, showOrHide) =>
          dispatch(actions.toggleActivity({ id, showOrHide }))
        }
      />
      <div className="flex-1 flex flex-col">
        <Header userId={loginState.data?.id} />
        <Split
          className="flex-1 min-h-0 flex"
          direction="horizontal"
          minSize={activity ? 160 : 0}
          sizes={asideContentSize}
          snapOffset={8}
          expandToMin={!activity}
          gutterSize={activity ? 8 : 0}
          onDragEnd={(size) => dispatch(actions.resizeAside(size))}
        >
          <Aside
            activity={activity}
            onClose={(id, showOrHide) =>
              dispatch(actions.toggleActivity({ id, showOrHide }))
            }
          />
          <Content activity={activity} />
        </Split>
      </div>
    </div>
  );
}
