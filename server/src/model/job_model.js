import { Decimal128, Double } from "mongodb";
import { mongoose } from "mongoose";

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    unique: true,
  },
  companys_email: {
    type: String,
    required: true,
  },
  companys_logo: {
    type: String,
  },
  location: {
    type: String,
    require: true,
  },
  rating_score: {
    type: Number,
    require: true,
  },
  rating_count: {
    type: Number,
    require: true,
  },
  majors: [
    {
      type: String,
    },
  ],
});

export const JobModel = mongoose.model("Job", JobSchema);
