<<<<<<< HEAD
import taskModel from "../models/task.model.js";
import fileService from "./file.service.js"; // Rasmlar bilan ishlash uchun

class TaskService {
  async create(data, picture, projectId) {
    let fileName = null;
    if (picture) {
      fileName = fileService.save(picture);
    }

    const task = await taskModel.create({
      ...data,
      picture: fileName,
      project: projectId,
    });
    return task;
  }

  // Ma'lum bir loyihaga tegishli barcha vazifalarni olish
  async getTasksByProject(projectId) {
    // .populate('project') orqali loyiha haqidagi ma'lumotlarni ham qo'shib olish mumkin
    const tasks = await taskModel.find({ project: projectId });
    return tasks;
  }

  async updateStatus(taskId, status) {
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );
    return task;
  }

  async delete(id) {
    const task = await taskModel.findByIdAndDelete(id);
    if (task && task.picture) {
      fileService.delete(task.picture);
    }
    return task;
  }
}

export default new TaskService();
=======
import taskModel from "../models/task.model.js";
import fileService from "./file.service.js"; // Rasmlar bilan ishlash uchun

class TaskService {
  async create(data, picture, projectId) {
    let fileName = null;
    if (picture) {
      fileName = fileService.save(picture);
    }

    const task = await taskModel.create({
      ...data,
      picture: fileName,
      project: projectId,
    });
    return task;
  }

  // Ma'lum bir loyihaga tegishli barcha vazifalarni olish
  async getTasksByProject(projectId) {
    // .populate('project') orqali loyiha haqidagi ma'lumotlarni ham qo'shib olish mumkin
    const tasks = await taskModel.find({ project: projectId });
    return tasks;
  }

  async updateStatus(taskId, status) {
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );
    return task;
  }

  async delete(id) {
    const task = await taskModel.findByIdAndDelete(id);
    if (task && task.picture) {
      fileService.delete(task.picture);
    }
    return task;
  }
}

export default new TaskService();
>>>>>>> master
