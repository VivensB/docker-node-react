import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4500;

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
