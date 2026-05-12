import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authRouter from "./auth.route.js";
import projectController from "../controllers/project.controller.js";
import taskController from "../controllers/task.controller.js";

const router = new Router();

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Loyihalar bilan ishlash bo'limi
 *   - name: Tasks
 *     description: Vazifalar va fayllar bilan ishlash bo'limi
 */

// Ochiq route'lar
router.use('/auth', authRouter);

// Himoyalangan route'lar (faqat login qilganlar uchun)
router.use(authMiddleware);

// --- Projects ---

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Yangi loyiha yaratish
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yangi Web Sahifa"
 *               description:
 *                 type: string
 *                 example: "Frontend va Backend qismini bog'lash"
 *     responses:
 *       201:
 *         description: Loyiha muvaffaqiyatli yaratildi
 */
router.post('/projects', projectController.create);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Foydalanuvchining barcha loyihalarini olish
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Loyihalar ro'yxati qaytdi
 */
router.get('/projects', projectController.getAll);

// --- Tasks ---

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   post:
 *     summary: Loyihaga yangi vazifa va rasm yuklash
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: Loyihaning ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Vazifa rasm bilan birga yaratildi
 */
router.post('/projects/:projectId/tasks', taskController.create);

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   get:
 *     summary: Maxsus loyihaga tegishli barcha vazifalarni ko'rish
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vazifalar ro'yxati
 */
router.get('/projects/:projectId/tasks', taskController.getTasksByProject);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Vazifani o'chirish (fayli bilan birga)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'chirildi
 */
router.delete('/tasks/:id', taskController.delete);

export default router;