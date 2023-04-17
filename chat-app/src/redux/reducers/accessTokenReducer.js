import ActionTypes from '../actionTypes';

const initial_state = '';

const accessTokenReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.SET_ACCESS_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
export default accessTokenReducer;
