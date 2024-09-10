const mongoose = require("mongoose");

const likeSchema = mongoose.schema({
  user: {
    type: mongoose.Schema.Types.ObjectifId,
    ref: "users",
    required: true,
    unique: true,
  },

  favorite: String,

  like: String,

  dislike: String,
});

const like = mongoose.model("likes", likeSchema);

module.exports = like;
