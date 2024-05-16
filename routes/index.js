const express = require('express');
const UserController = require('../controllers/User');

const Router = express.Router();
const router = Router();

// User endpoints
router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

// Task endpoints


module.exports = router;
