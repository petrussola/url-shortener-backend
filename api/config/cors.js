const corsProtection = require('cors');

const cors = corsProtection({
    origin: process.env.DEV_FRONTEND_URL,
    optionsSuccessStatus: 200,
});

module.exports = cors;
