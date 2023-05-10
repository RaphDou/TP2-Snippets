"use strict";

const express = require('express');
const router = express.Router();
const snippetsController = require('../controllers/snippetsController');

// / => GET
router.get('/', snippetsController.getSnippets);

// /snippet/`snippetId => GET
router.get('/snippet/:snippetId', snippetsController.getSnippet);

// /add-snippet => GET
router.get('/add-snippet', snippetsController.getAddSnippet);

// // /add-snippet => POST
router.post('/add-snippet', snippetsController.createSnippet);

// // /edit/:snippetId => GET
router.get('/edit-snippet/:snippetId', snippetsController.getEditSnippet);

// // /edit-snippet => POST
router.post('/edit-snippet', snippetsController.updateSnippet);

// // /delete/:snippetId => GET
router.get('/delete/:snippetId', snippetsController.deleteSnippet);

// /tag/:tag => GET
router.get('/tag/:tag', snippetsController.getSnippetsByTag);

// Export des routes pour utilisation dans app.js
module.exports = router;

