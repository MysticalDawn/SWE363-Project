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

router.get("/data/:company", async (req, res) => {
    try {
      const { company } = req.params;
      const data = await JobModel.findOne({ company });
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export { router as JobRouter };
