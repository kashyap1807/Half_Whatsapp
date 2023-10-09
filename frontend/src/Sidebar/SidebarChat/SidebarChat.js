import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'
import db from "../../firebase/firebase"

const SidebarChat = ({id,name,addNewChat}) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter Name for chat: ");

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>last message</p>
      </div>
    </div>
  ) : (
      <div onClick={createChat} className="sidebarChat">
        <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat
