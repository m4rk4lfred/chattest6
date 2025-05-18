import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../../../src/Css/Mainpage/Chatsection/Chatbox.css';
import { IoMdSend } from "react-icons/io";

function Chatbox({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new socket connection on mount
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Load existing messages from the server when (re)connected
    socket.on('load_messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for incoming messages from the server
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('load_messages');
      socket.off('receive_message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      const messageData = {
        username: username || 'Anonymous',
        content: message,
        timestamp: new Date().toISOString(),
      };

      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="Chatbox-content">
      <div className="Chatbox-header">
        <p><b>Group Chat</b></p>
      </div>
      <div className="Chatbox-body">
        <div className="Chat-content">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.username === username ? 'chat-message-self' : 'chat-message-other'
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
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <IoMdSend className="send-logo" onClick={sendMessage} />
      </div>
    </div>
  );
}

export default Chatbox;