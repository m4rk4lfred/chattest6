import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../../../src/Css/Mainpage/Chatsection/Chatbox.css';
import { IoMdSend } from "react-icons/io";

function Chatbox({ username, room, userId}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  username = localStorage.getItem('username');
  userId = localStorage.getItem('userId');
  room = localStorage.getItem('currentroom') || 'Dev Circle';
 

  // Connect socket on mount
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // // Fetch room list
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('room_list', (rooms) => {
  //     // Always include the default room
  //     setRoomList(rooms.includes(DEFAULT_ROOM) ? rooms : [DEFAULT_ROOM, ...rooms]);
  //   });
  //   return () => {
  //     socket.off('room_list');
  //   };
  // }, [socket]);

  // Join room and set up listeners
  useEffect(() => {
    if (!socket) return;

    setMessages([]);
    
    socket.emit('join_room', room);

    const handleLoadMessages = (loadedMessages) => setMessages(loadedMessages);
    const handleReceiveMessage = (data) => setMessages((prev) => [...prev, data]);

    socket.on('load_messages', handleLoadMessages);
    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('load_messages', handleLoadMessages);
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, room]);

  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      const messageData = {
        username: username || 'Anonymous',
        content: message,
        timestamp: new Date().toISOString(),
        room,
        userId: userId,
      };
      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  // const handleCreateRoom = () => {
  //   if (newRoom.trim() !== '' && socket) {
  //   setRoom(newRoom.trim());
  //   socket.emit('join_room', newRoom.trim());
  //   setNewRoom('');
  // }
  // };

  return (
    <div className="Chatbox-main-layout" style={{ display: 'flex', height: '100%', width: '70%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="Chatbox-header">
          <p><b>Group Chat - {room}</b></p>
        </div>
        <div className="Chatbox-body">
          <div className="Chat-content">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  (msg.user_id == userId || msg.userId == userId) ? 'chat-message-self' : 'chat-message-other'
                }`}
              >
                <div className="chat-bubble">
                  <p className="chat-username">
                    <b>{msg.username}</b>
                    <span className="chat-timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </p>
                  <p className="chat-text">{msg.content}</p>
                </div>
              </div>
            ))}
            </div>
        </div>
        <div className="Chatbox-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <IoMdSend className="send-logo" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Chatbox;