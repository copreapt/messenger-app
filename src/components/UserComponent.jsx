import React, { useEffect } from 'react'
import { useUserContext } from '../context/user_context';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const UserComponent = ({toggleShowFriends, showAllUsers}) => {

  const { addFriend, all_users, friendId, addFriendId , friends, my_user, handleSelect} = useUserContext();
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    if (my_user) {
      const combinedId =
        currentUser.uid > my_user.uid
          ? currentUser.uid + my_user.uid
          : my_user.uid + currentUser.uid;
      const resp = getDoc(doc(db, "chats", combinedId));
      if (resp._fieldsProto === undefined) {
        setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: my_user.uid,
            displayName: my_user.name,
            photoURL: my_user.img_url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        updateDoc(doc(db, "userChats", my_user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
  }, [handleSelect, my_user]);

  return ( <>
  
  {all_users?.map( (user, index) => {
    return (
     <div
        className={`${
          friendId === user.id ? "normal-class active" : "normal-class"
        }`}
        key={index}
        onClick={() => {addFriendId(user.id); toggleShowFriends()}}
      >
        {/* img div */}
        <div className="flex-span-4 w-40 items-center">
          <img
            src={user.img_url}
            alt={user.name}
            className="rounded-full w-12 ml-7 my-3"
          />
        </div>
        {/* text div */}
        <div className="flex-span-8 w-full text-right">
          <h1 className="text-md font-semibold py-2 text-left">{user.name}</h1>
          <button
            onClick={() => {addFriend(user.id); handleSelect(user.id)}}
            className="capitalize mb-2 border bg-gray-400 text-black border-gray-600 p-1 hover:bg-black hover:text-white hover:border-white ease-in-out hover:ease-in-out rounded-md mr-2"
          >
            Add to friend list
          </button>
        </div>
      </div>
    );
  })}

  </>
  );
}


export default UserComponent;