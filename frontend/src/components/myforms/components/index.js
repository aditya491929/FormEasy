import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";
import { Table, Space, Switch, Button, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const MyFormsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("auth-token");
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}forms/myforms`,
          {
            params: {
              userId: user.id,
            },
            headers: { "x-auth-token": token },
          }
        );
        if (response.data.success) {
          if (response.data.data) {
            setData(response.data.data);
            console.log(response.data.data);
          }
        } else {
          console.log("Something went wwrong");
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const columns = [
    {
      title: "FormId",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/form/${id}`}>{id}</Link>,
    },
    {
      title: "FormName",
      dataIndex: "formname",
      key: "formname",
    },
    {
      title: "Created On",
      dataIndex: "date",
      key: "date",
      render: (date) => date.slice(0, 10),
    },
    {
      title: "Responses",
      dataIndex: "responseCount",
      key: "responseCount",
      render: (responseCount) => (
        <Tooltip placement="top" title={"Download CSV"}>
          <Button type="primary" ghost>
            {responseCount} Responses
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Accept Response",
      dataIndex: "isAccepting",
      key: "isAccepting",
      render: (isAccepting) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={isAccepting}
        />
      ),
    },
    {
      title: "Actions",
      key: "delete",
      render: () => (
        <Space size="middle">
          <Button danger>Delete Form</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="h-100">
        <SuiBox pt={3} px={3}>
          <SuiTypography variant="h6" fontWeight="medium">
            My Forms
          </SuiTypography>
        </SuiBox>
        <SuiBox p={2}>
          <SuiTypography variant="h6" fontWeight="medium">
            <Table columns={columns} dataSource={data} loading={isLoading} />
          </SuiTypography>
        </SuiBox>
      </Card>
    </>
  );
};

export default MyFormsTable;
