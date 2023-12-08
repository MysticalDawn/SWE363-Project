import { mongoose } from "mongoose";

const ReviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique:true
  },
  user_mail: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },
  user_major: {
    type: String,
  },
  rating: {
    type:Number,
    required:true
  },
  review_text: {
    type:String
  }
});

export const ReviewModel = mongoose.model("Users", ReviewSchema);
