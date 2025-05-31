const BaseController = require("../core/base_controller");

class UserController extends BaseController{
    constructor() {
        super();
    }

    async Register(req, res) {
        try {
            const newUser = await this.service.userService.create(req.body);
            res.status(201).json({
                message: "User created successfully",
                user: newUser
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "An error occurred while creating the user."
            });
        }
    }
    async Login(req, res) {
        try {
            const user = await this.service.userService.login(req.body);
            res.status(200).json({
                message: "Login successful",
                user: user
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "An error occurred during login."
            });
        }
    }
    async GetUserByFilter(req, res) {
        try {
            const users = await this.service.userService.getFilteredUsers(req.query);
            res.status(200).json({
                message: "Users retrieved successfully",
                users: users
            });
        } catch (error) {
            
            res.status(400).json({
                message: error.message || "An error occurred while retrieving users."
            });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await this.service.userService.update(req.params.id, req.body);
            res.status(200).json({
                message: "User updated successfully",
                user: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "An error occurred while updating the user."
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await this.service.userService.delete(req.params.id);
            res.status(200).json({
                message: "User deleted successfully",
                result: result
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "An error occurred while deleting the user."
            });
        }
    }

    async changePassword(req, res) {
        try {
            const result = await this.service.userService.changePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
            res.status(200).json({
                message: "Password changed successfully",
                result: result
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "An error occurred while changing the password."
            });
        }
    }   
}

module.exports = new UserController();