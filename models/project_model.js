import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    requiredVolunteers: {
      type: Number,
      required: true,
      min: 1,
    },

    skillsRequired: {
      type: [String],
      required: true,
      default: [],
    },

    projectImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;