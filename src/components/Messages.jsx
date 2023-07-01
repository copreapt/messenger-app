import React from 'react'
import Message from './Message'



 const Messages = ({firstFetch}) => {
   return (
     <>
       
         {firstFetch?.map((message, index) => {
           return <Message message={message} key={index} />;
         })}
       
     </>
   );
 }


export default Messages;