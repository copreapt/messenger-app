import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useChatContext } from '../context/chat_context';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "../firebase"
import InfiniteScroll from "react-infinite-scroll-component";

 const Messages = () => {

    const {chatId} = useChatContext()
    const [messages, setMessages] = useState([])
    const [infiniteScroll, setInfiniteScroll] = useState({
      items: messages,
      hasMore: true,
    })

      useEffect( () => {
      
        const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
          unSub();
        };   
    },[chatId])

  return (
    <>
        {messages?.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
    </>
  );
}


export default Messages;