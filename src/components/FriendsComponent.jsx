import React, { useState, useEffect } from 'react'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  onSnapshot
} from "firebase/firestore";
import { useChatContext } from '../context/chat_context';

const FriendsComponent = ({toggleShowChats, myUser}) => {

  const [chats,setChats] = useState([]);
  const [user] = useAuthState(auth);
  const {handleSelect} = useChatContext()
 
useEffect(() => {
  if(chats){
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      setChats(doc.data());
    });
    return () => {
      unsub();
    };
  }

},[user.uid, handleSelect, myUser]);


  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="normal-class"
              key={chat[0]}
              onClick={() => {
                toggleShowChats();
                handleSelect(chat[1].userInfo);
              }}
            >
              {/* img div */}
              <div className="flex-span-4 w-40 items-center">
                <img
                  src={chat[1].userInfo.photoURL}
                  alt={chat[1].userInfo.displayName}
                  className="rounded-full w-12 ml-7 my-3"
                />
              </div>
              {/* text div */}
              <div className="flex-span-8 w-full">
                <div className="flex justify-between">
                  <h1 className="text-md font-semibold py-2">
                    {chat[1].userInfo.displayName}
                  </h1>
                  {/* <span className="text-xs py-3 mr-2">{chat[1].date}</span> */}
                </div>
                <p className="text-xs mb-2 normal-case">
                  {chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}


export default FriendsComponent;