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
});

export const UserModel = mongoose.model("Users", UserSchema);
