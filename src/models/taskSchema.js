import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required!"],
      trim: true,
      minLength: [4, "Title must have atleast 4 characters!"],
      maxLength: [60, "Title Length Exceeded! Max Length is 60 characters "],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      minLength: [10, "Description must have atleast 10 characters!"],
    },
    dueDate: {
      type: Date,
      required: [true, "Choose date and time"],
      index: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "High",
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },
  },
  { timestamps: true },
);

taskSchema.index({ title: "text", description: "text" });

export default mongoose.model("TaskDetails", taskSchema);
