const express = require('express');

// models
const { createUser } = require('../Models/UserModel');

// middleware
const { hashPassword } = require('../Middleware/UserAuth');

const router = express.Router();

router.post('/signup', [hashPassword], async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await createUser({ email, password });
        res.status(200).json({
            status: 'success',
            message: 'user created',
            data: newUser,
        });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
