const corsProtection = require('cors');

let corsConfig = null;

if (process.env.NODE_ENV === 'development') {
    corsConfig = {
        origin: process.env.DEV_FRONTEND_URL,
        optionsSuccessStatus: 200,
        credentials: true, // sets Access-Control-Allow-Credentials Header
    };
} else {
    corsConfig = {
        origin: process.env.DEV_FRONTEND_URL,
        optionsSuccessStatus: 200,
        credentials: true, // sets Access-Control-Allow-Credentials Header
    };
}

const cors = corsProtection(corsConfig);

module.exports = cors;
