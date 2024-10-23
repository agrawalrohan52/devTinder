import { Router } from "express";
import { validateSignUpData } from "./../utils/validation.js";
import { User } from "./../models/user.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User successfully added");
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid credentials");
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("User logged in successfully");
    } else throw new Error("Invalid credentials");
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("User logged out successfully");
});

export default authRouter;
