import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useChatContext } from '../context/chat_context';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "../firebase";

 const Messages = () => {

    const {chatId} = useChatContext()
    const [messages, setMessages] = useState([])

    useEffect(() => {
      
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
          unSub();
        };   
    },[chatId])

  return (
    <div className="rounded-t-md rounded-b-md  m-3 bg-[#202c33] w-max">
      {messages?.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
}


export default Messages;