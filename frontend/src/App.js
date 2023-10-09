import React from "react";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chatbox/Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";


function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/messages/sync")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },[]);

  useEffect(() => {
    //once
    const pusher = new Pusher("91c4cd7e1629db5ef996", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }; 
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
          
            
          <Sidebar />
          <Chat messages={messages} />

      </div>
    </div>
  );
}

export default App;
