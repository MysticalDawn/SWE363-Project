import express from "express";
import {JobModel} from "../model/job_model.js";
const router = express.Router();

router.get("/data", async (req,res)=> {
    try{
        const data = await JobModel.find();
        res.json(data)
    }
    catch (err){
        console.log(err)
    }
})

export { router as JobRouter };
