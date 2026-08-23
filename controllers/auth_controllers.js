import studentModel from "../models/student_models.js";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  const { name, email, number, password, city, skills, userType, imageUrl } =
    req.body;
  try {
    if (
      !name ||
      !email ||
      !number ||
      !password ||
      !imageUrl ||
      !city ||
      !userType
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete Required Fields",
      });
    }

    const checkEmail = await studentModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Student Email Already Exists",
      });
    }

    const hashPass = await brcypt.hash(password, 10);
    const registerUser = await studentModel.create({
      name,
      email,
      number,
      password: hashPass,
      skills,
      userType,
      city,
      imageUrl,
    });

    res.status(200).json({
      succes: true,
      message: "Student registered Successfylly",
      data: registerUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error
    });
  }
};

const singinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Incomplete required fields",
      });
    }

    const checkEmail = await studentModel.findOne({ email });

    if (!checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Email or password is not valid",
      });
    }

    const checkPassword = await brcypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Email or password is not valid",
      });
    }

    const token = jwt.sign({ id: checkEmail._id },  process.env.topSecret, {
        expiresIn: "7d",
      });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: checkEmail._id,
        name: checkEmail.name,
        email: checkEmail.email,
        userType: checkEmail.userType,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSigninController = async (req, res) => {
  const { credential } = req.body;

  try {
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account email not found",
      });
    }

    let user = await studentModel.findOne({ email });

    if (!user) {
      user = await studentModel.create({
        name,
        email,
        googleId,
        imageUrl: picture,
      });
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
        user.imageUrl = user.imageUrl || picture;

        await user.save();
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.topSecret,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Google Sign In Successfully",
      token: token,
      data: user,
    });
  } catch (error) {
    console.log("Google Signin Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Google credential",
    });
  }
};

export { registerController, singinController, googleSigninController };
