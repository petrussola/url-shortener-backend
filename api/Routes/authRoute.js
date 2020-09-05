const express = require('express');

// models
const { createUser } = require('../Models/UserModel');

// middleware
const {
    hashPassword,
    checkHashedPassword,
    authenticateJwt,
} = require('../Middleware/UserAuth');

// helpers
const { generateToken } = require('../config/jwt');
const cookieParams = require('../Helpers/cookies');

const router = express.Router();

router.post('/signup', [hashPassword], async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await createUser({ email, password });
        res.status(200).json({
            status: 'success',
            message: 'Sign up succesful. Please log in.',
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'This email already exists. Please select another one.',
        });
    }
});

router.post('/login', [checkHashedPassword], (req, res) => {
    // generates jwt token
    const token = generateToken(req.user);
    res.cookie('token', token, {
        ...cookieParams, // sets secure attribute based on dev or production environment
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        domain: process.env.CSRF_PROTECTION_HOST,
    });
    res.cookie('isLoggedIn', true, {
        ...cookieParams, // sets secure attribute based on dev or production environment
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        domain: process.env.CSRF_PROTECTION_HOST,
    });
    res.status(200).json({
        status: 'success',
        message: 'Succesful login',
        data: { ...req.user, token },
    });
});

router.get('/logout', [authenticateJwt], (req, res) => {
    console.log('in the resposnse stage');
    // res.cookie('token', 'deleted', { httpOnly: true });
    res.cookie('isLoggedIn', false, { httpOnly: false });
    res.status(200).json({ status: 'success', message: 'You are logged out' });
});

router.get('/csrf-token', (req, res) => {
    const token = req.csrfToken();
    res.status(200).json({ csrfToken: token });
    // res.status(200).send();
});

module.exports = router;
