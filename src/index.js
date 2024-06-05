// Dependencies import
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

// Routes & middleware import
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const campaignRoute = require("./routes/campaignRoute");
const articleRoute = require("./routes/articleRoute");
const ratingRoute = require("./routes/ratingRoute");
const categoryRoute = require("./routes/categoryRoute");
const errorHandler = require("./middleware/errorHandler");

// APP
const app = express();
const port = process.env.PORT || 2024;

// Middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
// Base URL
app.get("/", (req, res) => {
  res.send(
    "Welcome to <a href='https://github.com/C624-PS010/nusatawan-api'>Nusatawan API</a>! Visit our repository for documentation.",
  );
});
// Endpoint
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/campaigns", campaignRoute);
app.use("/articles", articleRoute);
app.use("/ratings", ratingRoute);
app.use("/auth", authRoute);
app.use("/categories", categoryRoute);

// Error handler last middleware
app.use(errorHandler);

// Start server
try {
  app.listen(port, () => console.log(`⭐️ Server ready at: http://localhost:${port}`));
} catch (error) {
  console.log(error);
}
