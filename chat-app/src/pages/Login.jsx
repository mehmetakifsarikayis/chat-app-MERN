import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import Loading from '../components/Loading';

const Login = () => {
  const [waiting, setWaiting] = useState(true);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispacth = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const name = localStorage.getItem('name');

    if (name && accessToken && refreshToken) {
      navigate('/');
    } else {
      setWaiting(false);
    }
  }, [navigate, dispacth]);

  const logIn = async () => {
    const res = await axios.post('/api/login', {
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
    const user = res.data;
    dispacth(Actions.setName(user.name));
    dispacth(Actions.setAccessToken(user.accessToken));
    dispacth(Actions.setRefreshToken(user.refreshToken));
    localStorage.setItem('name', user.name);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);
    navigate('/');
  };

  return (
    <>
      {waiting ? (
        <Loading />
      ) : (
        <Container fluid className='bg-info bg-gradient'>
          <Row className='vh-100 d-flex justify-content-center align-items-center'>
            <Col md={8} lg={6} xs={12}>
              <Card className='shadow'>
                <Card.Body>
                  <div className='mb-3 mt-md-4'>
                    <h2 className='fw-bold mb-2 text-uppercase text-center '>
                      Chat-App
                    </h2>
                    <p className=' mb-5 text-center'>
                      Please enter your login and password!
                    </p>
                    <div className='mb-3'>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter email'
                          ref={emailRef}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Password'
                          ref={passwordRef}
                        />
                      </Form.Group>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <p className='small'>
                          <Link className='text-primary' to='/login'>
                            Forgot password?
                          </Link>
                        </p>
                      </Form.Group>
                      <div className='d-grid'>
                        <Button variant='primary' type='submit' onClick={logIn}>
                          Login
                        </Button>
                      </div>
                      <div className='mt-3'>
                        <p className='mb-0  text-center'>
                          Don't have an account?{' '}
                          <Link to='/register' className='text-primary fw-bold'>
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
