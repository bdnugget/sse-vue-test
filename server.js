// Simple Express server to test SSE
const express = require('express');
const http = require('http');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Prefer local network address instead of internal IP
const localIP = [].concat(...Object.values(require('os').networkInterfaces())).find(x => !x.internal && x.family === 'IPv4')?.address || "127.0.0.1";

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/stream', createProxyMiddleware({ target: 'http://' + localIP + ':3001', ws: false, changeOrigin: true }));

server.listen(3000, localIP, () => {
  console.log('Server running at http://' + localIP + ':3000/');
});

