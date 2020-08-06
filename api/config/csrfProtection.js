const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
    },
});

module.exports = csrfProtection;
