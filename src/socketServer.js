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

  let currentRoom = 'Dev Circle';
  socket.join(currentRoom);

  // Ensure default room exists
  await db.query('INSERT IGNORE INTO rooms (name) VALUES (?)', [currentRoom]);

  // Load messages for the default room
  const [rows] = await db.query(
    'SELECT * FROM messages WHERE room = ? ORDER BY timestamp ASC',
    [currentRoom]
  );
  socket.emit('load_messages', rows);

  // Send the full room list on connect
  const [allRooms] = await db.query('SELECT name FROM rooms');
  socket.emit('room_list', allRooms.map(r => r.name));

  // Handle joining a different room
  socket.on('join_room', async (room = 'Dev Circle') => {
  socket.leave(currentRoom);
  currentRoom = room;
  socket.join(room);

  // Ensure the room exists in the rooms table
  await db.query('INSERT IGNORE INTO rooms (name) VALUES (?)', [room]);

  // Load messages for the selected room
  const [roomRows] = await db.query(
    'SELECT * FROM messages WHERE room = ? ORDER BY timestamp ASC',
    [room]
  );
  socket.emit('load_messages', roomRows);

  // Send updated room list
  const [updatedRooms] = await db.query('SELECT name FROM rooms');
  io.emit('room_list', updatedRooms.map(r => r.name));
});

  // Listen for messages from clients
  socket.on('send_message', async (data) => {
    const { username, content, timestamp, room = 'Dev Circle' } = data;
    const mysqlTimestamp = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
    await db.query(
      'INSERT INTO messages (username, content, timestamp, room) VALUES (?, ?, ?, ?)',
      [username, content, mysqlTimestamp, room]
    );
    // Broadcast to the room only
    io.to(room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });

  // Always get rooms from the rooms table
  socket.on('get_rooms', async () => {
    const [rooms] = await db.query('SELECT name FROM rooms');
    socket.emit('room_list', rooms.map(r => r.name));
  });

socket.on('change_username', async ({ userId, newUsername }) => {
  try {
    // Update username in users table by userId
    await db.query(
      'UPDATE users SET username = ? WHERE id = ?',
      [newUsername, userId]
    );
    // Optionally update username in messages table for consistency
    await db.query(
      'UPDATE messages SET username = ? WHERE user_id = ?',
      [newUsername, userId]
    );
    socket.emit('username_changed', { success: true, newUsername });
  } catch (err) {
    socket.emit('username_changed', { success: false, error: err.message });
  }
});

  
});

io.listen(3000);
console.log('Socket.IO server running on http://localhost:3000');