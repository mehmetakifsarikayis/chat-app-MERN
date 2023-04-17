import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Actions from '../redux/actions';
import Loading from '../components/Loading';

const Register = () => {
  const [waiting, setWaiting] = useState(true);

  const navigate = useNavigate();
  const dispacth = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const photoRef = useRef();

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

  const showPhoto = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      photoRef.current.src = reader.result;
      reader.removeEventListener('load', this);
    });
    reader.readAsDataURL(file);
  };

  const signUp = async () => {
    const res = await axios.post('/api/register', {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
                      Please enter your Information!
                    </p>
                    <div className='mb-3'>
                      <Form.Group className='mb-3' controlId='formBasicName'>
                        <Form.Label className='text-center'>Name</Form.Label>
                        <Form.Control
                          ref={nameRef}
                          type='text'
                          placeholder='Enter name'
                        />
                      </Form.Group>
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
                      <Form.Group className='mb-3' controlId='formBasicPhoto'>
                        <Form.Label>Photo</Form.Label>
                        <br />
                        <Row className='d-flex justify-content-center align-items-center'>
                          <Col xs={2}>
                            <img
                              ref={photoRef}
                              src='/images/person.jpg'
                              alt='asfsa'
                              width={'50px'}
                              height={'50px'}
                            />
                          </Col>
                          <Col xs={10}>
                            {' '}
                            <Form.Control
                              type='file'
                              placeholder='Password'
                              onChange={showPhoto}
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      <div className='d-grid'>
                        <Button
                          variant='primary'
                          type='submit'
                          onClick={signUp}
                        >
                          Sign Up
                        </Button>
                      </div>
                      <div className='mt-3'>
                        <p className='mb-0  text-center'>
                          Do you have an account?
                          <Link to='/login' className='text-primary fw-bold'>
                            Log In
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

export default Register;
