import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/Users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", UserRouter);
mongoose.connect(
  "mongodb+srv://mystical:123@swe363.lzyffx0.mongodb.net/swe363?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("Server started");
});
