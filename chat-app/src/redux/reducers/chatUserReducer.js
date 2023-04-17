import ActionTypes from '../actionTypes';

const initial_state = '';

const chatUserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHAT_USER:
      return action.payload;
    default:
      return state;
  }
};
export default chatUserReducer;
