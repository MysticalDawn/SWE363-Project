
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
    console.log("final")
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = jwt.decode(token).id;
  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  delete user.password;
  if(user.tempToken != null){
    delete user.tempToken;
  }
  const profilePicUrl = user.profile_pic ? `http://localhost:3001${user.profile_pic}` : null;
  const cvUrl = user.CV ? `http://localhost:3001${user.CV}` : null;
  const info = {
    email: user.email,
    name: user.name,
    major: user.major,
    phone:user.phone,
    city:user.city,
    _id: user._id,
    profile_pic: profilePicUrl,
    cv: user.CV
  };

  return res.json(info);

});

export { router as GetUserInfo };
