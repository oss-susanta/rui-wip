import React from "react";
import clsx from "clsx";
import axios from "redaxios";
import { useQuery } from "react-query";
import { Button, Result } from "antd";
import { BsArrowRight } from "react-icons/bs";
import Loading from "../components/Loading";

const PROXY_API = "https://thingproxy.freeboard.io/fetch";
const API_BASE =
  "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
function fetchJokes() {
  return axios
    .get(`${PROXY_API}/${API_BASE}`)
    .then((response) => response.data);
}

export function Jokes({ id, parentId, dispatch, removeItem }) {
  const query = useQuery(["joke", id], fetchJokes);

  const handleCommand = (commandId) => {
    if (commandId === "removeItem") {
      dispatch(removeItem({ id, parentId }));
    }
  };

  if (query.status === "loading" || query.isFetching) {
    return <Loading text="Fetching next joke..." />;
  }

  if (query.status === "error") {
    return (
      <Result
        status="error"
        title="Request Failed"
        subTitle={query.error?.message}
        extra={
          <Button type="primary" onClick={() => query.refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <div
      className={clsx([
        "w-full h-full overflow-auto",
        "grid place-items-center bg-body",
      ])}
    >
      <div>
        <div className="text-center mx-4 my-2">{query.data?.joke}</div>
        <div className="flex justify-center">
          <Button
            className="grid place-items-center"
            type="primary"
            shape="circle"
            icon={<BsArrowRight />}
            onClick={() => query.refetch()}
          />
        </div>
      </div>
    </div>
  );
}

export function Preview() {
  return <div className="text-2xl">🤣</div>;
}

const plugin = {
  id: "jokes",
  name: "Jokes",
  category: "Fun",
  component: Jokes,
  preview: Preview,
  moreOptions: ["remove-item"],
  beforeCreate(state) {
    state.showBorder = true;
    state.showHeader = true;
  },
};

export default plugin;
