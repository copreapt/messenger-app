import React, { useEffect, useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from "../firebase";
import { useChatContext } from '../context/chat_context';

 const Message = ({message}) => {
  const [currentUser] = useAuthState(auth)
  const {userChat} = useChatContext()

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[message])
  
  return (
    <div
      className="rounded-t-md rounded-b-md  m-3 bg-[#202c33] w-max"
      ref={ref}
    >
      <span className="p-5">{message.text}</span>
    </div>
  );
}

export default Message;
