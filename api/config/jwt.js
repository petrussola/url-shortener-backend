const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user.id,
        admin: user.admin,
        approved: user.approved,
    };
    const options = {
        expiresIn: '1d',
    };
    const result = jwt.sign(payload, process.env.JWT_SECRET, options);

    return result;
}

module.exports = {
    generateToken,
};
