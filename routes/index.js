"use strict";

const express = require("express");
const router = express.Router();
const snippetsController = require("../controllers/snippetsController");

// / => GET
router.get("/", snippetsController.getSnippets);

// /snippet/`snippetId => GET
router.get("/snippet/:snippetId", snippetsController.getSnippet);

// /add-snippet => GET
router.get("/add-snippet", snippetsController.getAddSnippet);

router.post("/add-snippet", snippetsController.createSnippet);

router.get("/edit-snippet/:snippetId", snippetsController.getEditSnippet);

router.post("/edit-snippet", snippetsController.updateSnippet);

router.get("/delete/:snippetId", snippetsController.deleteSnippet);

router.get("/tag/:tag", snippetsController.getSnippetsByTag);

module.exports = router;
