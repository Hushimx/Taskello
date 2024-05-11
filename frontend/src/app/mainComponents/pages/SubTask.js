import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SubTask({
  socket,
  subTask,
  taskId,
  columnId,
  BoardId,
}) {
  return (
    <div className="subTask">
      <label className="checkBox">
        <input
          type="checkbox"
          checked={subTask.isChecked}
          onChange={() => {
            socket.emit("checkSubTask", subTask._id, taskId, columnId, BoardId);
          }}
        />
        <span className="checkmark"></span>
      </label>
      {subTask.title}
      <div
        className="deleteIconContainer"
        onClick={() => {
          socket.emit("deleteSubTask", subTask._id, taskId, columnId, BoardId);
        }}
      >
        <DeleteIcon className="deleteIcon" />
      </div>
    </div>
  );
}
