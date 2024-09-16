const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  wishList: [{ type: String }],
  view: [{ type: String }],
  like: [{ type: String }],
  dislike: [{ type: String }],
});

const Like = mongoose.model("likes", likeSchema);
module.exports = Like;
