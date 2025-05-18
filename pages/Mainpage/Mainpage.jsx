import { useEffect, useState } from "react";
import Sidebar from "./Chatsection/Sidebar";
import Chatlist from "./Chatsection/Chatlist";
import Chatbox from "./Chatsection/Chatbox";
import "../../src/Css/Mainpage/Mainchat/Mainchat.css";

function Mainpage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="Main-content">
      <Sidebar />
      <Chatlist />
      <Chatbox username={username} />
    </div>
  );
}

export default Mainpage;