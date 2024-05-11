const usersModel = require("../../Schems/user");
const boardModel = require("../../Schems/board");
const invitation = require("../../Schems/Invitation");
const {
  CheckIsMember,
  inviteHelper,
  getSenderAndBoardNames,
  kickUser,
  leaveBoard,
} = require("../../utils/helpers");
const sockets = require("./socketsOnline");

module.exports = (io, socket, user) => {
  socket.on("getUsers", async (boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      const { users } = board;
      socket.emit("getUsers", users);
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("inviteUser", async (boardId, userEmail) => {
    try {
      let invitedUser = await usersModel.findOne({ email: userEmail });
      if (!invitedUser) throw new Error("user isn't registerd");
      let board = await inviteHelper(boardId, user, invitedUser._id);
      if (!board) throw new Error("Can't find Board");

      let isInvited = await invitation.findOne({
        board: board.id,
        recipient: invitedUser.id,
        status: "pending",
      });
      if (isInvited) throw new Error("user already invited");
      let newInvite = new invitation({
        sender: user.id,
        recipient: invitedUser.id,
        recipientEmail: userEmail,
        board: board.id,
      });
      await newInvite.save();
      io.to(board.id).emit("boardInvitationsUpdate");
      sockets[invitedUser.id].emit("userInvitationsUpdate");

      // sockets[user._id.valueOf()]
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
  socket.on("getBoardInvitations", async (boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) throw new Error("Can't find Board");
      let invites = await invitation.find({
        board: board.id,
        status: "pending",
      });
      // let { id } = invites;
      socket.emit("getBoardInvitations", invites);
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
  socket.on("getUserInvitations", async () => {
    try {
      let invites = await invitation.find({
        recipient: user.id,
        status: "pending",
      });
      // let { id } = invites;
      invites = await Promise.all(
        invites.map((invite) =>
          getSenderAndBoardNames(invite.sender, invite.board, invite.id)
        )
      );
      invites = invites.filter((invite) => invite);
      socket.emit("getUserInvitations", invites);
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
  socket.on("acceptInvite", async (inviteId) => {
    try {
      let invite = await invitation.findOne({
        _id: inviteId,
      });
      if (!invite) throw new Error("can't find invite");
      const user = await usersModel.findById(invite.recipient);
      if (!user) throw new Error("can't find user");
      const board = await boardModel.findById(invite.board);
      if (!board) throw new Error("can't find board");

      board.users.push({
        _id: user._id,
        name: user.fname,
        role: "member",
      });
      user.boards.push({ id: board.id, title: board.title });
      invite.status = "accepted";
      await user.save();
      await board.save();
      await invite.save();
      socket.emit("boardCreated", board.id, user);
      socket.emit("userInvitationsUpdate");
      io.to(board.id).emit("boardInvitationsUpdate");
      io.to(board.id).emit("membersUpdate");
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("declineInvite", async (inviteId) => {
    try {
      let invite = await invitation.findOne({
        _id: inviteId,
      });
      if (!invite) throw new Error("can't find invite");

      invite.status = "declined";
      await invite.save();
      await socket.emit("userInvitationsUpdate");
      io.to(invite.board).emit("boardInvitationsUpdate");
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("kickUser", async (boardId, userId) => {
    try {
      await kickUser(boardId, user, userId);
      io.to(boardId).emit("membersUpdate");
      sockets[userId].emit("boardDeleted");
    } catch (error) {
      console.log(error);
      socket.emit("error", error.message);
    }
  });
  socket.on("leaveBoard", async (boardId) => {
    try {
      await leaveBoard(boardId, user);
      io.to(boardId).emit("membersUpdate");
      socket.emit("boardDeleted");
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("userBoardsReorder", async (d) => {
    try {
      let [deletedColumn] = user.boards.splice(d.source.index, 1);
      user.boards.splice(d.destination.index, 0, deletedColumn);
      user = await user.save();
      socket.emit("userUpdate", user);
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
};
