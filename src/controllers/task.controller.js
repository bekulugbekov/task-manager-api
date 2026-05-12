import taskService from "../services/task.service.js";

class TaskController {
  async create(req, res, next) {
    try {
      const { projectId } = req.params;
      const picture = req.files ? req.files.picture : null;
      const task = await taskService.create(req.body, picture, projectId);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getTasksByProject(req, res, next) {
    try {
      const { projectId } = req.params;
      const tasks = await taskService.getTasksByProject(projectId);
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const task = await taskService.delete(id);
      res
        .status(200)
        .json({ message: "Vazifa va uning rasmi o'chirildi", task });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
