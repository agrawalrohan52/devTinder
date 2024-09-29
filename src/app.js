import express, { json } from "express";
import { connectDb } from "./config/database.js";
import { User } from "./models/user.js";

const app = express();
app.use(json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User successfully added");
  } catch (err) {
    res.status(400).send(`Error while saving the user. Error: ${err.message}`);
  }
});

connectDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server running on port number 7777");
    });
  })
  .catch(() => console.error("Database connection failed"));
