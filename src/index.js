// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

// Routes & middleware
const userRoute = require("./routes/userRoute");
const campaignRoute = require("./routes/campaignRoute");
const articleRoute = require("./routes/articleRoute");
const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");

// APP
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Express  is running");
});
app.use("/users", userRoute);
app.use("/campaigns", campaignRoute);
app.use("/articles", articleRoute);
app.use("/auth", authRoute);

// Error handler last middleware
app.use(errorHandler);

// Listen
const server = app.listen(port, () => console.log(`⭐️ Server ready at: http://localhost:${port}`));
