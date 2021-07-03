import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
    username: String,
    email: String,
    password: String,
  })
);

export default User;
