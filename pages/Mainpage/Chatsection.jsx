import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chatlist from "./Chatsection/Chatlist";
import Chatbox from "./Chatsection/Chatbox";
import "../../src/Css/Mainpage/Mainchat/Mainchat.css";

function Mainpage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("Dev Circle");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Retrieve the userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div className="Main-content">
      <Sidebar />
      <Chatlist 
      username={username} 
      setUsername={setUsername}
      room={room}
      setRoom={setRoom}
      userId={userId}
      setUserId={setUserId}/>
      <Chatbox username={username} room={room} userId={userId} />
    </div>
  );
}

export default Mainpage;