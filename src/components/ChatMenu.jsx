import React from 'react'

const ChatMenu = ({sidebar}) => {
  return (
    <aside className={`${sidebar ? "sidebar show" : "sidebar"}`}>
      <div className="m-5">
        <button >Menu</button>
      </div>
    </aside>
  );
}

export default ChatMenu