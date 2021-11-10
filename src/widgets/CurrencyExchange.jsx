import React from "react";
import axios from "redaxios";
import { useQuery } from "react-query";
import { Result, Select, Table } from "antd";
import { FcCurrencyExchange } from "react-icons/fc";
import Loading from "../components/Loading";

const currencyList = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "SGD", label: "SGD" },
  { value: "HKD", label: "HKD" },
  { value: "INR", label: "INR" },
];

const columns = [
  {
    dataIndex: "currency",
    title: "Currency",
    sorter(a, b) {
      return a.currency.localeCompare(b.currency);
    },
  },
  {
    dataIndex: "rate",
    title: "Rate",
    align: "right",
    sorter(a, b) {
      return a.rate - b.rate;
    },
  },
];

const PROXY_API = "https://thingproxy.freeboard.io/fetch";
const API_BASE = "https://open.er-api.com/v6/latest/";
function fetchExchange({ queryKey: [_key, baseCurrency] }) {
  return axios
    .get(`${PROXY_API}/${API_BASE}/${baseCurrency}`)
    .then((response) =>
      Object.entries(response.data.rates).map(([currency, rate]) => ({
        key: currency,
        currency,
        rate,
      }))
    );
}

export function CurrencyExchange({ id, baseCurrency, dispatch, updateItem }) {
  const query = useQuery(["currency-exchange", baseCurrency], fetchExchange, {
    enabled: !!baseCurrency,
  });

  if (query.status === "loading" || query.isFetching) {
    return <Loading text="Fetching exchange rates..." />;
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
        options={currencyList}
        value={baseCurrency}
        onChange={(value) => dispatch(updateItem({ id, baseCurrency: value }))}
      />
      <Table scroll size="small" dataSource={query.data} columns={columns} />
    </div>
  );
}

export function Preview() {
  return <FcCurrencyExchange className="text-2xl" />;
}

const plugin = {
  id: "currency-exchange",
  name: "Currency",
  category: "Data",
  component: CurrencyExchange,
  preview: Preview,
  moreOptions: ["remove-item"],
  beforeCreate(state) {
    state.showBorder = true;
    state.showHeader = true;
    state.title = "Currency Exchange";
  },
};

export default plugin;
