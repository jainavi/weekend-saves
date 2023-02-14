const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.js");

// CONFIGURATIONS
const app = express();
dotenv.config();
const PORT = process.env.port;
const MONGO_USERNAME = process.env.mongo_username;
const MONGO_PASSWORD = process.env.mongo_password;
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
