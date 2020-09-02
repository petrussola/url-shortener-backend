// dependencies
const express = require('express');

// helpers
const db = require('../config/db-config');
const { randomStr } = require('../Helpers/helpers.js'); // helper function to generate short URL
const { authenticateJwt } = require('../Middleware/UserAuth');

const router = express.Router();

// env variables to set length of the short string and chars available
const charsAvailable = process.env.CHARS;
const charsLength = process.env.LENGTH;

// ROUTES
router.get('/', (req, res) => {
    res.status(200).json({ message: 'hey, server is up and running!' });
});

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
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

router.post('/create-url', authenticateJwt, async (req, res) => {
    // destructures the long url passed in the body
    const { newUrl } = req.body;
    // destructuring user id
    const { id } = req.decodedToken;
    // generate string with 5 random chars using helper function
    const randomShortUrl = randomStr(charsLength, charsAvailable);
    try {
        // tries insert into database
        const result = await db('urls').insert(
            {
                longUrl: newUrl,
                shortUrl: randomShortUrl,
                userId: id,
            },
            ['id', 'shortUrl'] // returns id and the shortUrl
        );
        const urlsUser = await db('urls').where({ userId: id });
        res.status(200).json({
            status: 'success',
            url: result[0].shortUrl,
            urlsUser,
        });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
