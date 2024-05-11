// require("dotenv").config({ path: "../.env" });
// const express = require("express");
// const Router = express.Router();
// const usersModel = require("../Schems/user");
// const boardModel = require("../Schems/board");
// const jwt = require("jsonwebtoken");
// const sockets = require("../sockets");

// async function generateID() {
//   return Math.floor(new Date().getTime() + Math.random() * 100000); // Example of generating a random ID
// }
// Router.use("/", async (req, res, next) => {
//   if (req.cookies.token) {
//     try {
//       const jutVerify = await jwt.verify(
//         req.cookies.token,
//         process.env.secretKey
//       );
//       req.userjwt = jutVerify;
//       next();
//     } catch (e) {
//       res.status(401).json("you have to login first");
//     }
//   } else {
//     res.status(401).json("you have to login first");
//   }
// });
// Router.use(async (req, res, next) => {
//   if (req.originalUrl === "/board/createBoard") {
//     next();
//   } else {
//     const { boardId } = req.body;
//     try {
//       const board = await boardModel.findOne({ _id: boardId });
//       await board.save();
//       req.board = board;
//       next();
//     } catch (e) {
//       res.send({ status: "error", data: e });
//     }
//   }
// });

// Router.post("/createBoard", async (req, res) => {
//   const { title, columns } = req.body;
//   try {
//     const newBoard = new boardModel({ title: title, columns: columns });
//     const user = await usersModel.findOne({ _id: req.userjwt.id });
//     newBoard.users.push({
//       _id: req.userjwt.id,
//       role: "owner",
//     });
//     await newBoard.save();
//     user.boards.push({ id: newBoard.id, title: newBoard.title });
//     await user.save();
//     sockets[user._id.valueOf()].emit("userUpdate", user);
//     res.send(newBoard);
//   } catch (e) {
//     res.send(e);
//   }
// });

// // Router.post("/update/:id", async (req, res) => {
// //   let board = await boardModel.findOne({ _id: req.params.id });
// //   let userInBoard = board.users.find((e) => e._id === req.userjwt.id);
// //   if (userInBoard && userInBoard.role === "owner") {
// //     board.columns = req.body.column;
// //     await board.save();
// //     res.send("Board updated");
// //   }
// //   res.send(board);
// // });
// module.exports = Router;
