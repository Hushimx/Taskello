const { CheckIsMember } = require("../../utils/helpers");

module.exports = (io, socket, user) => {
  socket.on("createTask", async (task, columnId, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (board) {
        let column = board.columns.find((col) => col.id == columnId);
        if (column) {
          column.tasks.push(task);
          let updatedBoard = await board.save();
          const { id, title, columns, background } = updatedBoard;
          io.to(board.id).emit("boardUpdate", {
            id,
            title,
            columns,
            background,
          });
        } else {
          throw new Error("Column not found");
        }
      } else {
        throw new Error("Board not found or user is not a member");
      }
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("tasksReorder", async (d, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) throw new Error("Can't find Board");
      let sourceColumn = board.columns.find(
        (col) => col.id === d.source.droppableId
      );
      if (!sourceColumn) throw new Error("Can't find column with this id");

      let sourceTaskIdx = sourceColumn.tasks.findIndex(
        (task) => task.id === d.draggableId
      );
      if (sourceTaskIdx === -1) throw new Error("Can't find task with this id");

      let destinationColumn = board.columns.find(
        (col) => col.id === d.destination.droppableId
      );
      if (!destinationColumn) throw new Error("Destination column not found");
      let [deletedTask] = sourceColumn.tasks.splice(sourceTaskIdx, 1);
      if (d.destination.index > destinationColumn.tasks.length) {
        destinationColumn.tasks.push(deletedTask);
      } else {
        destinationColumn.tasks.splice(d.destination.index, 0, deletedTask);
      }

      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (e) {
      socket.emit("error", e.message);
    }
  });
  socket.on("editTask", async (prop, taskId, columnId, boardId, newData) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      let column = board.columns.find((col) => col.id == columnId);
      if (!column) {
        throw new Error("Column not found");
      }

      let task = column.tasks.find((t) => t._id == taskId);
      if (!task) {
        throw new Error("Task not found");
      }

      task[prop] = newData;
      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("deleteTask", async (taskId, columnId, boardId) => {
    try {
      let board = await CheckIsMember(boardId, user);
      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      let column = board.columns.find((col) => col.id == columnId);
      if (!column) {
        throw new Error("Column not found");
      }

      let task = column.tasks.find((t) => t._id == taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      column.tasks = column.tasks.filter((task) => task._id != taskId);
      await board.save();
      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on(
    "createSubTask",
    async (taskId, columnId, boardId, subTaskTitle) => {
      try {
        const board = await CheckIsMember(boardId, user);

        if (!board) {
          throw new Error("Board not found or user is not a member");
        }

        const column = board.columns.find((col) => col.id === columnId);

        if (!column) {
          throw new Error("Column not found");
        }

        const task = column.tasks.find((t) => t._id === taskId);
        if (!task) {
          throw new Error("Task not found");
        }

        task.subTasks.push({ title: subTaskTitle, isChecked: false });

        await board.save();

        const { id, title, columns, background } = board;
        io.to(board.id).emit("boardUpdate", {
          id,
          title,
          columns,
          background,
        });
        console.log(task.subTasks);
      } catch (error) {
        socket.emit("error", error.message);
      }
    }
  );
  socket.on("checkSubTask", async (subTaskId, taskId, columnId, boardId) => {
    try {
      const board = await CheckIsMember(boardId, user);

      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      const column = board.columns.find((col) => col.id === columnId);

      if (!column) {
        throw new Error("Column not found");
      }

      const task = column.tasks.find((t) => t._id === taskId);
      if (!task) {
        throw new Error("Task not found");
      }

      const subTask = task.subTasks.find((subTask) => subTask._id == subTaskId);
      if (!subTask) {
        throw new Error("Subtask not found");
      }

      subTask.isChecked = !subTask.isChecked;
      await board.save();

      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
  socket.on("deleteSubTask", async (subTaskId, taskId, columnId, boardId) => {
    try {
      const board = await CheckIsMember(boardId, user);

      if (!board) {
        throw new Error("Board not found or user is not a member");
      }

      const column = board.columns.find((col) => col.id === columnId);

      if (!column) {
        throw new Error("Column not found");
      }

      const task = column.tasks.find((t) => t._id === taskId);
      if (!task) {
        throw new Error("Task not found");
      }

      task.subTasks = task.subTasks.filter(
        (subTask) => subTask._id != subTaskId
      );
      await board.save();

      const { id, title, columns, background } = board;
      io.to(board.id).emit("boardUpdate", { id, title, columns, background });
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
};
