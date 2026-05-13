import jwt from "jsonwebtoken";
import BaseError from "../errors/base.error.js";

export default function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(BaseError.UnAuthorizedError());
        }

        const accessToken = authHeader.split(' ')[1]; // "Bearer TOKEN_HERE"
        if (!accessToken) {
            return next(BaseError.UnAuthorizedError());
        }

        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET || 'secret-key');
        req.user = userData; // Endi barcha controllerlarda req.user.id mavjud bo'ladi
        next();
    } catch (e) {
        return next(BaseError.UnAuthorizedError());
    }
}