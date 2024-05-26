// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Routes & middleware
const userRoute = require("./routes/userRoute");
const campaignRoute = require("./routes/campaignRoute");
const errorHandler = require("./middleware/errorHandler");

// APP
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Express  is running");
});
app.use("/users", userRoute);
app.use("/campaigns", campaignRoute);

// Error handler last middleware
app.use(errorHandler);

// Listen
const server = app.listen(port, () => console.log(`⭐️ Server ready at: http://localhost:${port}`));
