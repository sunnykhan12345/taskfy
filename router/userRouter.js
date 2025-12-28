// import { getCurrentUser } from "../controller/getcurrentUser.js";
// import { Logout, Signin, Signup } from "../controller/userController.js";
// import express from "express";
// import { authMiddleware } from "../middleware/isAuth.js";
// import { EditProfile } from "../controller/updateProfile.js";
// import { uploadAvatar } from "../controller/uploadAvatar.js";

// const router = express.Router();
// // singup api/user/signup
// router.post("/signup", Signup);
// // singup api/user/signin
// router.post("/signin", Signin);
// // singup api/user/logout
// router.get("/logout", Logout);

// // get current user (protected route)
// router.get("/me", authMiddleware, getCurrentUser);
// // Phase 2 routes
// router.put("/profile", authMiddleware, EditProfile);

// router.post(
//   "/upload-avatar",
//   authMiddleware,
//   uploadAvatar.single("avatar"),
//   uploadAvatar
// );

// export default router;
import express from "express";
import { getCurrentUser } from "../controller/getcurrentUser.js";
import { Logout, Signin, Signup } from "../controller/userController.js";
import { authMiddleware } from "../middleware/isAuth.js";
import { EditProfile } from "../controller/updateProfile.js";
import { upload, UploadAvatar } from "../controller/uploadAvatar.js";
import { createTeam, getMyTeams } from "../controller/teamController.js";

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

export default router;
