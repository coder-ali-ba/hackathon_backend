import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import imageRouter from "./routes/image_routes.js"
import authRouter from "./routes/auth_route.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app =express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT= process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Database Connected"))
.catch(()=>console.log("Database Connection Error"))

app.use("/api/image" , imageRouter)
app.use("/api/auth" , authRouter)

app.use("/" , (req , res )=>{
    res.send("server is nalbo")
})

app.listen(PORT , ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})