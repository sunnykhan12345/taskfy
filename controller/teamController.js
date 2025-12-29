import Team from "../models/Team.js";

export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }
    // Create team
    const team = await Team.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id], // owner also a member
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all teams user belongs to
export const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user._id,
    }).populate("owner members", "name email avatar");

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
