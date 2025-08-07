const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config/env");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Bookstore API",
    version: "2.0.0",
    endpoints: {
      books: "/api/books",
      users: "/api/users",
    },
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
