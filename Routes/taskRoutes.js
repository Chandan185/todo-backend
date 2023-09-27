import express from "express";
import {
  addnewTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../Controllers/TaskController.js";
import isAuthenticatedUser from "../Middlewares/auth.js";
const router = express.Router();

router.route("/new").post(isAuthenticatedUser,addnewTask);

router.route("/:id/delete").delete(isAuthenticatedUser,deleteTask);

router.route("/:id/update").put(isAuthenticatedUser,updateTask);
router.route("/").get(isAuthenticatedUser,getTasks);
export default router;
