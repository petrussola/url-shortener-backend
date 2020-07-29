const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Routes
const urlRoute = require('./Routes/urlRoute');
const authRoute = require('./Routes/authRoute');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/', urlRoute);
server.use('/auth', authRoute);

module.exports = server;
