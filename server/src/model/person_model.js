import { mongoose } from "mongoose";

export const PersonSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  major:{
    type:String
  },
  university:{
    type:String
  },
  profile_pic:{
    type:String,
  }
});

export const PersonModel = mongoose.model("students",PersonSchema);