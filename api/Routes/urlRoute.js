const express = require('express');

const urls = require('../../data/urls');

const router = express.Router();

let count = 0;

// ROUTES

router.get('/:url', (req, res) => {
    const { url } = req.params;
    const longUrl = urls[url];
    res.status(200).json({ status: 'success', longUrl });
});

router.post('/create-url', (req, res) => {
    const { newUrl } = req.body;
    urls[count] = newUrl;
    count++;
    res.status(200).json({ status: 'success', url: count - 1 });
});

module.exports = router;
