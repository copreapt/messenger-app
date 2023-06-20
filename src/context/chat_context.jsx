import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/chat_reducer";
import {
  CHANGE_USER
} from "../actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../firebase";

const initialState = {
    chatId:'null',
    userChat:{}
};

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [currentUser] = useAuthState(auth)


  const handleSelect = (user) => {
    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    dispatch({type: CHANGE_USER, payload: {
      user,
      combinedId
    }})
  }

  
  return (
    <ChatContext.Provider
      value={{...state,handleSelect
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
// make sure use
export const useChatContext = () => {
  return useContext(ChatContext);
};
