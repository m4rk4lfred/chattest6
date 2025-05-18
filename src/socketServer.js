import { Server } from 'socket.io';
import mysql from 'mysql2/promise';

// Create a connection to the database
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace 
  password: 'root', // Replace 
  database: 'ccisconnectusers',
});

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', async (socket) => {
  console.log('A user connected:', socket.id);

  // Load existing messages from the database
  const [rows] = await db.query('SELECT * FROM messages ORDER BY timestamp ASC');
  socket.emit('load_messages', rows);

  // Listen for messages from clients
  socket.on('send_message', async (data) => {
    console.log('Message received:', data);

    // Save the message to the database
   const { username, content, timestamp } = data;
    // Convert ISO string to MySQL DATETIME format
    const mysqlTimestamp = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
    await db.query('INSERT INTO messages (username, content, timestamp) VALUES (?, ?, ?)', [
      username,
      content,
      mysqlTimestamp,
    ]);

    // Broadcast the message to all connected clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

io.listen(3000); // Start the Socket.IO server on port 3000
console.log('Socket.IO server running on http://localhost:3000');