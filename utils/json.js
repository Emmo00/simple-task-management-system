function taskToJSON(task) {
  return {
    id: task._id,
    title: task.title,
    description: title.description,
    status: title.status,
    created_by: title.createdBy,
    created_at: title.createdAt,
    due_date: title.dueDate,
  };
}

module.exports = { taskToJSON };
