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
            httpOnly: process.env.HTTP_ONLY,
            secure: process.env.SECURE,
            domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
            sameSite: process.env.SAME_SITE,
            path: process.env.PATH,
        },
    });
}

module.exports = csrfProtection;
