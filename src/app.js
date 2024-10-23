import express, { json } from "express";
import { connectDb } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

const app = express();

app.use(json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server running on port number 7777");
    });
  })
  .catch(() => console.error("Database connection failed"));
