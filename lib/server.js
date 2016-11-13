import net from 'net';

const server = net.createServer((socket) => {
  socket.on('error', () => {
    console.log('There was an error with the server');
  });

  socket.on('end', () => {
    console.log('The connection to the server has been closed');
  });

  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');