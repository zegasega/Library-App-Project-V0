const BaseController = require("../core/base_controller");

class UserController extends BaseController{
    constructor() {
        super();
    }

    async Register(req, res) {
        try {
            newUser = await this.service.userService.create(req.body);
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
}