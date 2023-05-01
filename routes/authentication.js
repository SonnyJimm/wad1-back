const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication');

router.post('/api/user/register', authenticationController.register);;

module.exports = router;