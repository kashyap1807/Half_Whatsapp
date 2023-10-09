import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import {useState,useEffect} from "react";
import axios from "../axios";

const Chat = ({ messages }) => {
  
  const [input, setInput] = useState(""); 

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:9000/messages/new",{
      message: input,
      name: "demo app",
      timestamp: "just now",
      received: true,

    });

    setInput("");

  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>Name</h3>
          <p>Last Seen...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
