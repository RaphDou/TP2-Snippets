"use strict";

exports.logErrors = (err, req, res, next) => {
  console.error(`An error occurred! ${err.stack}`);
  res.status(500).send(`Something went wrong!`);
};

exports.get404 = (req, res) => {
  res.status(404).render("404", { pageTitle: "404" });
};
