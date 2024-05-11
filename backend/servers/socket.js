require("dotenv").config({ path: "../.env" });
const { Server } = require("socket.io");
const { httpServer } = require("./express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { createApi } = require("unsplash-js");

const usersModel = require("../Schems/user");
const boardModel = require("../Schems/board");
const invitation = require("../Schems/Invitation");
const userManagement = require("./sockets/userManagement");
const boardSockets = require("./sockets/boardSockets");
const columnSockets = require("./sockets/columnSockets");
const taskSockets = require("./sockets/taskSockets");
const sockets = require("./sockets/socketsOnline");
const {
  CheckIsMember,
  deleteUserFromBoard,
  renameBoard,
  inviteHelper,
  getSenderAndBoardNames,
} = require("../utils/helpers");
const unsplash = createApi({
  accessKey: process.env.unSplachAccessKey,
});
const io = new Server(httpServer, {
  cors: {
    origin: `http://${process.env.origin}`,
    credentials: true,
  },
});

// auth using jwt stored in cookies
io.use(async (socket, next) => {
  if (socket.handshake.headers.cookie) {
    try {
      socket.cokoies = cookie.parse(socket.handshake.headers.cookie);
      if (socket.cokoies.token) {
        const jutVerify = await jwt.verify(
          socket.cokoies.token,
          process.env.secretKey
        );
        socket.userjwt = jutVerify;
        next();
      } else {
        throw error("jwt error");
      }
    } catch (e) {
      let error = new Error();
      error.data = { content: "You have to login first", error: e };
      next(error);
    }
  } else {
    let error = new Error("noCookies");
    next(error);
  }
});

io.on("connection", async (socket) => {
  try {
    const user = await usersModel.findOne({ _id: socket.userjwt.id });
    sockets[user._id.valueOf()] = socket;
    socket.on("disconnect", () => {
      delete sockets[user._id.valueOf()];
    });
    userManagement(io, socket, user);
    boardSockets(io, socket, user);
    columnSockets(io, socket, user);
    taskSockets(io, socket, user);
    socket.on("changeBoard", async (boardId) => {
      try {
        let board = await CheckIsMember(boardId, user);
        if (board) {
          const { id, title, columns, background } = board;
          socket.emit("changeBoard", { id, title, columns, background });
          socket.leaveAll();
          socket.join(board.id);
        }
      } catch (e) {
        socket.emit("error", e.message);
      }
    });
    socket.on("poolUser", async (boardId) => {
      try {
        const user = await usersModel.findOne({ _id: socket.userjwt.id });
        if (!user) throw new Error("user can't be found");
        console.log("pooled ");
        const { _id, boards, email, fname, invites } = user;
        socket.emit("userUpdate", { _id, boards, email, fname, invites });
      } catch (e) {
        socket.emit("error", e.message);
      }
    });
    socket.on("bgSearch", async (query) => {
      console.log(query);
      try {
        let photo = await unsplash.search.getPhotos({
          query: query,
          page: 1,
          perPage: 10,
          orientation: "landscape",
        });
        if (!photo.response.results.length) throw new Error("no match");
        photo.response.results = photo.response.results.map((ph) => {
          let { id, slug } = ph;
          console.log(ph);
          return { id, slug, thumb: ph.urls.thumb, full: ph.urls.full };
        });
        socket.emit("fetchBGs", photo.response.results);
      } catch (e) {
        socket.emit("error", e.message);
      }
    });
    socket.on("bgChange", async (bg, boardId) => {
      try {
        let board = await CheckIsMember(boardId, user);
        if (board) {
          console.log("worked");
          board.background = bg.full;
          await board.save();
          const { id, title, columns, background } = board;
          io.to(board.id).emit("boardUpdate", {
            id,
            title,
            columns,
            background,
          });
        } else {
          throw new Error("Board not found or user is not a member");
        }
      } catch (error) {
        socket.emit("error", error.message);
        // Emit error event or handle it in another appropriate way
      }
    });
    const { _id, boards, email, fname, invites } = user;

    socket.emit("inialPool", { _id, boards, email, fname, invites });
  } catch (e) {
    socket.disconnect(e);
  }
});

module.exports = io;
