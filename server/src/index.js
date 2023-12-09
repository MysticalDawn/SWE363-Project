import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/Users.js";
import { JobRouter } from "./routes/jobs.js";
import { GetUserInfo } from "./routes/GetUserInfo.js";
import { ReviewRouter } from "./routes/review.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", UserRouter);
app.use("/jobs", JobRouter);
app.use("/GetUserInfo", GetUserInfo)
app.use("/reviews", ReviewRouter)
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
