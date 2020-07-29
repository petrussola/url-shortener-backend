const express = require('express');

// middleware
const { hashPassword } = require('../Middleware/UserAuth');

const router = express.Router();

router.post('/signup', [hashPassword], (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ message: 'ok' });
});

module.exports = router;
