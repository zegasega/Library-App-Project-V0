const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/register', async (req, res) => {userController.Register(req, res);});
router.post('/login',  async (req, res) => {userController.Login(req, res);});
router.get('/users',  async (req, res) => {userController.GetUserByFilter(req, res);});
router.put('/users/:id',  async (req, res) => {userController.updateUser(req, res);});
router.delete('/users/:id',  async (req, res) => {userController.deleteUser(req, res);});
router.put("/users/password/:id", async (req, res) => {userController.changePassword(req, res);});






module.exports = router;