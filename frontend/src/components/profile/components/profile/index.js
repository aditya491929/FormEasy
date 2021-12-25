import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

function ProfileInfo() {
    return (
        <>
            <Card className="text-center">
                <Card.Header>Card Header title Goes Here</Card.Header>
                <Card.Body>
                    <Card.Title>Card Title Goes Here</Card.Title>
                    <Card.Text>
                        Some Card body content goes here
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Card footer title Goes Here</Card.Footer>
            </Card>
        </>

    )
}

export default ProfileInfo
