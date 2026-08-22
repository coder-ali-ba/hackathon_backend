import express from "express";
import upload from "../middlewares/multer_middleware.js";
import uploadImageController from "../controllers/uploadimage_controller.js"

const imageRouter =express.Router()

imageRouter.post("/upload" , upload.single("image") , uploadImageController)

export default imageRouter