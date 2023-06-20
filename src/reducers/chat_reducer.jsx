import {
    CHANGE_USER,
} from '../actions'

const chat_reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        userChat:action.payload.user,
        chatId:action.payload.combinedId
      };
    default:
      return state;
  }
};

export default chat_reducer;