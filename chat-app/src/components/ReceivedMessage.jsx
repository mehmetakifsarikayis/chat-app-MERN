import React from 'react';

const ReceivedMessage = ({ message }) => {
  return (
    <div>
      <div className='d-flex flex-row justify-content-start mb-1'>
        <img src='/images/person.jpg' alt='avatar 1' className='photo' />
        <div
          className='p-3 ms-3'
          style={{
            borderRadius: '15px',
            backgroundColor: ' rgba(57, 192, 237,.2)',
          }}
        >
          <p className='small mb-0'>{message}</p>
        </div>
      </div>
      <p className='time-text'>Just Now</p>
    </div>
  );
};

export default ReceivedMessage;
