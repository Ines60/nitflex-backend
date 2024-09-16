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
    });

    await newProfil.save();

    res.json({ result: true, newProfil });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
