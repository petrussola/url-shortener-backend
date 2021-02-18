let cookieParams = null;

if (process.env.NODE_ENV === 'development') {
    cookieParams = {
        secure: false,
    };
} else {
    cookieParams = {
        secure: true,
        sameSite: 'strict',
    };
}

module.exports = cookieParams;
