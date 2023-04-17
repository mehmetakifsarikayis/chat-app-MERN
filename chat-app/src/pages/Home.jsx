import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const name = localStorage.getItem('name');

    if (name && accessToken && refreshToken) {
      dispacth(Actions.setName(name));
      dispacth(Actions.setAccessToken(accessToken));
      dispacth(Actions.setRefreshToken(refreshToken));
      setLogin(true);
    } else navigate('/login');
  }, [navigate, dispacth]);

  return (
    <>
      {login ? (
        <Container fluid className='bg-info bg-gradient'>
          <Row className='vh-100 d-flex justify-content-center align-items-center'>
            <Col lg={10} xs={12}>
              <Card className='shadow home-container'>
                <Row>
                  <Col md={3} className='bg-green'>
                    <Sidebar />
                  </Col>
                  <Col md={9}>
                    <Chat />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
