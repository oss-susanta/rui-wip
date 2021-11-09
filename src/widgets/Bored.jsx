import React from "react";
import axios from "redaxios";
import { useQuery } from "react-query";
import { Button, Result } from "antd";
import { BsArrowRight } from "react-icons/bs";
import Loading from "../components/Loading";

function getColor(id) {
  const colors = ["#CDB4DB", "#FFC8DD", "#f2cc8f", "#BDE0FE", "#B2DE9D"];
  return colors[+id % colors.length];
}

const PROXY_API = "https://thingproxy.freeboard.io/fetch";
const API_BASE = "https://www.boredapi.com/api/activity";
function fetchActivity() {
  return axios
    .get(`${PROXY_API}/${API_BASE}`)
    .then((response) => response.data);
}

export function Bored({ id }) {
  const query = useQuery(["bored", id], fetchActivity);

  if (query.status === "loading" || query.isFetching) {
    return <Loading text="Fetching your next activity..." />;
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
      className="w-full h-full grid place-items-center overflow-auto shadow"
      style={{ background: getColor(id) }}
    >
      <div>
        <div className="text-center mx-4 my-2">{query.data?.activity}</div>
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
  return <div className="text-2xl">🥱</div>;
}

const plugin = {
  id: "bored",
  name: "Bored",
  category: "Fun",
  component: Bored,
  preview: Preview,
};

export default plugin;
