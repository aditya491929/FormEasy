import React from "react";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { Button } from "react-bootstrap";

const MyForms = () => {
    const history = useNavigate();
  return (
    <>
      <h1>MyForms</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span>No Forms Found!</span>}
      >
        <Button variant="dark" onClick={() => history('/createForm')}>Create Form</Button>
      </Empty>
    </>
  );
};

export default MyForms;
