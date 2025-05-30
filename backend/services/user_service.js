const { where } = require("sequelize");
const BaseService = require("../core/base_service");
const db = require("../db/index");
const { hashPassword } = require("../utils/utils");


class UserService extends BaseService{
    constructor() {
        super(db.User);
    }

    async create(userData) {

        const {fullName, username, email, phoneNumber, address, membershipDate, password, role} = userData;

        const existingUser = await this.db.User.findOne({where: {
            [db.Sequelize.Op.or]: [
                { email: email },
                { phoneNumber: phoneNumber }
            ]
        }});

        if (existingUser) {
            throw new Error("User with this email or phone nubmer already exists.");
        }

        const hashedPassword = await this.Utils.hashPassword(password);

        

        const newUser = await this.db.User.create({
            fullName,
            username,
            email,
            phoneNumber,
            address,
            membershipDate,
            password: hashedPassword, 
            role
        });

        return newUser;
    }

    async login({email, password}) {
        const user = await this.db.User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found.");
        }

        const isPasswordValid = await this.Utils.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const refreshToken = this.Utils.generateRefreshToken({ fullName, username, email, phoneNumber, address, membershipDate, role });
        const accesToken = this.Utils.generateAccessToken({ fullName, username, email, phoneNumber, address, membershipDate, role });

        await user.update({ refreshToken, accessToken });

        return { user, accesToken, refreshToken };
    }

}

module.exports = new UserService();