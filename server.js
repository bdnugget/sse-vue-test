// Simple Express server to test SSE
const express = require('express');
const http = require('http');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/stream', createProxyMiddleware({ target: 'http://localhost:3001', ws: false }));

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

