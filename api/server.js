const express = require('express');
const cors = require('cors');

// Routes
const urlRoute = require('./Routes/urlRoute');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/', urlRoute);

module.exports = server;
