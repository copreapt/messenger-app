import React from "react";
import Message from "./Message";

export default function Messages({ firstFetch }){
  return (
    <>
      {firstFetch?.map((message, index) => {
        return <Message message={message} key={index} />;
      })}
    </>
  );
};