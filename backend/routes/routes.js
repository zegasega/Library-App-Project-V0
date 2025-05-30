const express = require('express');
const router = express.Router();
const userService = require('../controllers/user_controller');

router.post('/register', async (req, res) => {userController.Register(req, res);});
router.post('/login', async (req, res) => {userController.Login(req, res);});
router.get('/users', async (req, res) => {userController.GetUserByFilter(req, res);});

module.exports = router;