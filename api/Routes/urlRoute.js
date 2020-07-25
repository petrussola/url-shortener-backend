const express = require('express');
const db = require('../config/db-config');
const urls = require('../../data/urls');

const router = express.Router();

let count = 0;

// ROUTES

router.get('/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const results = await db('urls').where({ shortUrl: url }).first();
        // if data is found
        if (results) {
            const longUrl = results.longUrl;
            res.status(200).json({ status: 'success', longUrl });
        } else {
            // if data is not found, therefore results is undefinded
            res.status(404).json({ status: 'fail', longUrl: '' });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/create-url', (req, res) => {
    const { newUrl } = req.body;
    urls[count] = newUrl;
    count++;
    res.status(200).json({ status: 'success', url: count - 1 });
});

module.exports = router;
