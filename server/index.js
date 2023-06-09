const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.js");
const savesRoutes = require("./routes/saves");
const errorHandler = require("./middleware/errorHandler");

// CONFIGURATIONS
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CONNECT_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.p5unwig.mongodb.net/weekend-saves?retryWrites=true&w=majority`;
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATHC,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/saves", savesRoutes);

// MIDDLEWARES
//Error Handler
app.use(errorHandler);

mongoose
  .connect(MONGO_CONNECT_URL)
  .then(() => {
    app.listen(PORT || 6060, () => {
      console.log(`Server running on PORT ${PORT || 6060}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
