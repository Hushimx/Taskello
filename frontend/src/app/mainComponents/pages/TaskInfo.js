import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditText, EditTextarea } from "react-edit-text";
import DOMPurify from "dompurify";
import SubTask from "./SubTask";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";

const TextArea = ({ TextElement, onSave, text }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(text); // Initial state for input value

  const sanitizeHtml = (html) => {
    console.log(DOMPurify.sanitize(html));
    return setInputValue(DOMPurify.sanitize(html));
  };

  return (
    <>
      <div className=" tw-text-primColor tw-text-2xl mt-3 tw-flex tw-justify-between ">
        <p>Description</p>
        {!isEditing && (
          <button
            className=" tw-text-secColor hover:tw-bg-spacialPurple tw-duration-200  "
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <ReactQuill
              value={inputValue}
              onChange={sanitizeHtml}
              style={{ backgroundColor: "white" }}
              className=""
            />
            <button
              className=" tw-text-primColor mainBtn tw-w-16 mt-2"
              onClick={() => {
                onSave(inputValue);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className=" tw-text-secColor ms-2 "
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <div
            style={{ color: "slategrey" }}
            onClick={() => {
              setIsEditing(true);
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </>
    // <>
    //   {isEditing ? (
    //     <>
    //       <ReactQuill
    //         value={inputValue}
    //         onChange={sanitizeHtml}
    //         style={{ backgroundColor: "white" }}
    //       />
    //       <button
    //         onClick={() => {
    //           onSave(inputValue);
    //           setIsEditing(false);
    //         }}
    //       >
    //         Save
    //       </button>
    //     </>
    //   ) : (
    //     <>
    //       <div
    //         className=" tw-text-white"
    //         style={{ display: "flex", justifyContent: "space-between" }}
    //       >
    //         <p>Description</p>
    //         {!isEditing && (
    //           <button
    //             className=" tw-text-white"
    //             onClick={() => {
    //               setIsEditing(true);
    //             }}
    //           >
    //             Edit
    //           </button>
    //         )}
    //       </div>
    //       <div
    //         style={{ color: "slategrey" }}
    //         onClick={() => {
    //           setIsEditing(true);
    //         }}
    //         dangerouslySetInnerHTML={{ __html: text }}
    //       />
    //     </>
    //   )}
    // </>
  );
};

function AddSubTask({ socket, taskId, columnId, BoardId }) {
  const [isCreating, setIsCreating] = React.useState(false);
  const inputRef = React.useRef(null);
  const [inputState, setInputState] = React.useState("");
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  return (
    <div className=" tw-p-4 tw-flex tw-flex-wrap gap-2  ">
      {isCreating ? (
        <>
          <input
            className=" tw-w-10/12 tw-h-10 tw-p-3 tw-rounded "
            type="text"
            placeholder="Add SubTask"
            ref={inputRef}
            value={inputState}
            onChange={(e) => {
              setInputState(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                socket.emit(
                  "createSubTask",
                  taskId,
                  columnId,
                  BoardId,
                  inputState
                );
                setInputState("");
              }
            }}
          />
          <div className=" tw-flex tw-gap-3 ">
            <button
              className=" tw-text-white"
              onClick={() => {
                socket.emit(
                  "createSubTask",
                  taskId,
                  columnId,
                  BoardId,
                  inputState
                );
                setInputState("");
                setIsCreating(false);
              }}
            >
              Add{" "}
            </button>
            <button
              className=" tw-text-white"
              onClick={() => {
                setInputState("");
                setIsCreating(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p
          className=" tw-text-primColor"
          onClick={() => {
            setIsCreating(true);
          }}
        >
          Add SubTask +
        </p>
      )}
    </div>
  );
}

export default function TaskInfo({
  taskData,
  columnData,
  currentBoardIId,
  title,
  description,
  subTasks,
  socket,
  taskPopupClose,
  theme,
  DeletePrompt,
}) {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  return (
    <>
      <DeletePrompt
        title={title}
        type="task"
        isPopUpOpen={isDeleteOpen}
        setPopUpOpen={setIsDeleteOpen}
        onDelete={() => {
          socket.emit(
            "deleteTask",
            taskData._id,
            columnData._id,
            currentBoardIId
          );
          taskPopupClose();
        }}
        theme={theme}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Input
          text={title}
          onSave={(value) => {
            editingTask("title", value, id);
          }}
        /> */}
        <EditText
          className="taskInput"
          inputClassName="taskInput"
          defaultValue={title}
          onSave={(e) => {
            socket.emit(
              "editTask",
              "title",
              taskData._id,
              columnData._id,
              currentBoardIId,
              e.value
            );
          }}
        />
        <Menu
          menuButton={
            <MoreVertIcon className=" tw-text-primColor tw-cursor-pointer" />
          }
          className="tw-bg-red-50"
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
      <TextArea
        text={description}
        onSave={(value) => {
          socket.emit(
            "editTask",
            "description",
            taskData._id,
            columnData._id,
            currentBoardIId,
            value
          );
        }}
      />
      <p className="title tw-text-primColor tw-mt-6 tw-text-2xl ">SubTasks</p>
      <div className=" tw-max-h-36 tw-overflow-y-auto	">
        {subTasks.map((subTaskData) => {
          return (
            <SubTask
              subTask={subTaskData}
              socket={socket}
              taskId={taskData._id}
              columnId={columnData._id}
              BoardId={currentBoardIId}

              // checkHandler={checkHandler}
              // removeSubTask={(subId) => {
              //   removeSubTask(id, subId);
              // }}
            />
          );
        })}
      </div>
      <AddSubTask
        socket={socket}
        taskId={taskData._id}
        columnId={columnData._id}
        BoardId={currentBoardIId}
      />
    </>
  );
}
