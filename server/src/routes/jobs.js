import express from "express";
import {JobModel} from "../model/job_model";
const router = express.Router();

router.get("/jobs/data", async (req,res)=> {
    try{
        const data = await JobModel.find();
        res.json(data)
    }
    catch (err){
        console.log(err)
    }
})