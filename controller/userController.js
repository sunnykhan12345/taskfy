import Token from "../config/Token.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
// signup api
export const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 char",
        success: false,
      });
    }
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
// login api
export const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found!",
        success: false,
      });
    }

    //  compare password
    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      return res.status(400).json({
        message: "password not match",
        success: false,
      });
    }
    // token const
    // token const
    const token = Token({ _id: user._id });

    return res.status(200).json({
      message: "user login successfully",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
// logout

export const Logout = (req, res) => {
  try {
    cookieStore.remove("tokane");
    return res
      .status(400)
      .json({ message: "Logout succefully", success: true });
  } catch (err) {
    return res.status(200).json({ message: err.message, success: false });
  }
};
