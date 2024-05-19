const express = require('express');
const UserController = require('../controllers/User');
const TaskController = require('../controllers/Task');
const authMiddleware = require('../middleware/auth').authMiddleware;

const router = express.Router();

// User endpoints
router.post('/auth/register', UserController.register);
router.post('/auth/login', UserController.login);

// Task endpoints
router.use(authMiddleware);
router.post('/user/tasks', TaskController.createTask);
router.get('/user/tasks/:id', TaskController.getTask);
router.get('/user/tasks', TaskController.getTasks);
router.patch('/user/tasks/:id', TaskController.updateTask);
router.delete('/user/tasks/:id', TaskController.deleteTask);

module.exports = router;
