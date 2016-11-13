import net from 'net';
import readline from 'readline';
import { StringDecoder } from 'string_decoder';

const decoder = new StringDecoder('utf8');

const HOST = 'localhost';
const PORT = '3001';

const client = new net.Socket();

client.on('data', (data) => {
  console.log(decoder.write(data));
});

client.on('close', () => {
  console.log('Connection closed');
});

client.connect(PORT, HOST, () => {
  console.log('Connected');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on('line', (line) => {
    client.write(line);
  });
});