const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// models
const { getUserByEmail } = require('../Models/UserModel');

module.exports = {
    hashPassword,
    checkHashedPassword,
    authenticateJwt,
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
        res.status(500).json({ message: error.message });
    }
}

function authenticateJwt(req, res, next) {
    const { token } = req.cookies;
    console.log(token, 'blabla');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ status: 'fail', message: 'Bad Token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: `No credentials provided` });
    }
}
