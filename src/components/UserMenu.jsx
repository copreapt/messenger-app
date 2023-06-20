import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

 const UserMenu = ({profileSidebar}) => {
  return (
    <div className="relative">
      <aside
        className={`${
          profileSidebar ? "sidebar-profile show" : "sidebar-profile"
        }`}
      >
        <div className="m-5">
          <Link to="/">
            <button onClick={() => signOut(auth)}>Sign out</button>
          </Link>
        </div>
      </aside>
    </div>
  );
}


export default UserMenu;
