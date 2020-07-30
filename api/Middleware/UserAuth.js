const bcrypt = require('bcrypt');

// models
const { getUserByEmail } = require('../Models/UserModel');

module.exports = {
    hashPassword,
    checkHashedPassword,
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

async function checkHashedPassword(req, res, next) {
    const { email, password } = req.body;
    try {
        // find user in database
        const user = await getUserByEmail(email);
        // if user was found and password matches the bcrypted one
        if (user && bcrypt.compareSync(password, user.password)) {
            // set req.user and move to the next item
            req.user = {
                id: user.id,
                email: user.email,
            };
            return next();
        } // if no user was found
        else
            res.status(500).json({
                status: 'fail',
                message: 'Invalid credentials',
            });
    } catch (error) {
        console.log(error.message);
    }
}
