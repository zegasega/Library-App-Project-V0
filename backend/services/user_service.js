const BaseService = require("../core/base_service");
const db = require("../db/index");


class UserService extends BaseService{
    constructor() {
        super(db.User);
    }

}