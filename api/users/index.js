import { connectToDatabase } from "../../utils/db";
import User from "../../models/User";
import authMiddleware from "../../middleware/auth";

/**
 * Get all users - but only for authenticated requests!
 *
 * @param {object} req
 * @param {object} res
 * @returns all Users
 */
const getUsers = async (req, res) => {
  await connectToDatabase();

  const users = await User.find();

  res.json({ users });
};

export default authMiddleware(getUsers);
