var express = require("express");
var router = express.Router();
const Profil = require("../models/profil");
const User = require("../models/user");

router.post("/signupProfil", async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    const newProfil = new Profil({
      user: user._id,
      pseudo: req.body.pseudo,
      avatarSeed: req.body.avatarSeed,
    });

    await newProfil.save();

    res.json({ result: true, newProfil });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const profil = await Profil.find().populate("user");
    if (!profil) throw new Error("No profil found");
    res.json({ result: true, profil });
  } catch (err) {
    res.json({ reslult: false, error: err.message });
  }
});

router.delete("/deleteProfil", async (req, res) => {
  try {
    // On récupère l'utilisateur en fonction du token (ou un autre critère)
    const user = await User.findOne({ token: req.body.token });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    // Vérifier si un profilId a été fourni dans la requête
    const profilId = req.body.profilId;
    if (!profilId) {
      return res.json({ result: false, error: "Profil ID is required" });
    }

    // Suppression du profil correspondant à l'utilisateur
    const profil = await Profil.findOneAndDelete({
      _id: profilId,
      user: user._id,
    });

    // Vérifier si le profil existe et a été supprimé
    if (!profil) {
      return res.json({
        result: false,
        error: "Profil not found or already deleted",
      });
    }

    res.json({ result: true, message: "Profil deleted successfully" });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
