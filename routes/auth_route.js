import express from "express";
import { registerController, singinController } from "../controllers/auth_controllers.js";

const authRouter = express.Router()

authRouter.post("/register" , registerController);
authRouter.post('/signin' , singinController)

export default authRouter