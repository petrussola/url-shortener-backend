const bcrypt = require('bcrypt');

module.exports = {
    hashPassword,
};

function hashPassword(req, res, next) {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 11);
    req.body = {
        ...req.body,
        password: hash,
    };
    next();
}
