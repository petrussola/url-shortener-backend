const csrf = require('csurf');

let csrfProtection = null;

if (process.env.NODE_ENV === 'development') {
    csrfProtection = csrf({
        cookie: {
            httpOnly: true,
            secure: false,
            domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
        },
    });
} else {
    csrfProtection = csrf({
        cookie: {
            httpOnly: true,
            secure: true,
            path: '',
            domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
        },
    });
}

module.exports = csrfProtection;
