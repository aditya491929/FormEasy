import React from "react";
import { useNavigate } from "react-router-dom";
import { Result } from "antd";
import { Button } from "react-bootstrap";
import MainHeader from "../navbar/MainHeader";

const Error = () => {
  const history = useNavigate();

  return (
    <>
      <MainHeader />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, either you are not authorized to access this page or page doesn't exist."
        extra={
          <Button variant="dark" onClick={() => history(-1)}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default Error;
