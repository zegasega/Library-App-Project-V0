const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

// User routes
router.get("user", authMiddleware, (req, res) => userController.getUser(req, res));
router.get("users", authMiddleware, roleMiddleware("admin"), (req, res) => userController.getAllUsers(req, res));
router.get("user/:id", authMiddleware, roleMiddleware("admin"), (req, res) => userController.getUserById(req, res));
router.get("user/query", authMiddleware, roleMiddleware("admin"), (req, res) => userController.getUserByQuery(req, res));


// User authentication routes
router.post("/auth/register", (req, res) => userController.register(req, res));
router.post("/auth/login", (req, res) => userController.login(req, res));
router.post("/auth/logout", authMiddleware, (req, res) => userController.logout(req, res));
router.put("/auth/user", authMiddleware, (req, res) => userController.update(req, res));
router.delete("/auth/user", authMiddleware, (req, res) => userController.delete(req, res));


module.exports = router;
