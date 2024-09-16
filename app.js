require("dotenv").config();
require("./models/connection");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const likesRouter = require("./routes/likes");
const profilsRouter = require("./routes/profils");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/likes", likesRouter);
app.use("/profils", profilsRouter);

module.exports = app;
