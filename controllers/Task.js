const Task = require('../models/Task');
const taskToJSON = require('../utils/json').taskToJSON;
const taskStatus = require('../utils/meta').taskStatus;

class TaskController {
  static async createTask(req, res) {
    const { title, description, status, dueDate } = req.body;

    if (!title)
      return res.status(400).json({ message: 'task title is required' });
    if (!status)
      return res.status(400).json({ message: 'task status is required' });
    if (!taskStatus.includes(status))
      return res.status(400).json({
        message: `Invalid status type. Choose from: ${taskStatus.join(', ')}`,
      });
    if (!dueDate) res.status(400).json({ message: 'Due date must be field' });

    const createdBy = req.user._id;
    const task = new Task({ title, description, status, dueDate, createdBy });
    await task.save();

    return res
      .status(201)
      .json({ message: 'Task created', data: taskToJSON(task) });
  }

  static async getTask(req, res) {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task does not exist' });
    return res.json({ message: 'Task', data: taskToJSON(task) });
  }

  static async getTasks(req, res) {
    const page = req.query.page ?? 1;
    const perPage = req.query.perPage ?? 12;
    const tasks = await Task.find({ createdBy: req.user._id })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return res.json({ message: 'User Tasks', data: tasks.map(taskToJSON) });
  }

  static async updateTask(req, res) {
    const taskId = req.params.id;
    const status = req.body.status;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task does not exist' });
    if (!taskStatus.includes(status))
      return res.status(400).json({
        message: `Invalid status type. Choose from: ${taskStatus.join(', ')}`,
      });
    task.status = status;
    await task.save();
    return res.json({ message: 'Task updated', data: taskToJSON(task) });
  }

  static async deleteTask(req, res) {
    const taskId = req.params.id;

    await Task.findByIdAndDelete(taskId);
    return res.json();
  }
}

module.exports = TaskController;
