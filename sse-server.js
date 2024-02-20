const http = require('http');
const { isIPInRange } = require('./ipTools');
// const vuePort = 8080; // @TODO bd This is not guaranteed, find a better way!

const server = http.createServer((req, res) => {
  const allowedSubnets = [
    '192.168.0.0/16', // Common LAN range 192.168.x.x
    '10.0.0.0/8',      // Common LAN range 10.x.x.x
    '172.16.0.0/12',   // Common LAN range 172.16.x.x - 172.31.x.x
  ];

  const origin = req.headers.origin;
  console.log(origin);
  const ip = origin.split('//')[1].split(':')[0]; // Extract IP part from the origin

  if (allowedSubnets.some(subnet => isIPInRange(ip, subnet))) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': origin
    });
  } else {
    // Origin not allowed
    res.writeHead(403);
    res.end();
    return;
  }

  function sendRandomMessage() {
    const randomInterval = Math.round((Math.random() * 9000) + 1000); // Random interval between 1 and 10 seconds
    const d = new Date();
    const nextTick = new Date(d.getTime() + randomInterval);
    const message = `data: ${d.toLocaleTimeString()} - Next interval: ${randomInterval/1000}s at ${nextTick.toLocaleTimeString()}\n\n`;
    res.write(message);

    setTimeout(sendRandomMessage, randomInterval); // Set timeout for the next message
  }

  sendRandomMessage();

  req.on('close', () => {
    console.log('Client disconnected');
    res.end();
  });
});

server.listen(3001, () => {
  console.log('SSE Server running at http://localhost:3001/');
});

