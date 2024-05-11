const {
  CheckIsMember,
  CheckIsMemberAndOwner,
  deleteUserFromBoard,
  renameBoard,
} = require("../../utils/helpers");
const boardModel = require("../../Schems/board");
const userModel = require("../../Schems/user");

module.exports = (io, socket, user) => {
  socket.on("boardReOrder", async (d, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (board) {
        let sourceColumn = board.columns.find(
          (col) => col.id === d.source.droppableId
        );
        let sourceTask = sourceColumn.tasks.find(
          (task) => task.id === d.draggableId
        );

        let destinationColumn = board.columns.find(
          (col) => col.id === d.destination.droppableId
        );
        let [df] = sourceColumn.tasks.splice(d.source.index, 1);
        destinationColumn.tasks.splice(d.destination.index, 0, sourceTask);
        await board.save();
        const { id, title, columns, background } = board;
        io.to(board.id).emit("boardUpdate", { id, title, columns, background });
      }
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("createBoard", async (board) => {
    const { title, columns } = board;
    try {
      const newBoard = new boardModel({ title: title, columns: columns });
      newBoard.users.push({
        _id: user._id,
        name: user.fname,
        role: "owner",
      });
      await newBoard.save();
      user.boards.push({ id: newBoard.id, title: newBoard.title });
      await user.save();
      let userUpdate = await userModel.findOne({ _id: user.id });
      if (!userUpdate) throw new Error("Can't update data");
      console.log(userUpdate, 22222222222);
      let { _id, boards, email, fname, invites } = userUpdate;
      socket.emit("boardCreated", newBoard.id, {
        _id,
        boards,
        email,
        fname,
        invites,
      });
      socket.emit("sucess", "Board Create Successfully");
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
  socket.on("editBoardName", async (boardId, newData) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      board["title"] = newData;
      await board.save();
      await Promise.all(
        board.users.map(async (userEntity) => {
          try {
            await renameBoard(boardId, userEntity._id, newData);
          } catch (error) {
            socket.emit("error", error.message);

            // Handle error if needed
          }
        })
      );
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
      io.to(board.id).emit("userChanged");
    } catch (error) {
      socket.emit("error", error);
    }
  });
  socket.on("deleteBoard", async (boardId) => {
    try {
      let board = await CheckIsMemberAndOwner(boardId, user);
      const { id } = board;
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }
      await Promise.all(
        board.users.map(async (user) => {
          try {
            await deleteUserFromBoard(boardId, user._id);
          } catch (error) {
            socket.emit("error", error.message);

            // Handle error if needed
          }
        })
      );
      await boardModel.deleteOne({ _id: boardId });
      io.to(id).emit("boardDeleted");
      socket.emit("sucess", "Board has been deleted Successfully");
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
};
