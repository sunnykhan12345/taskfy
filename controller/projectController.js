// controllers/projectController.js
import Project from "../models/project.js";

// @desc   Create new project
// @route  POST /api/projects
// @access Private
export const createProject = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;

    if (!title || !teamId) {
      return res
        .status(400)
        .json({ message: "Title and Team ID are required" });
    }

    const project = await Project.create({
      title,
      description,
      teamId,
      createdBy: req.user.id, // from JWT middleware
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all projects for a user or team
// @route  GET /api/projects
// @access Private
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }); // or filter by teamId
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get project by ID
// @route  GET /api/projects/:id
// @access Private
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update project
// @route  PATCH /api/projects/:id
// @access Private
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Only creator can update
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete prject by ide
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Only creator can delete
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne(); // ✅ updated
    res.status(200).json({ message: "Project removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
