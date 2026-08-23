import express from "express";

import authMiddleware from "../middlewares/auth_middleware.js";
import authorizeRoles from "../middlewares/role_middleware.js";

import {
  approveProjectController,
  createProjectController,
  deleteProjectController,
  getAllProjectsControllers,
  getProjectByIdController,
  rejectProjectController,
  updateProjectController,
} from "../controllers/project_controllers.js";

const projectRouter = express.Router();


// ================= CREATE PROJECT =================
projectRouter.post(
  "/create",
  authMiddleware,
  authorizeRoles("admin"),
  createProjectController
);


// ================= GET ALL PROJECTS =================
projectRouter.get(
  "/getallProjects",
  authMiddleware,
  getAllProjectsControllers
);


// ================= APPROVE PROJECT =================
projectRouter.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("admin"),
  approveProjectController
);


// ================= REJECT PROJECT =================
projectRouter.put(
  "/reject/:id",
  authMiddleware,
  authorizeRoles("admin"),
  rejectProjectController
);


// ================= UPDATE PROJECT =================
projectRouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateProjectController
);


// ================= DELETE PROJECT =================
projectRouter.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteProjectController
);


// ================= GET SINGLE PROJECT =================
// Dynamic route ko last mein rakhna better hai
projectRouter.get(
  "/:id",
  authMiddleware,
  getProjectByIdController
);


export default projectRouter;