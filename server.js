import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import imageRouter from "./routes/image_routes.js"
import authRouter from "./routes/auth_route.js"
import cookieParser from "cookie-parser"
import projectRouter from "./routes/project_routes.js"

dotenv.config()

const app =express()

// app.use(
//   cors({
//     origin: "https://hackathon-frontend-chi-two.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://hackathon-frontend-chi-two.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT= process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Database Connected"))
.catch(()=>console.log("Database Connection Error"))

app.use("/api/image" , imageRouter)
app.use("/api/auth" , authRouter)
app.use("/api/project" , projectRouter)

app.use("/" , (req , res )=>{
    res.send("server is uppp")
})

app.listen(PORT , ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})