import express from "express";
import { createProjectController, deleteProjectController, getAllProjectsControllers, getProjectByIdController, updateProjectController } from "../controllers/project_controllers";
import authMiddleware from "../middlewares/auth_middleware.js";
import authorizeRoles from "../middlewares/role_middleware.js";

const projectRouter = express.Router()


projectRouter.post("/create" ,authMiddleware , authorizeRoles("admin"), createProjectController)
projectRouter.get("/getallProjects", authMiddleware ,  getAllProjectsControllers);

projectRouter.get("/:id",authMiddleware , getProjectByIdController);

projectRouter.put("/:id",authMiddleware , authorizeRoles("admin"), updateProjectController);

projectRouter.delete("/:id",authMiddleware , authorizeRoles("admin"), deleteProjectController);

export default projectRouter