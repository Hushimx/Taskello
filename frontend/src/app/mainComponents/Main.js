// App.js
import React, { useState } from "react";

import Board from "./board/Board"; // Import your CSS file for styling
import Popup from "reactjs-popup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useGetId from "../Hooks/useId";
// const EditableComponent = ({ children, excutingFnc, selfHandling }) => {
//   const [isEditing, setIsEditing] = React.useState(false);
//   const triggerBtn = React.useRef(null);
//   const addBtn = React.useRef(null);
//   const removeBtn = React.useRef(null);
//   const textareaRef = React.useRef(null);
//   var windowEvent = (event) => {
//     if (event.target == removeBtn.current) {
//       setIsEditing(false);
//     } else if (
//       event.target.id != "trigger" &&
//       event.target !== textareaRef.current
//     ) {
//       setIsEditing(false);
//       excutingFnc(textareaRef);
//     }
//   };
//   React.useEffect(() => {
//     if (isEditing === true) {
//       let inputValue = textareaRef.current.value;
//       textareaRef.current.setSelectionRange(
//         inputValue.length,
//         inputValue.length
//       );
//       textareaRef.current.focus();
//       textareaRef.current.addEventListener("keydown", (event) => {
//         if (event.key === "Enter") {
//           event.preventDefault();
//           textareaRef.current.blur();
//         }
//       });
//     }
//     if (!selfHandling) {
//       if (isEditing === true) {
//         textareaRef.current.addEventListener("keydown", (event) => {
//           if (event.key === "Enter") {
//             event.preventDefault();
//           }
//         });

//         //---
//         window.addEventListener("click", windowEvent);
//       } else {
//         triggerBtn.current.addEventListener("click", () => {
//           setIsEditing(true);
//         });
//       }
//       return () => {
//         window.removeEventListener("click", windowEvent);
//       };
//     }
//   }, [isEditing]);

//   return children(
//     textareaRef,
//     triggerBtn,
//     [isEditing, setIsEditing],
//     [addBtn, removeBtn]
//   );
// };

const Main = ({
  currentBoard,
  setCurrentBoard,
  theme,
  socket,
  currentBoardIId,
  sideShowen,
  setSideShowen,
}) => {
  const [newId] = useGetId();

  function dragHandler(details) {
    //Edge casses
    if (!details.source.droppableId) return null;
    if (
      details.source.droppableId == details.destination.droppableId &&
      details.source.index == details.destination.index
    )
      return null;
    //same column but changes order
    if (details.source.droppableId == details.destination.droppableId) {
      setCurrentBoard((prev) => {
        let newArr = [...prev.columns];
        let col = newArr.find((e) => e.id == details.source.droppableId);
        //Switch elements
        [
          col.tasks[details.source.index],
          col.tasks[details.destination.index],
        ] = [
          col.tasks[details.destination.index],
          col.tasks[details.source.index],
        ];
        return { ...prev, columns: newArr };
      });
    } else {
      setCurrentBoard((prev) => {
        let newArr = [...prev.columns];
        let sourceCol = newArr.find((e) => e.id == details.source.droppableId);
        let destinationCol = newArr.find(
          (e) => e.id == details.destination.droppableId
        );
        let deletedItem = sourceCol.tasks.splice(details.source.index, 1);
        destinationCol.tasks.splice(
          details.destination.index,
          0,
          deletedItem[0]
        );
        return { ...prev, columns: newArr };
      });
    }
  }
  return (
    <div
      className="board tw-text-gray-70 tw-flex tw-w-full tw-p-5 "
      style={{
        backgroundImage: currentBoard.background
          ? `url(${currentBoard.background})`
          : "unset",
        backgroundSize: currentBoard.background ? "cover" : "",
      }}
    >
      <Board
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        socket={socket}
        currentBoardIId={currentBoardIId}
        theme={theme}
      />
      <button
        className="showSideBar tw-bg-spacialPurple tw-flex tw-items-center tw-justify-center tw-text-primColor"
        onClick={() => {
          setSideShowen(true);
        }}
      >
        <VisibilityIcon />
      </button>
    </div>
  );
};

export default Main;
