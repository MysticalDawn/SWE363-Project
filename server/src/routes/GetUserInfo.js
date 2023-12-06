import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req,res)=> {
    const token = req.headers['authorization'].split(' ')[1];
    const userId = jwt.decode(token).id;
    const user = await mongoose.model("User").findOne({_id: userId});
    res.json(user)
})

export {router as GetUserInfo}