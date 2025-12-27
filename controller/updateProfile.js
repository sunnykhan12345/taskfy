import User from "../models/user.js";

export const EditProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, avatar },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
