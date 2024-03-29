"use strict";

require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env

const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");
const errorController = require("./controllers/errorController");

// Configuration for EJS template
app.set("view engine", "ejs");
// Declare the views folder containing the templates
// app.set('views', 'views');

// Declare the public folder containing static files
app.use(express.static(path.join(__dirname, "public")));

// Declaration of a parser to parse the body of an incoming request with POST
// Allows to parse
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Using routes as middleware
// route /
app.use(indexRoutes);

// Error handling
app.use(errorController.logErrors);

// 404 error handling
app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_CLUSTER
    }/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection to the database established");
    app.listen(3000, () => {});
  })
  .catch((err) => {
    console.log("Connection to the database failed", err);
  });
