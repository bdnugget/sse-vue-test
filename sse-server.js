const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  });

  setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 1000);

  req.on('close', () => {
    console.log('Client disconnected');
    res.end();
  });
});

server.listen(3001, () => {
  console.log('SSE Server running at http://localhost:3001/');
});

