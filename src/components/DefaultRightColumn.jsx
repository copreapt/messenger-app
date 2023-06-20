import React from 'react'
import defaultImg from '../assets/default.svg'

const DefaultRightColumn = () => {
  return (
    <div className="col-span-9 rounded-md bg-[#202c33] border border-gray-800 shadow-md shadow-black flex flex-col overflow-hidden">
      <div className="text-center py-5 text-xl">
        <h1>Messenger App</h1>
        <p>Add a friend or click on a conversation to start chatting!</p>
      </div>
      <div>
        <img src={defaultImg} alt="chat image" className="max-h-none" />
      </div>
    </div>
  );
}

export default DefaultRightColumn