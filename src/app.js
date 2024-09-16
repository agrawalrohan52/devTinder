import express from "express";

const app = express();

app.use("/test", (req, res) => {
  res.send("devTinder test");
});

app.use("/hello", (req, res) => {
  res.send("hello devTinder");
});

app.use("/", (req, res) => {
  res.send("devTinder");
});

app.listen(7777, () => {
  console.log("Server running on port number 7777");
});
