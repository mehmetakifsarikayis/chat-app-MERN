import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../redux/actions';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const name = useSelector((state) => state.nameReducer);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispacth(Actions.setName(''));
    dispacth(Actions.setAccessToken(''));
    dispacth(Actions.setRefreshToken(''));
    dispacth(Actions.setChatUser(''));
    localStorage.removeItem('name');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };
  return (
    <div className='d-flex justify-content-between align-items-center m-3 '>
      <div className='d-flex justify-content-center align-items-center'>
        <img src='/images/person.jpg' alt='' className='photo me-3' />
        <h4 className='name-field'>{name}</h4>
      </div>
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
};

export default Navbar;
