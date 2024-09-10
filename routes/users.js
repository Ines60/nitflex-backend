var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) throw new Error("User already exist");

    const newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      token: uid2(32),
    }).save();
    res.json({ result: true, newUser });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ result: true, users });
  } catch (err) {
    res.json({ result: false, error: err.message });
  }
});

module.exports = router;
