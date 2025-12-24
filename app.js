import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDB from "./config/mongodb.js";
import router from "./router/userRouter.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully ");
});


// database call
mongoDB();

// middleware
app.use("/api/user",router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
