const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('Snippet', snippetSchema);

