import express from "express";
import { googleSigninController, registerController, singinController } from "../controllers/auth_controllers.js";

const authRouter = express.Router()

authRouter.post("/register" , registerController);
authRouter.post('/signin' , singinController)
authRouter.post('/google/signin' , googleSigninController)

export default authRouter