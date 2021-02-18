const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Routes
const urlRoute = require('./Routes/urlRoute');
const authRoute = require('./Routes/authRoute');

// Config
const csrfProtection = require('./config/csrfProtection');
const cors = require('./config/cors');

const server = express();

server.use(cors);
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use(csrfProtection);

server.use('/auth', authRoute);

// url-related actions
server.use('', urlRoute);
// csrf error handler
// error handler
server.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403);
    res.send('form tampered with');
});

module.exports = server;
