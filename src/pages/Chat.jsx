import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {BiArrowBack} from 'react-icons/bi'
import { useChatContext } from "../context/chat_context";
import UserMenu from "../components/UserMenu";
import ChatMenu from "../components/ChatMenu";
import UserComponent from "../components/UserComponent";
import FriendsComponent from "../components/FriendsComponent";
import Messages from "../components/Messages";
import Input from "../components/Input";
import DefaultRightColumn from "../components/DefaultRightColumn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {  onSnapshot, doc } from "firebase/firestore";
import UploadFiles from "../components/UploadFiles";
import {
  orderBy,
  limit,
  query,
  getDocs,
  collection,
  getDoc,
  startAfter,
} from "firebase/firestore";

const Chat = () => {
  const [sidebar, setSidebar] = useState(false);
  const [profileSidebar, setProfileSidebar] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showChats, setShowChats] = useState(true);
  const { userChat, chatId } = useChatContext();
  const [currentUser] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [filteredUser, setFilteredUser] = useState(null);
  const [showSideBar, setShowSidebar] = useState(false);
  const [firstFetch, setFirstFetch] = useState([])
  const [scrollTop, setScrollTop] = useState();
  

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
  };

  const toggleShowFriends = () => {
    setShowAllUsers(false);
  };

  const handleSubmit = (e) => {
      e.preventDefault(); 
      if (user) {
        const newUser = user.find((user) => user.name === username);
        setFilteredUser(newUser);
        setUsername("");
      }

    
  };

  const setUserBackToEmpty = () => {
    setFilteredUser(null);
  }

  const openSidebar = () => {
    setShowSidebar(true)
  }

  const closeSidebar = () => {
    setShowSidebar(false);
  }
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
        setUser(users)
      });
    });
    return () => unsubscribe;
  }, [user,handleSubmit]);



  const messagesRef = collection(db, `chats/${chatId}/messages`);  

  const getDocuments = async () => {
    
    const querySnapshot = await getDocs(query(messagesRef, orderBy("date", "desc"), limit(20)));
    let tempMessages = [];
    querySnapshot.forEach((doc) => {
      tempMessages.push({ ...doc.data(), id: doc.id });
    });

    setFirstFetch(tempMessages.reverse());
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log(lastVisible);
    console.log(firstFetch)

    //  2ND BATCH QUERY

    if (scrollTop === 0 ) {

      const next = query(
        messagesRef,
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(15),
      );

      const nextQuerySnapshot = await getDocs(next);
      let nextTempMessages = []
      nextQuerySnapshot.forEach((doc) => {
        nextTempMessages.push({...doc.data(), id: doc.id})
        console.log(nextTempMessages.reverse());
      })
      

    }
  };

  useEffect(() => {
    
getDocuments();
        
  },[chatId])

  // useEffect(() => {
  // console.log(scrollTop)    
  // },[scrollTop])


  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };  

  return (
    <main>
      <div className="w-full h-screen bg-gray-600 bg-cover bg-center flex justify-center">
        <div className="grid grid-cols-12 w-full m-20 text-white">
          {/* left column */}
          {/* sidebar */}

          {/* begin of left column */}
          <div className="col-span-3 rounded-md bg-[#18181b] shadow-md shadow-black flex flex-col overflow-auto relative">
            <aside
              className={`${showSideBar ? "sidebar show-sidebar" : "sidebar"}`}
            >
              {/* sidebar top div */}
              <div className="bg-[#202c33] h-[20%] flex items-end">
                <BiArrowBack
                  className="text-3xl text white m-5 cursor-pointer"
                  onClick={closeSidebar}
                />
                <h1 className="m-4 text-2xl">Profile</h1>
              </div>
              {/* sidebar bottom div */}
              <div className="flex justify-center">
                <img
                  src={currentUser.photoURL}
                  alt="profile picture"
                  className="rounded-full w-[50%] mt-[20%] mb-10"
                />
              </div>
              <UploadFiles />
              <div className="space-y-3">
                <h1 className="text-md ml-5 text-green-200">Your name</h1>
                <p className="text-md ml-5">{currentUser.displayName}</p>
              </div>
            </aside>
            <div className="bg-[#202c33] p-3 flex justify-between">
              <img
                src={currentUser.photoURL}
                alt="image"
                className="rounded-full w-12 cursor-pointer"
                onClick={openSidebar}
              />
              <ol className="list-none relative flex items-center">
                <li className="m-2">
                  <h3
                    className="text-xl hover:cursor-pointer"
                    onClick={toggleShowAllUsers}
                  >
                    Add Friends
                  </h3>
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
            <form
              action="submit"
              className="text-center my-4 w-full flex-none"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className={`${
                  showAllUsers
                    ? "w-5/6 h-7 p-2 rounded-md bg-[#202c33] text-white text-center border border-white"
                    : "w-5/6 h-7 p-2 rounded-md bg-[#202c33] text-white text-center"
                }`}
                placeholder={`${
                  showAllUsers ? "Search Friends" : "Search Conversations"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </form>
            {/* chats */}
            <div className="overflow-y-auto flex grow flex-col">
              {showAllUsers ? (
                <UserComponent
                  toggleShowFriends={toggleShowFriends}
                  showAllUsers={showAllUsers}
                  filteredUser={filteredUser}
                  setUserBackToEmpty={setUserBackToEmpty}
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
              <div
                className="bg-gray-800/60 grow overflow-y-auto"
                onScroll={handleScroll}
              >
                <Messages firstFetch={firstFetch} />
              </div>
              {/* bottom div */}
              <Input
                firstFetch={firstFetch}
                setFirstFetch={setFirstFetch}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;
