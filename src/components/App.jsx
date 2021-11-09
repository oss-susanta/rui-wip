import React from "react";
import { Outlet } from "react-router";
import { Button, Result } from "antd";
import Loading from "./Loading";
import useLogin from "../hooks/useLogin";

export default function App() {
  const query = useLogin();
  if (query.status === "loading") {
    return <Loading text="Securely logging you in..." />;
  }

  if (query.status === "error") {
    const status = query.error.status;
    const forbidden = status === 401 || status === 403;
    const message = forbidden ? (
      <div>
        Sorry, you are not authorized to access this page.
        <br />
        Please contact administrator.
      </div>
    ) : (
      <div>
        Sorry, we encountered an error on the server.
        <br />
        Please try again later.
      </div>
    );
    return (
      <Result
        status={forbidden ? 403 : 500}
        title="Login Failed"
        subTitle={message}
        extra={
          <Button type="primary" onClick={() => query.refetch()}>
            Try Again
          </Button>
        }
      />
    );
  }

  return <Outlet />;
}
