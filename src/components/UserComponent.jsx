import React, { useEffect } from 'react'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const UserComponent = ({
  filteredUser,
  setUserBackToEmpty,
  myUser
}) => {
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    if (myUser) {
      const combinedId =
        currentUser.uid > myUser[0].uid
          ? currentUser.uid + myUser[0].uid
          : myUser[0].uid + currentUser.uid;
      const chatsRef = collection(db,'chats');
      const chat = setDoc(doc(chatsRef, combinedId), {})

      const messagesRef = collection(db, `chats/${combinedId}/messages`);
      if (messagesRef._fieldsProto === undefined) {
        setDoc(doc(messagesRef), {
        });   
        updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: myUser[0].uid,
            displayName: myUser[0].name,
            photoURL: myUser[0].img_url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        updateDoc(doc(db, "userChats", myUser[0].uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
  }, [myUser, filteredUser]);


  return (
    <>
      { filteredUser && 
        <>
          <div
            className="normal-class"
            key={filteredUser.uid}
            
          >
            {/* img div */}
            <div className="flex-span-4 w-40 items-center">
              <img
                src={filteredUser[0].img_url}
                alt={filteredUser[0].name}
                className="rounded-full w-12 ml-7 my-3"
              />
            </div>
            {/* text div */}
            <div className="flex-span-8 w-full text-right">
              <h1 className="text-md font-semibold py-2 text-left">
                {filteredUser[0].name}
              </h1>
              <button
                onClick={() => {
                  setUserBackToEmpty();
                }}
                className="capitalize mb-2 border bg-gray-400 text-black border-gray-600 p-1 hover:bg-black hover:text-white hover:border-white ease-in-out hover:ease-in-out rounded-md mr-2"
              >
                Add to friend list
              </button>
            </div>
          </div>
        </>
}
    </>
  );
};


export default UserComponent;