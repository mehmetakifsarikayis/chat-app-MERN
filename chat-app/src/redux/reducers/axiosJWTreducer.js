import ActionTypes from '../actionTypes';

const initial_state = '';

const axiosJWTreducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.SET_AXIOSJWT:
      return action.payload;
    default:
      return state;
  }
};
export default axiosJWTreducer;
