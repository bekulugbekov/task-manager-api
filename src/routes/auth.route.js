import { Router } from "express";
import { body } from "express-validator"; // 1. Validatorni import qiling
import authController from "../controllers/auth.controller.js";
import validatorMiddleware from "../middlewares/validator.middleware.js"; // 2. Middlawareni import qiling

const router = new Router();

// Ro'yxatdan o'tish qismini yangilaymiz
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               fullName:
 *                 type: string
 *                 example: "Eshmat Toshmatov"
 *     responses:
 *       201:
 *         description: Foydalanuvchi yaratildi
 */

router.post(
  "/register",
  body("email").isEmail().withMessage("Email notoʻgʻri"), // Email formatini tekshirish
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Parol 6 tadan 20 tagacha boʻlishi kerak"), // Parol uzunligi
  body("fullName").notEmpty().withMessage("Ism boʻsh boʻlmasligi kerak"), // Ism borligini tekshirish
  validatorMiddleware, // Xatolarni tutib oluvchi middleware
  authController.register,
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Tizimga kirish va token olish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirish
 */

router.post("/login", authController.login);

export default router;
