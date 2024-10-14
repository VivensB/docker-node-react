import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const app = express();

// Enable CORS for requests from localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

const PORT = process.env.PORT || 4500;

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

app.post("/add-employee", async (req, res) => {
  try {
    const { firstName, lastname, email, gender, phone_number, dateOfBirth } =
      req.body;
    if (
      !firstName ||
      !lastname ||
      !email ||
      !gender ||
      !phone_number ||
      !dateOfBirth
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastname,
        email,
        gender,
        phone_number,
        dateOfBirth: new Date(dateOfBirth),
      },
    });
    res.status(201).json({ success: true, employee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
