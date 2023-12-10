import express from "express";
import { JobModel } from "../model/job_model.js";
const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const data = await JobModel.find();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

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
router.post("/modifyReviews", async (req, res) => {
  try {
    const { starRating, company } = req.body;
    console.log(starRating);
    const data = await JobModel.findOne({company})
    const newRatingCount = data.rating_count+1;
    const newRatingScore = Math.round(((data.rating_score*data.rating_count+starRating)/newRatingCount)*10)/10;
    const updatedJob = await JobModel.findOneAndUpdate(
        { company },
        { rating_count: newRatingCount, rating_score: newRatingScore },
        { new: true }
      );

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as JobRouter };
