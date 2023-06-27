import React, { useEffect, useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from "../firebase";
import { useChatContext } from '../context/chat_context';


 const Message = ({message}) => {

  const [currentUser] = useAuthState(auth)
  const {userChat} = useChatContext()

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "auto"})
  },[message])
  
  return (
    <div dir={`${message.senderId === currentUser.uid && "rtl"}`} lang="en">
      <div
        className={`${message.senderId === currentUser.uid ? "rounded-t-md rounded-b-md m-2 w-max bg-teal-900" : "rounded-t-md rounded-b-md m-2 w-max bg-[#202c33]"}`}
        ref={ref}
      >
        <bdi>
          <span className={`p-5 ${message.senderId === currentUser.uid}`}>
            {message.text}
          </span>
        </bdi>
      </div>
    </div>
  );
}

export default Message;
