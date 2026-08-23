import projectModel from "../models/project_model.js";

// CREATE PROJECT
const createProjectController = async (req, res) => {
  try {
    const {
      projectTitle,
      description,
      category,
      location,
      startDate,
      endDate,
      assignedTo,
      skillsRequired,
     
      status,
    } = req.body;

    if (
      !projectTitle ||
      !description ||
      !category ||
      !location ||
      !startDate ||
      !endDate ||
      !assignedTo 
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
      assignedTo,
      skillsRequired,
      
      status: status || "Pending",
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

// GET ALL PROJECTS
const getAllProjectsControllers = async (req, res) => {
  try {
    const projects = await projectModel
      .find()
      .sort({ createdAt: -1 });

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

// GET SINGLE PROJECT
const getProjectByIdController = async (req, res) => {
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
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE / EDIT / APPROVE / REJECT
const updateProjectController = async (req, res) => {
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
  status,
} = req.body;
  try {
    const { id } = req.params;

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
    status,
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

// DELETE PROJECT
const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject =
      await projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// APPROVE PROJECT
// const approveProjectController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const project = await projectModel.findByIdAndUpdate(
//       id,
//       {
//         status: "Approved",
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Project approved successfully",
//       data: project,
//     });

//   } catch (error) {
//     console.log("APPROVE PROJECT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // REJECT PROJECT
// const rejectProjectController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const project = await projectModel.findByIdAndUpdate(
//       id,
//       {
//         status: "Rejected",
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Project rejected successfully",
//       data: project,
//     });

//   } catch (error) {
//     console.log("REJECT PROJECT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export {
  createProjectController,
  getAllProjectsControllers,
  getProjectByIdController,
  updateProjectController,
  deleteProjectController,
  // approveProjectController,
  // rejectProjectController,
};