import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserMdle.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name, major } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists!" });
  }
  const hash_password = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email,
    password: hash_password,
    name,
    major,
  });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Email or password does not exist!" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(404)
      .json({ message: "Email or password does not exist!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.setHeader('Authorization', `Bearer ${token}`);
  res.json({ token, userID: user._id });
 });

export { router as UserRouter };
