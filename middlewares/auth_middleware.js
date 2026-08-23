import jwt from "jsonwebtoken";
import studentModel from "../models/student_models.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Authorization header se token lo
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    // Agar header mein nahi hai to cookie check karo
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Token not found",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.topSecret
    );

    const user = await studentModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;