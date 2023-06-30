import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useChatContext } from '../context/chat_context';
import { onSnapshot, doc, where, startAt, QuerySnapshot } from 'firebase/firestore';
import { db, auth } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';


 const Messages = ({firstFetch}) => {
   const { chatId } = useChatContext();
   const [currentUser] = useAuthState(auth);
   const [scrollTop, setScrollTop] = useState();
   const [messVariable, setMessVariable] = useState(-15);
   const [chatsMessages, setChatsMessages] = useState([])

   return (
     <>
       
         {firstFetch?.map((message) => {
           return <Message message={message} key={message.id} />;
         })}
       
     </>
   );
 }


export default Messages;