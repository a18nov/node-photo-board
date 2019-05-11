const express = require('express');
const router = express.Router();

router.use(express.json());
router.use('/user', require('./user'));

router.get('/', (req, res) => res.send("Welcome to Photoboard api!!"));

module.exports = router;