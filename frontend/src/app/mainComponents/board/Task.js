import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Popup from "reactjs-popup";
import TaskInfo from "../pages/TaskInfo";
import EditIcon from "@mui/icons-material/Edit";
import DeletePrompt from "../Helpers/deletePopup";

function TaskInput({
  taskDiv,
  title,
  setCurrentBoard,
  id,
  close,
  openTaskCard,
  socket,
  currentBoardIId,
  columnData,
  theme,
}) {
  function editingTask(prop, value, taskId) {
    if (value.length < 1) return null;
    setCurrentBoard((prev) => {
      return {
        ...prev,
        columns: [
          ...prev.columns.map((col) => ({
            ...col,
            tasks: [
              ...col.tasks.map((task) => ({
                ...task,
                [prop]: task.id == taskId ? value : task.title,
              })),
            ],
          })),
        ],
      };
    });
  }
  const [taskTitle, setTaskTitle] = React.useState(title);
  const inputRef = React.useRef(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  return (
    <div
      style={{
        position: "relative",
        left: taskDiv.current.x,
        top: taskDiv.current.y,
        display: "flex",
        gap: "20px",
      }}
    >
      <DeletePrompt
        title={title}
        type="task"
        isPopUpOpen={isDeleteOpen}
        setPopUpOpen={setIsDeleteOpen}
        onDelete={() => {
          socket.emit("deleteTask", id, columnData._id, currentBoardIId);
          close();
        }}
        theme={theme}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          ref={inputRef}
          className="taskInput"
          style={{
            width: taskDiv.current.width,
            height: "60px",
          }}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              socket.emit(
                "editTask",
                "title",
                id,
                columnData._id,
                currentBoardIId,
                e.target.value
              );
              close();
            }
          }}
          maxlength={20}
        />
        <button
          className="tw-text-white tw-mt-2"
          onClick={(e) => {
            socket.emit(
              "editTask",
              "title",
              id,
              columnData._id,
              currentBoardIId,
              inputRef.current.value
            );
            close();
          }}
        >
          Save
        </button>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <button
          className=" tw-text-white tw-p-1 tw-border-2 tw-border-spacialPurple"
          onClick={() => {
            openTaskCard(true);
            close();
          }}
        >
          Open Task
        </button>
        <button
          onClick={() => {
            setIsDeleteOpen(true);
          }}
          className=" tw-text-white tw-p-1 tw-border-2 tw-border-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default function Task(props) {
  const [isPopUpOpen, setPopUpOpen] = React.useState(false);
  const taskDiv = React.useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  React.useEffect(() => {
    let div = document
      .getElementById(props.taskData._id)
      .getBoundingClientRect();
    taskDiv.current = {
      x: div.x,
      y: div.y,
      width: div.width,
      height: div.height,
    };
  });
  return (
    <Draggable
      draggableId={`${props.taskData._id}`}
      type="tasks"
      index={props.taskIndex}
      key={props.taskData._id}
    >
      {(taskDraggableProvider) => {
        return (
          <div
            id={props.taskData._id}
            className="child iconContainer"
            ref={taskDraggableProvider.innerRef}
            {...taskDraggableProvider.dragHandleProps}
            {...taskDraggableProvider.draggableProps}
            style={{
              ...taskDraggableProvider.draggableProps.style,
            }}
            onClick={() => setPopUpOpen(true)}
          >
            <span className=" tw-text-white">{props.taskData.title}</span>
            <div
              className="iconDiv tw-text-primColor"
              onClick={(event) => {
                event.stopPropagation(); // Prevent the click event from bubbling up to the div
              }}
            >
              {
                //quick edit popup
              }
              <Popup
                trigger={<EditIcon className="icon" />}
                modal
                nested
                overlayStyle={{ display: "block" }}
              >
                {(close) => (
                  <TaskInput
                    taskDiv={taskDiv}
                    id={props.taskData._id}
                    title={props.taskData.title}
                    setCurrentBoard={props.setCurrentBoard}
                    close={close}
                    openTaskCard={setPopUpOpen}
                    socket={props.socket}
                    columnData={props.columnData}
                    currentBoardIId={props.currentBoardIId}
                    theme={props.theme}
                    DeletePrompt={DeletePrompt}
                  />
                )}
              </Popup>
            </div>
            <Popup
              open={isPopUpOpen}
              onClose={() => setPopUpOpen(false)}
              closeOnDocumentClick
              modal
              nested
            >
              {(close) => (
                <div className={`model tw-bg-asideBG ${props.theme.current}`}>
                  <TaskInfo
                    taskData={props.taskData}
                    columnData={props.columnData}
                    currentBoardIId={props.currentBoardIId}
                    socket={props.socket}
                    id={props.taskData._id}
                    title={props.taskData.title}
                    description={props.taskData.description}
                    subTasks={props.taskData.subTasks}
                    setCurrentBoard={props.setCurrentBoard}
                    taskPopupClose={close}
                    theme={props.theme}
                    DeletePrompt={DeletePrompt}
                    close={close}
                  />
                </div>
              )}
            </Popup>
          </div>
        );
      }}
    </Draggable>
  );
}
