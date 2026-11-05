import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { createTask, deleteTask, getTaskList, updateTask, updateTaskStatus } from "./controller/taskController.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connection Established");
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed", error.message);
  });

app.get("/api/tasks", getTaskList);

app.post("/api/tasks", createTask);

app.patch("/api/tasks/:id/status", updateTaskStatus);

app.put("/api/tasks/:id", updateTask);

app.delete("/api/tasks/:id", deleteTask);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
