import { validationResult } from "express-validator";
import BaseError from "../errors/base.error.js";

export default function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(BaseError.BadRequest('Validatsiya xatosi', errors.array()));
    }
    next();
};