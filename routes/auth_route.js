import express from "express";
import { getAllUsersController, googleSigninController, registerController, singinController } from "../controllers/auth_controllers.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const authRouter = express.Router()

authRouter.post("/register" , registerController);
authRouter.post('/signin' , singinController)
authRouter.post('/google/signin' , googleSigninController)
authRouter.post('/allusers' , authMiddleware, authorizeRoles("admin"),  getAllUsersController)

export default authRouter