import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";
import { Table, Space, Switch, Button, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import csvDownload from 'json-to-csv-export'

const MyFormsTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { addToast } = useToasts();

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
  }, [isUpdating]);

  const onChangeHandler = async (id, status) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('auth-token');
      const data = {
        isAccepting: !status,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}forms/put/${id}`,
        data,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.data.success) {
        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      } else {
        addToast(response.data.message, {
          appearance: "warning",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }
    } catch (err) {
      addToast(err, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
    setIsUpdating(false);
  };

  const onClickHandler = async (id) => {
    setIsDownloading(true);
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}responses/get/${id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (response.data.success) {
        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        console.log(response.data.responses)
        csvDownload(JSON.parse(JSON.stringify(response.data.responses)),  `${id}.csv`);
      } else {
        addToast(response.data.message, {
          appearance: "warning",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }
    } catch (err) {
      addToast(err, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    }
    setIsDownloading(false);
  };

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
      render: (responseCount, record) => (
        <Tooltip placement="top" title={"Download CSV"}>
          <Button type="primary" ghost disabled={isDownloading} onClick={() => onClickHandler(record.key)}>
            {responseCount} Responses
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Accept Response",
      dataIndex: "isAccepting",
      key: "isAccepting",
      render: (isAccepting, record) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={isAccepting}
          onChange={() => onChangeHandler(record.key, isAccepting)}
          disabled={isUpdating}
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
