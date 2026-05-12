import projectModel from "../models/project.model.js";
import BaseError from "../errors/base.error.js";

class ProjectService {
    // Loyiha yaratish
    async create(title, description, ownerId) {
        const project = await projectModel.create({
            title,
            description,
            owner: ownerId
        });
        return project;
    }

    // Foydalanuvchining barcha loyihalarini olish
    async getAll(userId) {
        const projects = await projectModel.find({ owner: userId });
        return projects;
    }

    // Bitta loyihani ID orqali olish (faqat egasiga ko'rsatish)
    async getOne(projectId, userId) {
        const project = await projectModel.findOne({ _id: projectId, owner: userId });
        if (!project) {
            throw BaseError.BadRequest("Project not found or access denied");
        }
        return project;
    }
}

export default new ProjectService();