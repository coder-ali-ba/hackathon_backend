import projectModel from "../models/project_model.js";



// CREATE PROJECT
export const createProjectController = async (req, res) => {
  try {
    const {
      projectTitle,
      description,
      category,
      location,
      startDate,
      endDate,
      requiredVolunteers,
      skillsRequired,
      projectImage,
    } = req.body;

    if (
      !projectTitle ||
      !description ||
      !category ||
      !location ||
      !startDate ||
      !endDate ||
      !requiredVolunteers ||
      !projectImage
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required",
      });
    }

    const project = await projectModel.create({
      projectTitle,
      description,
      category,
      location,
      startDate,
      endDate,
      requiredVolunteers,
      skillsRequired,
      projectImage,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllProjectsControllers = async (req, res) => {
  try {
    const projects = await projectModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.log("GET PROJECTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.log("GET SINGLE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      projectTitle,
      description,
      category,
      location,
      startDate,
      endDate,
      requiredVolunteers,
      skillsRequired,
      projectImage,
    } = req.body;

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      {
        projectTitle,
        description,
        category,
        location,
        startDate,
        endDate,
        requiredVolunteers,
        skillsRequired,
        projectImage,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.log("UPDATE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
    createProjectController,
    getAllProjectsControllers,
    getProjectByIdController,
    updateProjectController,
    deleteProjectController
}