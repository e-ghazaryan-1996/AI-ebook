import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists!"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{3,20}$)(?!.*[_.]{2})[a-zA-Z0-9_.]+$/,
      "Username is invalid it should contain 3 - 20 alphanumeric letters and be unique.",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
