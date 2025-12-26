import { getCurrentUser } from "../controller/getcurrentUser.js";
import { Logout, Signin, Signup } from "../controller/userController.js";
import express from "express";
import { authMiddleware } from "../middleware/isAuth.js";

const router = express.Router();
// singup api/user/signup
router.post("/signup", Signup);
// singup api/user/signin
router.post("/signin", Signin);
// singup api/user/logout
router.get("/logout", Logout);

// get current user (protected route)
router.get("/me", authMiddleware, getCurrentUser);
export default router;
