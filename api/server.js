const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Routes
const urlRoute = require('./Routes/urlRoute');
const authRoute = require('./Routes/authRoute');

// Helpers
const { authenticateJwt } = require('./Middleware/UserAuth');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/auth', authRoute);
// check jwt
server.use(authenticateJwt);
// shorten url
server.use('/', urlRoute);

module.exports = server;
