import jwt from "jsonwebtoken";
import { User } from "./../models/user.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Invalid token");
    const decodedObj = jwt.verify(token, "dev@Tinder$0112");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
};
