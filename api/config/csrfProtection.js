const csrf = require('csurf');

let csrfProtection = null;

if (process.env.NODE_ENV === 'development') {
    console.log('>>> dev <<<');
    csrfProtection = csrf({
        cookie: {
            httpOnly: true,
            secure: false,
            domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
        },
    });
} else {
    console.log('>>> prod <<<');
    csrfProtection = csrf({
        cookie: {
            httpOnly: true,
            secure: true,
            domain: process.env.CSRF_PROTECTION_HOST, // host (NOT DOMAIN, NOT HTTP:// OR HTTPS://)!
        },
    });
}

module.exports = csrfProtection;
