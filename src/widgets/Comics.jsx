import React, { useState } from "react";
import axios from "redaxios";
import { useQuery } from "react-query";
import { Button, Result } from "antd";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Loading from "../components/Loading";

const PROXY_API = "https://thingproxy.freeboard.io/fetch";
const API_BASE = "https://xkcd.com";
function fetchComics({ queryKey: [_key, id] }) {
  return axios
    .get(`${PROXY_API}/${API_BASE}/${id}/info.0.json`)
    .then((response) => response.data);
}

export function Comics() {
  const [index, setIndex] = useState(500);
  const query = useQuery(["comics", index], fetchComics);

  if (query.status === "loading") {
    return <Loading text="Fetching next comics..." />;
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
    <div className="w-full h-full overflow-auto bg-body shadow">
      <div className="flex justify-center m-2">
        <Button
          className="grid place-items-center"
          type="primary"
          shape="circle"
          icon={<BsArrowLeft />}
          disabled={index <= 1}
          onClick={() => setIndex((index) => index - 1)}
        />
        <Button
          className="grid place-items-center"
          type="primary"
          shape="circle"
          icon={<BsArrowRight />}
          onClick={() => setIndex((index) => index + 1)}
        />
      </div>
      <img
        className="block mx-auto object-contain"
        src={query.data?.img}
        alt={query.data?.alt}
      />
      <div className="text-center mx-4 my-2">{query.data?.alt}</div>
    </div>
  );
}

export function Preview() {
  return <div className="text-2xl">😁</div>;
}

const plugin = {
  id: "comics",
  name: "Comics",
  category: "Fun",
  component: Comics,
  preview: Preview,
};

export default plugin;
