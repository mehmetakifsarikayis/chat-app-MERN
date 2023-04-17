import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container fluid className='bg-info bg-gradient'>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={3} lg={3} xs={3}>
          <Card className='shadow m-5 p-3'>
            <span className='h1'>Loading...</span>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
