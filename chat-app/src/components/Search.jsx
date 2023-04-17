import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Actions from '../redux/actions';
const Search = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessTokenReducer);
  const refreshToken = useSelector((state) => state.refreshTokenReducer);
  const [users, setUsers] = useState([]);
  const [showingUsers, setShowingUsers] = useState([]);

  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const getData = async () => {
      const res = await axiosJWT.get('/api/users', {
        headers: { Authorization: 'Bearer ' + accessToken },
      });
      setUsers(res.data);
      setShowingUsers(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  const setUser = async (selectedUser) => {
    const res = await axiosJWT.post(
      '/api/messages',
      {
        id: selectedUser._id,
      },
      {
        headers: { Authorization: 'Bearer ' + accessToken },
      }
    );
    let user = selectedUser;
    user.messages = res.data;
    dispatch(Actions.setChatUser(user));
  };
  const findUsers = (e) => {
    setShowingUsers(users.filter((user) => user.name.includes(e.target.value)));
  };
  return (
    <>
      <Form.Control type='text' placeholder='Search' onChange={findUsers} />
      {loading ? (
        <h4 className='text-center m-3'>Loading</h4>
      ) : (
        <div className='users'>
          {showingUsers.map((user) => (
            <Link
              onClick={() => setUser(user)}
              className=' mt-2 d-flex align-items-center link'
              key={user._id}
            >
              <img src='/images/person.jpg' alt='' className='photo mx-3' />
              <div className='d-flex justify-content-center align-items-center'>
                <h4 className='search-name-field'>{user.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
