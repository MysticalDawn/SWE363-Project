import express from "express";
// const { User } = require("../model/UserMdle.js");
import { UserModel } from "../model/UserMdle.js";
// const Token = require("../models/token");
// import { Signup } from "./pages/signup.jsx";
// const crypto = require("crypto");
import crypto from "crypto";
// const sendEmail = require("../utils/sendEmail");
import { sendEmail } from "../utils/sendEmail.js";
// const Joi = require("joi");
// import { Joi } from "joi";
// const passwordComplexity = require("joi-password-complexity");
// import { passwordComplexity } from "joi-password-complexity";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { useCookies } from "react-cookie";
// const router = express.Router();
// const [_, setCookies] = useCookies("token");
// setCookies("token", response.data.token);
// window.localStorage.setItem("userID", response.data.userId);
const router = express.Router();

// send password link
router.post("/", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await UserModel.findOne({ userId: user._id });

    const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
    await sendEmail(user.email, "Password Reset", url);

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await jwt.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//  set new password
router.post("/:id/:token", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await jwt.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export { router as PasswordReset };
