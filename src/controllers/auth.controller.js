import authService from "../services/auth.service.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, fullName } = req.body;
            const userData = await authService.register(email, password, fullName);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await authService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();