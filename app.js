"use strict";

const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");
const errorController = require("./controllers/errorController");

// Configuration pour template EJS
app.set("view engine", "ejs");
// Déclarer le dossier views qui contient les templates
// app.set('views', 'views');

// Déclarer le dossier public qui contient les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Déclaration d'un parser pour analyser "le corps (body)" d'une requête entrante avec POST
// Permet donc d'analyser
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Utilisation des routes en tant que middleware
// route /
app.use(indexRoutes);

// gestion des erreurs
app.use(errorController.logErrors);

// gestion des erreurs 404
app.use(errorController.get404);

mongoose
  .connect("mongodb://127.0.0.1:27017/blogueTest1")
  .then(() => {
    console.log("La connexion à la base de données est établie");
    app.listen(3000, () => {
      console.log("Le serveur écoute sur le port 3000");
    });
  })
  .catch((err) => {
    console.log("La connexion à la base de données a échoué", err);
  });
