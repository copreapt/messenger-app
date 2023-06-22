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
        className="rounded-t-md rounded-b-md  m-3 bg-[#202c33] w-max "
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
