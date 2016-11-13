import net from 'net';

const HOST = 'localhost';
const PORT = '3001';

const users = [];

function broadcast(message, sender) {
  users.forEach((user) => {
    // Don't want to see your own message
    if (user === sender) return;
    user.write(message);
  });

  // Log message on server as well
  console.log(message);
}

const server = net.createServer();
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on ${server.address().address}:${server.address().port}`);
});

server.on('connection', (socket) => {
  socket.name = socket.remoteAddress + ':' + socket.remotePort;
  users.push(socket);

  socket.write(`Welcome ${socket.name}\n`);
  broadcast(`${socket.name} joined the chat\n`, socket);

  socket.on('data', (data) => {
    broadcast(`${socket.name}> ${data}`, socket);
  });

  socket.on('end', () => {
    users.splice(users.indexOf(user), 1);
    broadcast(`${socket.name} has left the chat.\n`);
  });

  socket.on('error', (error) => {
    console.log(`There was an error ${error}`);
  });
});

server.on('error', (error) => {
  console.log(`There was an error: ${error}`);
});
