import { useState, useEffect } from 'react';
import { FaCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Recentchatcontainer from "../../Component/Recentchatcontainer";
import { io } from 'socket.io-client';
import '../../../src/Css/Mainpage/Chatsection/Chatlist.css';
import Chatbox from './Chatbox';

const DEFAULT_ROOM = "Dev Circle";

function Chatlist({ username, setUsername, room, setRoom, userId, setUserId,openChat, setOpenChat}) {
  const [Dropdown, setDropdown] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState('');
  //const [room, setRoom] = useState(DEFAULT_ROOM);
  const [newRoom, setNewRoom] = useState('');
  const [roomList, setRoomList] = useState([DEFAULT_ROOM]);
  room = localStorage.getItem('currentroom') || 'Dev Circle';
  const [isVisible, setIsVisible] = useState(true);

  
useEffect(() => {
  async function fetchUsername() {
    try {
      // First try to get from localStorage
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
        setNewUsername(storedUsername);
        return;
      }

      const res = await fetch('http://localhost/CCIS_CONNECT-MASTER/src/php/get_username.php', { credentials: 'include' });
      const data = await res.json();
      if (data.username) {
        setUsername(data.username);
        setNewUsername(data.username);
        setUserId(data.userId);
        localStorage.setItem('username', data.username);
      } else {
        setUsername('Unknown');
        setNewUsername('Unknown');
      }
    } catch (e) {
      setUsername('Unknown');
      setNewUsername('Unknown');
    }
  }
  fetchUsername();
}, []);

  // Keep newUsername in sync if username changes externally
  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  // Socket setup
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // Listen for username change result
  useEffect(() => {
    if (!socket) return;
    const handler = (result) => {
      if (result.success) {
        setUsername(result.newUsername);
        localStorage.setItem('username', result.newUsername);
        setEditing(false);
        setError('');
      } else {
        setError( result.error || 'Failed to change username.');
      }
    };
    socket.on('username_changed', handler);
    return () => socket.off('username_changed', handler);
  }, [socket, setUsername]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('get_rooms');
    socket.on('room_list', (rooms) => {
      setRoomList(rooms.includes(DEFAULT_ROOM) ? rooms : [DEFAULT_ROOM, ...rooms]);
    });
    return () => {
      socket.off('room_list');
    };
  }, [socket]);

  const handleCreateRoom = () => {
    if (newRoom.trim() !== '' && socket) {
      setRoom(newRoom.trim());
      socket.emit('join_room', newRoom.trim());
      setNewRoom('');
    }
  };

  // Handlers
  const handleUsernameChange = (e) => setNewUsername(e.target.value);

  const submitUsernameChange = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    if (socket && newUsername !== username) {
      socket.emit('change_username', { userId, newUsername: newUsername.trim() });
    }
  };

  function toggleDropdown() {
    setDropdown(!Dropdown);
  }

  return (
    
  (isVisible && 
    (
    <div className="Chatlist-container">
      <div className="Chatlist-header">
        <h1>Chat</h1>
      </div>
      <hr className="Chatlist-divider" />

      <div className="Chatlist-profile-section">
        <div className="profile-placeholder">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/399/722/332/one-punch-man-saitama-hd-wallpaper-preview.jpg"
            alt="profile.jpg"
            className='profile-image'
          />
        </div>
        <div className="profile-info">
          <form className="profile-username-row" onSubmit={submitUsernameChange} autoComplete="off">
            {editing ? (
              <>
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  className="username-input"
                  maxLength={32}
                  autoFocus
                  style={{ width: "8em" }}
                />
                <button
                  className="username-btn save"
                  type="submit"
                  title="Save"
                >✔</button>
                <button
                  className="username-btn cancel"
                  type="button"
                  onClick={() => { setEditing(false); setNewUsername(username); setError(''); }}
                  title="Cancel"
                >✖</button>
              </>
            ) : (
              <>
                <div className="username-container">
                   <h3 className="username-display">{username || 'No Username'}</h3>
                    <button
                      className="username-btn edit"
                      type="button"
                      onClick={() => { setEditing(true); setError(''); }}
                      title="Edit Username"
                     >✎</button>

                </div>
               
              </>
            )}
          </form>
          <div className="profilestatus-container">
              <span className="profile-status"> 
                 <FaCircle color="#00d26a" size={10} /> Online
              </span>
          </div>

          {error && <span className="username-error">{error}</span>}
        </div>
      </div>

      <div className="Chatlist-dropdown-section" onClick={toggleDropdown}>
        <div className="recent-dropdown">
           <span>Recent Chats</span>
          <IoMdArrowDropdown size={22} style={{ transform: Dropdown ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }} />
        </div>
        
      </div>
      {Dropdown && (
        <div className="Chatlist-recent-section">
          <div style={{ padding: '0 1em', marginBottom: '1em' }}>
            <input
              type="text"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="New room name"
              style={{ width: '100%', borderRadius: '8px', padding: '0.3em' }}
            />
            <div className="createroom-container">
              <button 
              className='create-room-btn'onClick={handleCreateRoom}>Create/Join Room
              </button>
            </div>
           
          </div>
          <div className="chat-list-container">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {roomList.map((r) => (
                <li 
                  className={`chat-list-item${r === room ? ' selected' : ''}`}
                  key={r}
                  onClick={() => {
                    setRoom(r);
                    localStorage.setItem('currentroom', r);
                    if (socket) socket.emit('join_room', r);
                    setOpenChat(true);
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )));
}

export default Chatlist;