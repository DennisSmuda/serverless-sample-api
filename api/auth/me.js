const jwt = require("jsonwebtoken");
import { connectToDatabase } from "../../utils/db";
import { getToken } from "../../utils/auth";
import authMiddleware from "../../middleware/auth";
import User from "../models/User";

/**
 * Me Query
 *
 * @param {object} req
 * @param {object} res
 * @returns user object
 */
const meQuery = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);

  const api_token = getToken(req);

  await connectToDatabase();

  try {
    var { id } = await jwt.verify(api_token, process.env.JWT_SECRET);
    const user = await User.findById(id, { password: 0 });

    // Return user
    return res.json({ user });
  } catch (error) {
    // User is not logged in
    return res.status(401).json({ error });
  }
};

export default authMiddleware(meQuery);
