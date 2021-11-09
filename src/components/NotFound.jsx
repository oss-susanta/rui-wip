import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="Not Found"
      subTitle="Sorry, the page you are looking for does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}
