const express = require('express');

// models
const { createUser, approveUser } = require('../Models/UserModel');

// middleware
const {
    hashPassword,
    checkHashedPassword,
    authenticateJwt,
    checkIfAdmin,
    fetchToBeApprovedUsers,
    fetchAllUsers,
} = require('../Middleware/UserAuth');

// helpers
const { generateToken } = require('../config/jwt');
const cookieParams = require('../Helpers/cookies');

const router = express.Router();

router.post('/signup', [hashPassword], async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await createUser({
            email,
            password,
            admin: false,
            approved: false,
        });
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

router.post(
    '/login',
    [checkHashedPassword, checkIfAdmin, fetchToBeApprovedUsers, fetchAllUsers],
    (req, res) => {
        // generates jwt token
        const token = generateToken(req.user);
        const { tobeapproved, allusers } = req;
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
            tobeapproved,
            allusers,
        });
    }
);

router.get('/logout', [authenticateJwt], (req, res) => {
    // res.cookie('token', 'deleted', { httpOnly: true });
    res.cookie('isLoggedIn', false, { httpOnly: false });
    res.status(200).json({ status: 'success', message: 'You are logged out' });
});

router.get('/csrf-token', (req, res) => {
    const token = req.csrfToken();
    res.status(200).json({ csrfToken: token });
    // res.status(200).send();
});

router.post(
    '/approve-user',
    [authenticateJwt, checkIfAdmin],
    async (req, res) => {
        const { id } = req.body;
        try {
            const tobeapproved = await approveUser(id);
            res.status(200).json({ message: 'success', tobeapproved });
        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;
