import ActionTypes from '../actionTypes';

const initial_state = '';

const refreshTokenReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.SET_REFRESH_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
export default refreshTokenReducer;
