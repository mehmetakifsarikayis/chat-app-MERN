import React, { useRef } from 'react';
import SendMessage from './SendMessage';
import ReceivedMessage from './ReceivedMessage';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Actions from '../redux/actions';
const Messages = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  let selectedUser = useSelector((state) => state.chatUserReducer);
  const accessToken = useSelector((state) => state.accessTokenReducer);
  const refreshToken = useSelector((state) => state.refreshTokenReducer);
  const messages = selectedUser.messages;
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const res = await axios.post('/api/refresh', { token: refreshToken });
        const newRefreshToken = res.data.refreshToken;
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        dispatch(Actions.setAccessToken(newAccessToken));
        dispatch(Actions.setRefreshToken(newRefreshToken));
        config.headers['Authorization'] = 'Bearer ' + newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const LoadingMessagesScreen = () => (
    <div className='show-at-the-middle'>
      <h1>Loading...</h1>
    </div>
  );
  const showMessages = () => {
    return messages.map((message, index) => {
      if (message.sender === selectedUser._id)
        return <ReceivedMessage key={index} message={message.text} />;
      else return <SendMessage key={index} message={message.text} />;
    });
  };

  const sendMessageFunction = async (e) => {
    const text = inputRef.current.value;
    inputRef.current.value = '';
    const res = await axiosJWT.post(
      '/api/message',
      {
        text,
        receiver: selectedUser._id,
      },
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    );
    inputRef.current.focus();
  };
  return (
    <>
      <div className='messages d-flex flex-column'>
        {messages === '' ? LoadingMessagesScreen() : showMessages()}
      </div>

      <div className='d-flex me-4'>
        <Form.Control
          type='text'
          placeholder='New Message'
          className='message-input'
          ref={inputRef}
        />
        <Button
          variant='success'
          type='submit'
          style={{ width: '15%' }}
          onClick={sendMessageFunction}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Messages;
