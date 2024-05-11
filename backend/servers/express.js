require("dotenv").config({ path: "../.env" });
const express = require("express");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes

const register = require("../Routes/register");
const login = require("../Routes/login");
// const boards = require("../Routes/board");

// http server
const app = express();
const httpServer = createServer(app);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/download", express.static(__dirname + "/../public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/register", register);
app.use("/login", login);
// app.use("/board", boards);

app.all("/test", async (req, res) => {
  let decoded = await jwt.verify(req.cookies.token, process.env.secretKey);
  let expireTime = decoded.exp * 1000 - new Date().getTime();
  if (Math.floor(expireTime / 1000 / 60) < 30) {
  }
});
app.get("/logout", (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token");
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

module.exports = { app, httpServer };
