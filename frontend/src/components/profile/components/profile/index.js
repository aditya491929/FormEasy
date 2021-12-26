import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import SuiBox from "../../../SuiBox";
import SuiTypography from "../../../SuiTypography";
import { Avatar } from "evergreen-ui";
import { Form, Row, Col } from "react-bootstrap";
import axios from 'axios';

function ProfileInfo() {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        async function fetchData(){
            const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}users/currentUser`,{
                headers: {
                    'x-auth-token': token
                }
            });
            if(result.data.isLoggedIn) {
                setUserData(result.data.user)
            }
        }
        fetchData();
    }, [])
  return (
    <>
      <Card className="h-100">
        <SuiBox pt={3} px={3}>
          <SuiTypography variant="h6" fontWeight="bold">
            Profile
          </SuiTypography>
        </SuiBox>
        <SuiBox p={2}>
          <SuiTypography
            variant="h6"
            fontWeight="medium"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              name={`${userData.fname} ${userData.lname}`}
              size={80}
              style={{ marginBottom: "10px" }}
              color="green"
            />
            <Form>
              <Form.Group
                className="mb-3"
                controlId="registerFormBasicUniqueId"
              >
                <Form.Label>UniqueId</Form.Label>
                <Form.Control type="text" value={userData._id} disabled={true} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" value={userData.fname} disabled={true} />
                  </Col>
                  <Col>
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" value={userData.lname} disabled={true} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="registerFormBasicUsername"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={userData.username} disabled={true} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerFormBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={userData.email}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="registerFormBasicPassword"
              >
                <Form.Label>Created On</Form.Label>
                <Form.Control type="text" value={userData.date} disabled={true} />
              </Form.Group>
            </Form>
          </SuiTypography>
        </SuiBox>
      </Card>
    </>
  );
}

export default ProfileInfo;
