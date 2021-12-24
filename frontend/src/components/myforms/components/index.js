import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import SuiBox from "../../SuiBox";
import SuiTypography from "../../SuiTypography";
import { Table, Tag, Space, Switch, Button } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';

const MyFormsTable = () => {
    

    useEffect(() => {

    }, [])

    const data = [
        {
        formid: "1",
        formname: "John Brown",
        date: '21/12/21',
        responses: ["50"],
        },
    ];
  const columns = [
    {
      title: "FormId",
      dataIndex: "formid",
      key: "formid",
    },
    {
      title: "FormName",
      dataIndex: "formname",
      key: "formname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created On",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Responses",
      key: "responses",
      dataIndex: "responses",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Accept Response",
      key: "accept",
      render: () => (
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
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
    }
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
            <Table columns={columns} dataSource={data} />
          </SuiTypography>
        </SuiBox>
      </Card>
    </>
  );
};

export default MyFormsTable;
