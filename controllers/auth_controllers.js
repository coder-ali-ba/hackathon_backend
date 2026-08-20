import studentModel from "../models/student_models.js";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken"

const registerController = async (req, res) => {
  const { name, email, number, password, imageUrl } = req.body;
  try {
    if (!name || !email || !number || !password || !imageUrl) {
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
      imageUrl,
    });

    res.status(200).json({
      succes: true,
      message: "Student registered Successfylly",
      data: registerUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const singinController = async (req , res) => {
    const {email , password} =req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Incomplete required fields"
            })
        }

        const checkEmail = await studentModel.findOne({email});

        if(!checkEmail){
            return res.status(400).json({
                success: false,
                message: "Email or password is not valid"
            })
        }

        const checkPassword = await brcypt.compare(password , checkEmail.password);
        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: "Email or password is not valid"
            })
        }

        const token = jwt.sign({id: checkEmail._id} , process.env.topSecret)

        res.status(200).json({
            success: true,
            message: "Signed In Successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


export { registerController , singinController};
