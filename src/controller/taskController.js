import TaskDetails from "../models/taskSchema.js";

export async function getTaskList(req, res) {
  try {
    const { search = "" } = req.query;

    let filter = {};
    const keyword = search.trim();

    if (keyword) {
      filter = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const tasks = await TaskDetails.find(filter).sort({ dueAt: 1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}


export async function createTask(req, res) {
  try {
    const task = await TaskDetails.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority || "Medium",
      status: req.body.status || "In Progress",
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;

    if (!["In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be In Progress or Completed",
      });
    }

    const task = await TaskDetails.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status Updated!",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateTask(req, res) {
  try {
    const updatedTask = await TaskDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteTask(req, res) {
  try {
    const deleteTask = await TaskDetails.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
