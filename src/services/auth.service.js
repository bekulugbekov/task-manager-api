import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BaseError from "../errors/base.error.js";

class AuthService {
    async register(email, password, fullName) {
        // 1. Email band emasligini tekshirish
        const candidate = await userModel.findOne({ email });
        if (candidate) {
            throw BaseError.BadRequest(`User with email ${email} already exists`);
        }

        // 2. Parolni shifrlash (10 - tuz darajasi)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Bazaga saqlash
        const user = await userModel.create({
            email,
            password: hashedPassword,
            fullName
        });

        // 4. Token yaratish
        const tokens = this.generateTokens({ id: user._id, email: user.email });
        return { ...tokens, user };
    }

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw BaseError.BadRequest("User not found with this email");
        }

        // Parolni tekshirish
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw BaseError.BadRequest("Invalid password");
        }

        const tokens = this.generateTokens({ id: user._id, email: user.email });
        return { ...tokens, user };
    }

    generateTokens(payload) {
        // .env faylingizda JWT_ACCESS_SECRET bo'lishi kerak
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'secret-key', { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh-key', { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
}

export default new AuthService();