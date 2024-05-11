require("dotenv").config();
const { httpServer } = require("./servers/express");
const io = require("./servers/socket");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var cookie = require("cookie");
const usersModel = require("./Schems/user");
const boardModel = require("./Schems/board");
const sockets = require("./sockets");
const { error } = require("console");

httpServer.listen(8000);
