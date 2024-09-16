const mongoose = require("mongoose");

const profilSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  pseudo: {
    type: String,
    required: true,
  },
});

const Profil = mongoose.model("profils", profilSchema);
module.exports = Profil;
