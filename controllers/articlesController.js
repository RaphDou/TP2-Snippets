"use strict";

// Récupère le modèle Article
const Article = require('../models/article');


// Utilise la méthode find() afin de récupérer tous les articles
// Retourne un Promesse
exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.render('index', {
        articles: articles,
        pageTitle: 'Accueil'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

// Récupère un article grâce à son id
exports.getArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findById(articleId)
    .then(article => {
      res.render('article', {
        article: article,
        pageTitle: 'Article'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.getAddArticle = (req, res, next) => {
  res.render('add-article', {
    pageTitle: "Ajouter un article",
    errorMessage: null
  })
};

exports.createArticle = (req, res, next) => {
  const { title, content, tags, url } = req.body

  const article = new Article({
    title: title,
    content: content,
    tags: tags,
    url: url
  });

  article.save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      return res.render('add-article', {
        pageTitle: "Ajouter un article",
        errorMessage: err.errors
      })
    })
}


exports.getEditArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findById(articleId)
    .then(article => {
      res.render('edit-article', {
        pageTitle: "Modifier l'article",
        article: article,
        errorMessage: null
      })
    })
    .catch(err => {
      console.log('err', err)
    })
}


exports.updateArticle = (req, res, next) => {
  const { articleId, title, content, tags, url } = req.body

  Article.findById(articleId)
    .then(article => {
      article.title = title;
      article.content = content;
      article.tags = tags;
      article.url = url;
      return article.save()
    })
    .then(result => {
      res.redirect('/')
    })
    .catch(err => {
      return res.render('edit-article', {
        pageTitle: "Modifier l'article",
        errorMessage: err.errors,
        article: {
          _id: articleId,
          title: title,
          content: content,
          tags: tags,
          url: url
        }
      })
    })
}

exports.deleteArticle = (req, res, next) => {
  const articleId = req.params.articleId

  Article.findByIdAndRemove(articleId)
    .then(_ => {
      res.redirect("/")
    })
    .catch(err => {
      console.log('err', err)
    })
}
