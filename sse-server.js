const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  });

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

