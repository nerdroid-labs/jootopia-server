const MjpegProxy = require('mjpeg-proxy').MjpegProxy;
const express = require('express');
const path = require('path');

const app = express();
const app_port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/static', express.static(__dirname + '/static'));
app.get('/camera-1', new MjpegProxy('http://192.168.0.101').proxyRequest);
app.get('/camera-2', new MjpegProxy('http://192.168.0.102').proxyRequest);
