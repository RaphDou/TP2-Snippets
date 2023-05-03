"use strict";

const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

// / => GET
router.get('/', articlesController.getArticles);

// /article/`articleId => GET
router.get('/article/:articleId', articlesController.getArticle);

// /add-article => GET
router.get('/add-article', articlesController.getAddArticle);

// // /add-article => POST
router.post('/add-article', articlesController.createArticle);

// // /edit/:articleId => GET
router.get('/edit-article/:articleId', articlesController.getEditArticle);

// // /edit-article => POST
router.post('/edit-article', articlesController.updateArticle);

// // /delete/:articleId => GET
router.get('/delete/:articleId', articlesController.deleteArticle);

// Export des routes pour utilisation dans app.js
module.exports = router;

