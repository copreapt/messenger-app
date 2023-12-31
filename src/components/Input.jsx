import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useChatContext } from "../context/chat_context";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { updateDoc, doc, Timestamp, serverTimestamp, collection, setDoc} from "firebase/firestore";
import {v4 as uuid} from 'uuid'



 const Input = () => {

    const [text, setText] = useState('')
    const [currentUser] = useAuthState(auth);
    const { chatId, userChat } = useChatContext();

    const handleSend =  (e) => {
      e.preventDefault();
      if (!text || text.trim().length === 0) {
      } else {
        if (chatId) {
          const messagesRef = collection(db, `chats/${chatId}/messages`);
          setDoc(doc(messagesRef), {
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
          });
        }

        updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        updateDoc(doc(db, "userChats", userChat.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
        setText("");
      }
      }

  return (
    <form action='submit'>
      <div className="bg-[#202c33] space-x-4 flex justify-between ">
        <MdOutlineInsertEmoticon className="text-white text-2xl ml-7 mt-5 hover:cursor-pointer" />
        <input
          type="text"
          className="w-5/6 my-4 p-1 rounded-md bg-gray-600 text-white text-left"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSend}>
          <AiOutlineSend className="text-white text-2xl mr-5" />
        </button>
      </div>
    </form>
  );
}


export default Input;