import { mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  major: {
    type: String,
    require: true,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  profile_pic: {
    type: String,
  },
  CV: {
    type: String,
  },
  tempToken: { type: String
  },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});

export const UserModel = mongoose.model("Users", UserSchema);
