import express from "express";
import { getuserProfile, loginUser, logout, register } from "../Controllers/UserController.js";
import isAuthenticatedUser from "../Middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route('/profile').get(isAuthenticatedUser,getuserProfile);
export default router;
