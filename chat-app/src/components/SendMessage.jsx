import React from 'react';

const SendMessage = ({ message }) => {
  return (
    <div>
      <div className='d-flex flex-row justify-content-end mb-1 me-3'>
        <div
          className='p-3 ms-3 me-3'
          style={{
            borderRadius: '15px',
            backgroundColor: '#eeee',
          }}
        >
          <p className='small mb-0'>{message}</p>
        </div>
        <img src='/images/person.jpg' alt='avatar 1' className='photo' />
      </div>
      <p className='d-flex justify-content-end time-text me-3'>Just Now</p>
    </div>
  );
};

export default SendMessage;
