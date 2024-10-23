import { Router } from "express";
import { userAuth } from "./../middlewares/auth.js";
import {
  validateProfileEditData,
  validatePasswordUpdateData,
} from "../utils/validation.js";
import bcrypt from "bcrypt";

const profileRouter = Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileEditData(req);
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save();
    res.json({ message: "Profile updated successfully!", data: loggedInUser });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    await validatePasswordUpdateData(req);
    const loggedInUser = req.user;
    const { newPassword } = req.body;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

export default profileRouter;
