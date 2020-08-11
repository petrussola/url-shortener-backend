const corsProtection = require('cors');

const cors = corsProtection({
    origin: process.env.DEV_FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true, // sets Access-Control-Allow-Credentials Header
});

module.exports = cors;
