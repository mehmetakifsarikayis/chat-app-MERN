import { combineReducers } from 'redux';
import accessTokenReducer from './accessTokenReducer';
import refreshTokenReducer from './refreshTokenReducer';
import nameReducer from './nameReducer';
import chatUserReducer from './chatUserReducer';
import axiosJWTreducer from './axiosJWTreducer';

const reducers = combineReducers({
  accessTokenReducer,
  refreshTokenReducer,
  nameReducer,
  chatUserReducer,
  axiosJWTreducer,
});

export default reducers;
