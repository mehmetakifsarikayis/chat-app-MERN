import actionTypes from '../actionTypes';
const setAccessToken = (value) => ({
  type: actionTypes.SET_ACCESS_TOKEN,
  payload: value,
});
const setRefreshToken = (value) => ({
  type: actionTypes.SET_REFRESH_TOKEN,
  payload: value,
});
const setName = (value) => ({
  type: actionTypes.SET_NAME,
  payload: value,
});
const setChatUser = (value) => ({
  type: actionTypes.SET_CHAT_USER,
  payload: value,
});
const setAxiosJWT = (value) => ({
  type: actionTypes.SET_AXIOSJWT,
  payload: value,
});
const Actions = {
  setAccessToken,
  setRefreshToken,
  setName,
  setChatUser,
  setAxiosJWT,
};
export default Actions;
