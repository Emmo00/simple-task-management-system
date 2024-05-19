function taskToJSON(task) {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    created_by: task.createdBy,
    created_at: task.createdAt,
    due_date: task.dueDate,
  };
}

module.exports = { taskToJSON };
