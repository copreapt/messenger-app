import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useChatContext } from '../context/chat_context';
import { onSnapshot, doc, where, startAt } from 'firebase/firestore';
import { db, auth } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  orderBy,
  limit,
  query,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";   

 const Messages = () => {
   const { chatId } = useChatContext();
   const [messages, setMessages] = useState([]);
   const [currentUser] = useAuthState(auth);
   const [scrollTop, setScrollTop] = useState();
   const [messVariable, setMessVariable] = useState(-15);
   const [chatsMessages, setChatsMessages] = useState([])

   const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop)
   }  



   useEffect(() => {
     const unSub = onSnapshot(
       doc(db, "chats", chatId),
       (doc) => {
         doc.exists() &&
         setMessages(doc.data().messages.slice(messVariable));
       }
       
     );
     return () => {
       unSub();
     };
   }, [chatId, messVariable]);

   useEffect(() => {
    if (scrollTop === 0 && Math.abs(messVariable) <= messages.length) {
      setMessVariable(messVariable + -15);
      console.log(messages.length);
      console.log(Math.abs(messVariable));
      
    }
   }, [scrollTop === 0]);

   useEffect(() => {
    console.log(messages)
   },[])



   return (
     <>
       <div className="bg-gray-800/60 grow overflow-y-auto" onScroll={handleScroll}>
         {messages?.map((message) => {
           return <Message message={message} key={message.id} />;
         })}
       </div>
     </>
   );
 }


export default Messages;