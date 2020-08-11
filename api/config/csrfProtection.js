const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
    },
});

module.exports = csrfProtection;
