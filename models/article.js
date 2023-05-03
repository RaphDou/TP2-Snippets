const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snippet', snippetSchema);

