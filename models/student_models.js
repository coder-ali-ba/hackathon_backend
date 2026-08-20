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
    number: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
},{timestamps: true})

const studentModel = mongoose.model("students" , studentSchema);

export default studentModel