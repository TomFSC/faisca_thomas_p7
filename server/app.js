//-----------Modules import---------
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

//Using express in app
const app = express();

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB !"))
  .catch(() => console.log("Connection Failure !"));

const corsOptions = {
  allowOrigins: "http://localhost:3000",
  allowCredentials: true,
};
//Middlewares
app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routers
//Auth Route
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);
//Posts route
const postsRoute = require("./routes/posts");
app.use("/api/posts", postsRoute);
//Static files route /images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
