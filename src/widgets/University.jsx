import React, { useState } from "react";
import axios from "redaxios";
import { useQuery } from "react-query";
import { Result, Select, Table } from "antd";
import { FaUniversity } from "react-icons/fa";
import Loading from "../components/Loading";

const countryList = [
  { value: "United+States", label: "United States" },
  { value: "United+Kingdom", label: "United Kingdom" },
  { value: "China", label: "China" },
  { value: "Singapore", label: "Singapore" },
  { value: "India", label: "India" },
];

const columns = [
  {
    dataIndex: "name",
    title: "Name",
    sorter(a, b) {
      return a.name.localeCompare(b.name);
    },
  },
  {
    dataIndex: "website",
    title: "Link",
    render(link) {
      return <a href={link}>{link}</a>;
    },
  },
];

const API_BASE = "http://universities.hipolabs.com/search";
function fetchVarsity({ queryKey: [_key, country] }) {
  return axios.get(`${API_BASE}?country=${country}`).then((response) =>
    response.data.map((info) => ({
      key: info.name,
      name: info.name,
      website: info.web_pages?.[0],
    }))
  );
}

export function University() {
  const [country, setCountry] = useState("India");
  const query = useQuery(["university", country], fetchVarsity, {
    enabled: !!country,
  });

  if (query.status === "loading" || query.isFetching) {
    return <Loading text="Fetching universities..." />;
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
    <div className="w-full h-full p-2 overflow-auto bg-body shadow">
      <Select
        className="w-full mb-2"
        options={countryList}
        value={country}
        onChange={(value) => setCountry(value)}
      />
      <Table scroll size="small" dataSource={query.data} columns={columns} />
    </div>
  );
}

export function Preview() {
  return <FaUniversity className="text-2xl" />;
}

const plugin = {
  id: "university",
  name: "University",
  category: "Data",
  component: University,
  preview: Preview,
  moreOptions: ["remove-item"],
  beforeCreate(state) {
    state.showBorder = true;
    state.showHeader = true;
    state.title = "University";
  },
};

export default plugin;
