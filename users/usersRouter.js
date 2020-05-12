const express = require('express');
const router = express.Router();
const userDb = require('./userHelpers.js');
const restricted = require('../api/restricted-middleware.js');


router.get('/', restricted, async (req, res) => {
    try {
        const users = await userDb.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;