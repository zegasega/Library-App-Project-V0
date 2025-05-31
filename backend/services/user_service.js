const BaseService = require("../core/base_service");
const db = require("../db/index");

class UserService extends BaseService{
    constructor() {
        super(db.User);
        this.db = require("../db/index");
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

    async login({ email, password }) {
        const user = await this.db.User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found.");
        }

        const isPasswordValid = await this.Utils.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const payload = {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            membershipDate: user.membershipDate,
            role: user.role
        };

        const refreshToken = this.Utils.generateRefreshToken(payload);
        const accessToken = this.Utils.generateAccessToken(payload);

        // Bu alanlar user modelinde varsa güncellenir, yoksa güncellenemez.
        // Eğer DB'de refreshToken/accessToken alanları yoksa bu satırı kaldırabilirsin.
        // await user.update({ refreshToken, accessToken });

        return { user, accessToken, refreshToken };
    }


    async updateUser(id, userData) {
        const user = await this.db.User.findByPk(id);
        if (!user) {
            throw new Error("User not found.");
        }

        const updatedUser = await user.update(userData);
        return updatedUser;
    }

    async deleteUser(id) {
        const user = await this.db.User.findByPk(id);
        if (!user) {
            throw new Error("User not found.");
        }

        await user.destroy();
        return { message: "User deleted successfully." };
    }
   
    async getFilteredUsers(query = {}) {
        const where = {};
        if (query.id) where.id = query.id;
        if (query.fullName) where.fullName = { [this.db.Sequelize.Op.like]: `%${query.fullName}%` };
        if (query.phoneNumber) where.phoneNumber = query.phoneNumber;
        if (query.address) where.address = { [this.db.Sequelize.Op.like]: `%${query.address}%` };
        if (query.role) where.role = query.role;
        if (query.email) where.email = query.email;
        if (query.username) where.username = { [this.db.Sequelize.Op.like]: `%${query.username}%` };

        const results = await this.db.User.findAll({ where });

        if (results.length === 0) {
            throw new Error("No users found with the provided filters.");
        }
        return results;
    }

}

module.exports = new UserService();