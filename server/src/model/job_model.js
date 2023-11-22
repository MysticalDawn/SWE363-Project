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
  location: {
    type: String,
    require: true,
  },
  majors: [
    {
      type: String,
    },
  ],
});

export const JobModel = mongoose.model("Jobs", JobSchema);
