import projectService from "../services/project.service.js";

class ProjectController {
    async create(req, res, next) {
        try {
            const { title, description } = req.body;
            // req.user bizga authMiddleware dan keladi
            const project = await projectService.create(title, description, req.user.id);
            res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const projects = await projectService.getAll(req.user.id);
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const project = await projectService.delete(id, req.user.id);
            res.status(200).json({ message: "Loyiha o'chirildi", project });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProjectController();