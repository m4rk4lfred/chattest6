import Sidebar from "./Sidebar";
import UploadArea from "./Uploadsection/UploadArea";
import '../../src/Css/Mainpage/Uploadsection/Uploadsection.css'
import { useEffect, useState } from "react";
function Uploadsection(){

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
  
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

    return(
        <>
         <div className="Main-content">
           <Sidebar />
           <div className="Uploadsection-maincontent">
             <UploadArea username={username} userId={userId} />
           </div>
           </div>
        </>
    );
}
export default Uploadsection;