import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import path from 'path';
import { UserRouter } from "./routes/Users.js";
import { JobRouter } from "./routes/jobs.js";
import { GetUserInfo } from "./routes/GetUserInfo.js";
import { ReviewRouter } from "./routes/review.js";
import { UploadRouter } from "./routes/upload.js";
import { UpdateUserRouter } from "./routes/updateUser.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", UserRouter);
app.use("/jobs", JobRouter);
app.use("/GetUserInfo", GetUserInfo)
app.use("/reviews", ReviewRouter)
app.use("/upload", UploadRouter);
app.use("/update",UpdateUserRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, ))
app.use('/assets', express.static(path.join(__dirname, 'routes','assets')));
mongoose.connect(
  "mongodb+srv://mystical:123@swe363.lzyffx0.mongodb.net/swe363?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(3001, () => {
  console.log("Server started");
});
