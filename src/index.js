const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
dotenv.config();

// APP
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Express  is running");
});

// Listen
const server = app.listen(3000, () => console.log(`⭐️ Server ready at: http://localhost:${port}`));
