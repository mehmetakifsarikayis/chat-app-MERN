import React from 'react';
import Messages from './Messages';
import { useSelector } from 'react-redux';
const Chat = () => {
  let chatUser = useSelector((state) => state.chatUserReducer);
  return (
    <>
      {!chatUser ? (
        <div className='show-at-the-middle'>
          <h1>Select someone to send message</h1>
        </div>
      ) : (
        <div>
          <div className='d-flex justify-content-end align-items-center m-3 border-top-1'>
            <h4>{chatUser.name}</h4>
            <img src='/images/person.jpg' alt='' className='photo m-3' />
          </div>
          <Messages />
        </div>
      )}
    </>
  );
};

export default Chat;
