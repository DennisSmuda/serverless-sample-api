const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

import basicMiddleware from "../../middleware/basic";
import { connectToDatabase } from "../../utils/db";
import User from "../../models/User";

const register = async (req, res) => {
  await connectToDatabase();

  // Check for empty body
  const { body } = req;
  if (!req.body) {
    return res.json({ message: `NO BODY!`, body });
  }

  try {
    await checkIfInputIsValid(body);

    // Check if an e-mail is already taken
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(303).json({ message: "User exists already!" });
    }

    // Create a new user with a hashed password
    const hashedPass = await bcrypt.hash(body.password, 8);
    const newUser = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPass,
    });

    const token = signToken(newUser.id);
    // Send back user + token (optional - you may want to have a "double opt-in" flow)
    return res.status(200).json({ user: newUser, token });
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};

function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}

function checkIfInputIsValid(eventBody) {
  if (!(eventBody.password && eventBody.password.length >= 7)) {
    throw new Error("Password needs to be longer than 8 characters.");
  }

  if (
    !(
      eventBody.username &&
      eventBody.username.length > 5 &&
      typeof eventBody.username === "string"
    )
  )
    throw new Error("Username needs to be longer than 5 characters");

  if (!(eventBody.email && typeof eventBody.email === "string"))
    throw new Error("Email must have valid characters.");
}

export default basicMiddleware(register);
