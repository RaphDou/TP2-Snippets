"use strict";

exports.logErrors = (err, req, res, next) => {
  console.error(`Il y a une erreur ! ${err.stack}`);
  res.status(500).send(`Quelque chose ne fonctionne pas!`);
};

exports.get404 = (req, res) => {
  res
    .status(404)
    .render('404', { pageTitle: 'Page introuvable !' });
};
