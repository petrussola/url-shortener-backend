const express = require('express');

const urls = require('../../data/urls');

const router = express.Router();

let count = 0;

// ROUTES

router.get('/:url', (req, res) => {
    const { url } = req.params;
    const longUrl = urls[url];
    if (longUrl) {
        res.status(200).json({ status: 'success', longUrl });
    } else {
        res.status(404).json({ status: 'fail', longUrl: '' });
    }
});

router.post('/create-url', (req, res) => {
    const { newUrl } = req.body;
    urls[count] = newUrl;
    count++;
    res.status(200).json({ status: 'success', url: count - 1 });
});

module.exports = router;
