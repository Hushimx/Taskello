const { CheckIsMember } = require("../../utils/helpers");

module.exports = (io, socket, user) => {
  socket.on("createColumn", async (col, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (board) {
        board.columns.push(col);
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
  socket.on("editColumn", async (columnId, boardId, newData) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      let column = board.columns.find((col) => col.id == columnId);
      if (!column) {
        throw new Error("Column not found");
      }

      column["title"] = newData;
      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("deleteColumn", async (columnId, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      let column = board.columns.find((col) => col.id == columnId);
      if (!column) {
        throw new Error("Column not found");
      }

      board.columns = board.columns.filter((col) => col._id != columnId);
      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });

  socket.on("columnsReorder", async (d, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) throw new Error("Can't find Board");
      let sourceColumnIdx = board.columns.findIndex(
        (col) => col.id === d.draggableId
      );
      if (sourceColumnIdx === -1)
        throw new Error("Can't find column with this id");

      let [deletedColumn] = board.columns.splice(sourceColumnIdx, 1);
      if (d.destination.index > board.columns.length) {
        board.columns.push(deletedColumn);
      } else {
        board.columns.splice(d.destination.index, 0, deletedColumn);
      }
      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
};
