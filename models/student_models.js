import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: String,
    password: String,
    city: String,
    skills:String,
    userType:{
      type:String,
       enum:["user" , "projectManager"]
    },
    imageUrl: String,

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
},{timestamps: true})

const studentModel = mongoose.model("students" , studentSchema);

export default studentModel