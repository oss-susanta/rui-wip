import React from "react";
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

export function Jokes({ id }) {
  const query = useQuery(["joke", id], fetchJokes);

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
    <div className="w-full h-full grid place-items-center overflow-auto bg-body shadow">
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
};

export default plugin;
