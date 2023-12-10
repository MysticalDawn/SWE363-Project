import express from "express";
import {ReviewModel} from "../model/review_model.js";
const router = express.Router();

router.post("/post", async (req, res) => {
    try {
      const { id, user_mail, username, user_major, rating, review_text, company } = req.body;
  
      const newReview = new ReviewModel({
        id,
        user_mail,
        username,
        user_major,
        rating,
        review_text,
        company
      });
  
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(500).json({ message: "Failed to post the review" });
    }
  });
  router.get("/data/:company", async (req, res) => {
    try {
      const companyName = req.params.company;
      const reviews = await ReviewModel.find({ company: companyName });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve company reviews" });
    }
  });
  
  export { router as ReviewRouter };
