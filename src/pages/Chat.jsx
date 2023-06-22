import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { TiGroup } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useChatContext } from "../context/chat_context";
import UserMenu from "../components/UserMenu";
import ChatMenu from "../components/ChatMenu";
import UserComponent from "../components/UserComponent";
import FriendsComponent from "../components/FriendsComponent";
import Messages from "../components/Messages";
import Input from "../components/Input";
import DefaultRightColumn from "../components/DefaultRightColumn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Chat = () => {
  const [sidebar, setSidebar] = useState(false);
  const [profileSidebar, setProfileSidebar] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showChats, setShowChats] = useState(true)
  const { userChat } = useChatContext();
  const [currentUser] = useAuthState(auth)

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleProfileSidebar = () => {
    setProfileSidebar(!profileSidebar);
  };

  const toggleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  const toggleShowChats = () => {
    setShowChats(false);
  }

  const toggleShowFriends = () => {
    setShowAllUsers(false);
  }

  return (
    <main>
      <div className="w-full h-screen bg-gray-600 bg-cover bg-center flex justify-center">
        <div className="grid grid-cols-12 w-full m-20 text-white">
          {/* left column */}
          <div className="col-span-3 rounded-md bg-[#18181b] shadow-md shadow-black flex flex-col overflow-auto">
            <div className="bg-[#202c33] p-3 flex justify-between">
              <img
                src={currentUser.photoURL}
                alt="image"
                className="rounded-full w-12"
              />
              <ol className="list-none relative flex items-center">
                <li className="m-2">
                  <TiGroup
                    className="text-2xl hover:cursor-pointer"
                    onClick={toggleShowAllUsers}
                  />
                </li>
                <li className=" m-3">
                  <BsThreeDotsVertical
                    className="text-2xl hover:cursor-pointer"
                    onClick={toggleProfileSidebar}
                  />
                  <UserMenu profileSidebar={profileSidebar} />
                </li>
              </ol>
            </div>
            <form action="#" className="text-center my-4 w-full flex-none">
              <input
                type="text"
                className="w-5/6 h-7 p-2 rounded-md bg-[#202c33] text-white text-center"
                placeholder="Search messages or users"
              />
            </form>
            {/* chats */}
            <div className="overflow-y-auto flex grow flex-col">
              {showAllUsers ? (
                <UserComponent
                  toggleShowFriends={toggleShowFriends}
                  showAllUsers={showAllUsers}
                />
              ) : (
                <FriendsComponent
                  toggleShowChats={toggleShowChats}
                  showChats={showChats}
                />
              )}
            </div>
          </div>
          {/* right column */}
          {showChats ? (
            <DefaultRightColumn />
          ) : (
            <div className="col-span-9 rounded-md bg-gray-600/70 border border-gray-800 shadow-md shadow-black flex flex-col overflow-auto">
              {/* top div */}
              <div className="bg-[#202c33] p-3 justify-between flex">
                <div className="justify-between flex">
                  <img
                    src={userChat.photoURL}
                    alt="image"
                    className="rounded-full w-12"
                  />
                  <p className=" p-2 ml-2">{userChat?.displayName}</p>
                </div>
                <div className="relative">
                  <ol className="list-none">
                    <li className="m-3">
                      <BsThreeDotsVertical
                        className="text-2xl hover:cursor-pointer"
                        onClick={toggleSidebar}
                      />
                    </li>
                  </ol>
                  <ChatMenu sidebar={sidebar} />
                </div>
              </div>

              {/* center section */}
              <div className="bg-gray-800/60 grow overflow-y-auto">
                <Messages />
              </div>
              {/* bottom div */}
              <Input />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;
