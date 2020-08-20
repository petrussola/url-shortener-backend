const corsProtection = require('cors');

let corsConfig = {
    origin: process.env.DEV_FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true, // sets Access-Control-Allow-Credentials Header
};

const cors = corsProtection(corsConfig);

module.exports = cors;
