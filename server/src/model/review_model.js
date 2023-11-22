import { mongoose } from "mongoose";
import PersonSchema from "person_model.js";

const ReviewSchema = new mongoose.Schema({
  review_id: {
    type: String,
    required: true,
    unique:true
  },
  reviewer: {
    type: PersonSchema,
    required: true,
  },
  company: {
    type: String,
    require: true,
  },
  rating: {
    type:Number,
    required:true
  },
  is_user_hidden: {
    type:Boolean,
    default:false
  },
  review_text: {
    type:String
  }
});

export const ReviewModel = mongoose.model("Users", ReviewSchema);
