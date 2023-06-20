import React, { useContext, useEffect, useReducer, useState } from "react";
import { auth, db } from "../firebase";
import userReducer from '../reducers/user_reducer'
import { query, onSnapshot, limit} from "firebase/firestore";
import { useAuthState} from "react-firebase-hooks/auth";
import { 
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc
} from "firebase/firestore";
import { GET_ALL_USERS, ADD_FRIEND, REMOVE_FRIEND, SET_FRIEND_ID, HANDLE_SELECT} from "../actions";

const UserContext = React.createContext();

const initialState = {
  all_users: [],
  friends: [],
  friendId: null,
  my_user: null,
  chats:[],
};

export const UserProvider = ({ children }) => {
  const [timeActive, setTimeActive] = useState(false);
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [user] = useAuthState(auth);
  

  useEffect(() => {
  const q = query(collection(db, "users"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
        
      });
      getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          const newFriends = docSnap.data().friends
          dispatch({ type: ADD_FRIEND, payload: { newFriends } });
        }
      });
      dispatch({ type: GET_ALL_USERS, payload: users });
    });
    return () => unsubscribe;
  }, []);

  const addFriend = async (friendId) => {
      const friend = state.all_users.find((user) => user.id === friendId); 
      // GET DOC ID (= USER.UID)
      const usersRef = doc(db, "users", user.uid);
      updateDoc(usersRef, {
        friends: arrayUnion(friend),
      });
  }

  const addFriendId = (friendId) => {
    const friend = state.all_users.find(
      (user) => user.id === friendId
    );
    const FriendID = friend.id
    dispatch({type:SET_FRIEND_ID, payload: FriendID})
    }


  const handleSelect = (friendId) => {
    const friend = state.all_users.find((user) => user.id === friendId);
    const my_user = friend
    dispatch({type: HANDLE_SELECT, payload: my_user})
    }    

  return (
    <UserContext.Provider value={{ 
      timeActive, 
      setTimeActive, 
      ...state, 
      addFriend,
      addFriendId,
      handleSelect
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
