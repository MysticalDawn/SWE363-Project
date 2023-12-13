import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserModel } from "../model/UserMdle.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    jwt.verify(token, "secret"); // Use the same secret key that was used in the jwt.sign function
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = jwt.decode(token).id;
  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  delete user.password;

  const info = {
    email: user.email,
    name: user.name,
    major: user.major,
    _id: user._id,
    profile_pic: user.profile_pic,
    cv: user.CV
  };

  return res.json(info);

});

export { router as GetUserInfo };
