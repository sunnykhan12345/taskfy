import User from "../models/user.js";
import bcrypt from "bcrypt";
export const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered", success: false });
    }

    // hahsed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
