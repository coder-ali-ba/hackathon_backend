import cloudinary from "../configs/cloudinary_config.js";
import streamifier from "streamifier"

 const uploadImageController = async(req , res)=>{
    const file=req.file
    // console.log(file);
    try {
        if(!file){
            return res.status(400).json({
                success: false,
                message: "file not found"
            })
        }
        const uploadStream = cloudinary.uploader.upload_stream(
            async(error , result)=>{
                if(error){
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error"
                    })
                }

                res.status(200).json({
                    success: true,
                    message: "image uploaded successfully",
                    imageUrl: result.secure_url
                })
            }
        )
        streamifier.createReadStream(file.buffer).pipe(uploadStream)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Imaage not uploaded"
        })
    }
    
}

export default uploadImageController


