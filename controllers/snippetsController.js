"use strict";

// Get the Snippet model
const Snippet = require("../models/snippet");

// Use the find() method to retrieve all snippets
// Returns a Promise
exports.getSnippets = (req, res, next) => {
  Snippet.find()
    .then((snippets) => {
      res.render("index", {
        snippets: snippets,
        pageTitle: "Home",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

// Retrieve a snippet by its id
exports.getSnippet = (req, res, next) => {
  const snippetId = req.params.snippetId;
  Snippet.findById(snippetId)
    .then((snippet) => {
      res.render("snippet", {
        snippet: snippet,
        pageTitle: "Snippet",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

exports.getAddSnippet = (_req, res) => {
  res.render("add-snippet", {
    pageTitle: "Add a Snippet",
    errorMessage: null,
  });
};

exports.createSnippet = (req, res) => {
  const { title, content, tags, url, description } = req.body;

  const tagArray = tags.split(",").map((tag) => tag.trim());

  const snippet = new Snippet({
    title: title,
    content: content,
    tags: tagArray,
    url: url,
    description: description, // Ajoutez le champ description
  });

  snippet
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      return res.render("add-snippet", {
        pageTitle: "Add a Snippet",
        errorMessage: err.errors,
      });
    });
};


exports.getEditSnippet = (req, res, next) => {
  const snippetId = req.params.snippetId;
  Snippet.findById(snippetId)
    .then((snippet) => {
      res.render("edit-snippet", {
        pageTitle: "Edit Snippet",
        snippet: snippet,
        errorMessage: null,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.updateSnippet = (req, res, next) => {
  const { snippetId, title, content, tags, url, description } = req.body;

  Snippet.findById(snippetId)
    .then((snippet) => {
      snippet.title = title;
      snippet.content = content;
      snippet.tags = tags.split(",").map((tag) => tag.trim());
      snippet.url = url;
      snippet.description = description; // Mettez à jour le champ description
      return snippet.save();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      return res.render("edit-snippet", {
        pageTitle: "Edit Snippet",
        errorMessage: err.errors,
        snippet: {
          _id: snippetId,
          title: title,
          content: content,
          tags: tags,
          url: url,
          description: description, // Assurez-vous de renvoyer également la description dans l'objet snippet
        },
      });
    });
};


exports.deleteSnippet = (req, res, next) => {
  const snippetId = req.params.snippetId;

  Snippet.findByIdAndRemove(snippetId)
    .then((_) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.getSnippetsByTag = (req, res) => {
  const tag = req.params.tag;
  Snippet.find({ tags: tag })
    .then((snippets) => {
      res.render("tag", {
        snippets: snippets,
        pageTitle: `Snippets with Tag "${tag}"`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};
