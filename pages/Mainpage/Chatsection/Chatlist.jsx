import '../../../src/Css/Mainpage/Chatsection/Chatlist.css'
import { FaCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from 'react';
import Recentchatcontainer from "../../Component/Recentchatcontainer"
function Chatlist(){
    const [Dropdown, setDropdown ] = useState(true);

    function toggleDropdown(){
        setDropdown(!Dropdown);
    }
    return(
       <>
        
        <div className="Chatlist-container">
           <div className="Chatlist-header">
              <h1>Chat</h1>
           </div>
           <hr/>

           <div className="Chatlist-profile-section">
                <div className="profile-placeholder">
                    <img src="https://c4.wallpaperflare.com/wallpaper/399/722/332/one-punch-man-saitama-hd-wallpaper-preview.jpg" alt="profile.jpg" className='profile-image' />
                </div>
                <h3>Saitama</h3> 
                <div className="Chatlist-name-section">
                    
                     <div className="dropdown-select">
                        <div className="dropdown-choose" onClick={toggleDropdown}>
                            <p>Select</p> 
                            <IoMdArrowDropdown/>
                        </div>
                        
                        <div className={`dropdown-items-container ${ Dropdown ? 'visible' : 'hidden'}`}>
                                <div className="dropdown-items">
                                    <FaCircle size="8px" color="blue" />
                                    <p className="online-text">Online</p>
                                </div>
                                <div className="dropdown-items">
                                    <FaCircle size="8px" color="orange" />
                                    <p className="online-text">Busy</p>
                                </div>
                                <div className="dropdown-items">
                                    <FaCircle size="8px" color="red" />
                                    <p className="online-text">Offline</p>
                                </div>
                            </div>
  
                     </div>
                </div> 
            </div>

          <div className="Chatlist-search-section">
            <input type="text" placeholder='Search'/>
          </div>

          <div className="Chatlist-recent-section">
            <p>Last Chats</p>
            <div className="Chatlist-lastchat-container">
               <Recentchatcontainer/>
               <Recentchatcontainer/>
               <Recentchatcontainer/>
               <Recentchatcontainer/>
            </div>
          </div>
         
        </div>
       </>
    );
}
export default Chatlist;