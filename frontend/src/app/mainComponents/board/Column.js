import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { EditText, EditTextarea } from "react-edit-text";
import Task from "./Task";
import useGetId from "../../Hooks/useId";
import TaskInput from "../Helpers/newTaskInput";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import DeletePrompt from "../Helpers/deletePopup";

export default function Column({
  columnData,
  columnIndex,
  setCurrentBoard,
  socket,
  currentBoardIId,
  theme,
}) {
  const [newId] = useGetId();
  const [showTaskinput, setShowTaskInput] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  return (
    <Draggable
      draggableId={`${columnData._id}`}
      type="columns"
      index={columnIndex}
      key={`${columnData._id}`}
    >
      {(ColumnDraggableProvider) => {
        return (
          <div
            className="parent"
            ref={ColumnDraggableProvider.innerRef}
            {...ColumnDraggableProvider.draggableProps}
          >
            <DeletePrompt
              title={columnData.title}
              type="column"
              isPopUpOpen={isDeleteOpen}
              setPopUpOpen={setIsDeleteOpen}
              onDelete={(close) => {
                socket.emit("deleteColumn", columnData._id, currentBoardIId);
                close();
              }}
              theme={theme}
            />

            <div
              className="columnInfo iconContainer tw-mb-3 tw-z-50 "
              style={{ display: "flex", gap: "2px" }}
              {...ColumnDraggableProvider.dragHandleProps}
            >
              <div className=" tw-flex tw-gap-2 tw-cursor-pointer">
                <EditText
                  className="tw-text-primColor tw-min-w-5 tw-w-fit tw-me-2"
                  inputClassName="taskInput tw-w-36 tw-text-sm tw-h-8 "
                  placeholder={columnData.title}
                  defaultValue={columnData.title}
                  onSave={(e) => {
                    if (e.value.length >= 1) {
                      socket.emit(
                        "editColumn",
                        columnData._id,
                        currentBoardIId,
                        e.value
                      );
                    }
                  }}
                />
                <span className=" tw-text-primColor">
                  ({` ${columnData.tasks.length} `})
                </span>
              </div>
              <div
                className="iconDiv tw-text-primColor"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent the click event from bubbling up to the div
                }}
              >
                <Menu
                  menuButton={
                    <MoreVertIcon className=" tw-text-primColor tw-cursor-pointer" />
                  }
                  className="tw-bg-red-50 "
                  direction="bottom"
                  align={"center"}
                >
                  <div className=" tw-w-32 tw-bg-boardBG tw-text-primColor mt-2 tw-shadow-2xl tw-p-4">
                    <MenuItem
                      className=" tw-text-red-500 tw-cursor-pointer  tw-duration-300"
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      Delete
                    </MenuItem>
                  </div>
                </Menu>
              </div>
            </div>
            <Droppable
              droppableId={`${columnData._id}`}
              index={columnIndex}
              direction="vertical"
              type="tasks"
            >
              {(tasksDroppableProvider) => {
                return (
                  <div
                    className="dropArea tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-32"
                    ref={tasksDroppableProvider.innerRef}
                    {...tasksDroppableProvider.droppableProps}
                    {...tasksDroppableProvider.droppableProps}
                  >
                    {columnData.tasks
                      .filter((task) => task !== null)
                      .map((taskData, taskIndex) => {
                        return (
                          <>
                            <Task
                              columnData={columnData}
                              taskData={taskData}
                              taskIndex={taskIndex}
                              currentBoardIId={currentBoardIId}
                              setCurrentBoard={setCurrentBoard}
                              socket={socket}
                              theme={theme}
                            />
                          </>
                        );
                      })}
                    {tasksDroppableProvider.placeholder}
                    {showTaskinput && (
                      <TaskInput
                        setShowTaskInput={setShowTaskInput}
                        columnId={columnData._id}
                        currentBoardIId={currentBoardIId}
                        socket={socket}
                      />
                    )}
                  </div>
                );
              }}
            </Droppable>
            {!showTaskinput && (
              <div
                className=" tw-text-primColor"
                onClick={() => setShowTaskInput(true)}
              >
                Add new Task +
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
