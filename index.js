// Dependencies
const http = require('http');
const socketIO = require('socket.io');

// Create a HTTP server
const server = http.createServer();
const io = socketIO(server);

// Event listener for a new client connection
io.on('connection', (socket) => {
  console.log('New client connected!');

  // Event listener for receiving messages from clients
  socket.on('chatMessage', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('chatMessage', message);
  });

  // Event listener for a client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected!');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket chat server is listening on port ${port}`);
});
