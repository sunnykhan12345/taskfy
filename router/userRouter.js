import { Signin, Signup } from "../controller/userController.js";
import express from "express";

const router = express.Router();
// singup api/user/signup
router.post("/signup", Signup);
// singup api/user/signin
router.post("/signin", Signin);

export default router;
