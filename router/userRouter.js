import express from "express";
import { getCurrentUser } from "../controller/getcurrentUser.js";
import { Logout, Signin, Signup } from "../controller/userController.js";
import { authMiddleware } from "../middleware/isAuth.js";
import { EditProfile } from "../controller/updateProfile.js";
import { upload, UploadAvatar } from "../controller/uploadAvatar.js";
import { createTeam, getMyTeams } from "../controller/teamController.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controller/projectController.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controller/taskController.js";

const router = express.Router();

// Auth routes
router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/logout", Logout);

// Protected route: get current user
router.get("/me", authMiddleware, getCurrentUser);

// Profile update
router.put("/profile", authMiddleware, EditProfile);

// Upload avatar
router.post(
  "/upload-avatar",
  authMiddleware, // protects the route
  upload.single("avatar"), // multer middleware to parse the file
  UploadAvatar // controller to handle Cloudinary upload
);
// Create team
router.post("/create-team", authMiddleware, createTeam);

// Get teams of logged-in user
router.get("/get-team", authMiddleware, getMyTeams);
// create project
router.post("/create-project", authMiddleware, createProject);
router.get("/get-project", authMiddleware, getProjects); // Get all projects
router.get("/get-project/:id", authMiddleware, getProjectById); // Get  project By ID
router.put("/update-project/:id", authMiddleware, updateProject); // Update  project By ID
router.delete("/delete-project/:id", authMiddleware, deleteProject); // Delete  project By ID

router.post("/tasks", authMiddleware, createTask); // Create Task
router.get("/get-tasks", authMiddleware, getTasks); // Get Tasks by project
router.get("/get-tasks/:id", authMiddleware, getTaskById); // Get Task
router.put("/update-tasks/:id", authMiddleware, updateTask);      // Update Task
//localhost:5000/api/user/delete-tasks/6952cc23888e582b4798b64b
http: router.delete("/delete-tasks/:id", authMiddleware, deleteTask);     // Delete Task

export default router;
