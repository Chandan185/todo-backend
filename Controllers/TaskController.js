import asyncHandler from "../Middlewares/asynchandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Task from "../Models/Task.js";

//@desc  add new task
//@route POST /api/tasks/new
//@access Private
const addnewTask = asyncHandler(async (req, res, next) => {
  const { description } = req.body;
  const user = req.user._id;
  if (!description) {
    return next(new ErrorHandler("task cannot be empty", 404));
  }
  const task = await Task.create({
    description,
    user,
    status: "pending",
  });
  res.status(200).json({
    success: true,
    task,
  });
});

//@desc  get all task
//@route POST /api/tasks/:id
//@access Private
const getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user });
  if (!tasks) {
    return next(new ErrorHandler("No tasks Found", 404));
  }
  res.status(200).json({
    success: true,
    tasks,
  });
});

//@desc  delete task
//@route DELETE /api/tasks/:id/delete
//@access Private
const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("No task found with this id", 404));
  }
  await Task.findByIdAndRemove(id);
  const tasks = await Task.find();
  res.status(200).json({
    success: true,
    tasks,
  });
});

//@desc  update task
//@route UPDATE /api/tasks/:id/update
//@access Private
const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new ErrorHandler("No task found with this id", 404));
  }
  const { description, status } = req.body;
  const updatedtask = await Task.findByIdAndUpdate(
    id,
    {
      description: description,
      status: status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    task: updatedtask,
  });
});

export { addnewTask, deleteTask, updateTask, getTasks };
