import jwt from "jsonwebtoken";
import studentModel from "../models/student_models.js";

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Cookie se token check karo
    let token = req.cookies?.token;

    // 2. Agar cookie mein nahi hai to Authorization header check karo
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Token not found.",
      });
    }

    // Token verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // User find
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