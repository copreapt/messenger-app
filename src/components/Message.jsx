import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Message({ message }){
  const [currentUser] = useAuthState(auth);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[])
  
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div dir={`${message.senderId === currentUser.uid && "rtl"}`} lang="en">
      <div
        className={`${
          message.senderId === currentUser.uid
            ? "rounded-t-md rounded-b-md m-2 w-max bg-teal-900"
            : "rounded-t-md rounded-b-md m-2 w-max bg-[#202c33]"
        }`}
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
};