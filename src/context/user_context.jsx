import React, { useContext, useEffect, useReducer, useState } from "react";
import userReducer from '../reducers/user_reducer'

const UserContext = React.createContext();

const initialState = {
  
};

export const UserProvider = ({ children }) => {
  const [timeActive, setTimeActive] = useState(false);
  const [state, dispatch] = useReducer(userReducer, initialState);
  


  return (
    <UserContext.Provider value={{ 
      timeActive, 
      setTimeActive, 
      ...state, 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
