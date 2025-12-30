import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./config/mongodb.js";
import router from "./router/userRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running successfully ");
});

// Database connection
mongoDB();

// Routes
app.use("/api/user", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
