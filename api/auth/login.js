import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { connectToDatabase } from "../../utils/db";
import User from "../../models/User";
import basicMiddleware from "../../middleware/basic";

/**
 * Login Function
 *
 * @param {object} req
 * @param {object} res
 * @returns response object depending on login status
 */
const login = async (req, res) => {
  await connectToDatabase();
  const { body } = req;
  if (!req.body) {
    return res.json({ message: `NO BODY!`, body });
  }

  try {
    await checkIfInputIsValid(body);
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User with that e-mail does not exist." });
    }

    const token = await comparePassword(body.password, user.password, user._id);

    res.status(200).json({ token, user });
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

async function comparePassword(eventPassword, userPassword, userId) {
  const match = await bcrypt.compare(eventPassword, userPassword);

  if (!match) {
    throw new Error("The credentials do not match.");
  }

  return signToken(userId);
}

function signToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}

function checkIfInputIsValid(eventBody) {
  if (!(eventBody.password && eventBody.password.length >= 7)) {
    throw new Error(
      "Password error. Password needs to be longer than 8 characters."
    );
  }

  if (!(eventBody.email && typeof eventBody.email === "string"))
    throw new Error("Email error. Email must have valid characters.");
}

export default basicMiddleware(login);
