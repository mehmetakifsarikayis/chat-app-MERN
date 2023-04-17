import ActionTypes from '../actionTypes';

const initial_state = '';

const nameReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return action.payload;
    default:
      return state;
  }
};
export default nameReducer;
