import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import ColumnInput from "../Helpers/NewColumnInput";
import useGetId from "../../Hooks/useId";
import "../../css/board.css"; // Import your CSS file for styling
import "../../css/popUp.css"; // Import your CSS file for styling

export default function Board({
  currentBoard,
  setCurrentBoard,
  socket,
  currentBoardIId,
  theme,
}) {
  const [newId] = useGetId();
  const [showAddColumnInput, setShowAddColumnInput] = React.useState(false);
  function columnChangeHandler(details) {
    setCurrentBoard((prev) => {
      let col = [...prev.columns];
      //Switch elements
      let deletedColumn = col.splice(details.source.index, 1);
      col.splice(details.destination.index, 0, deletedColumn[0]);

      return { ...prev, columns: col };
    });
    socket.emit("columnsReorder", details, currentBoardIId);
  }

  async function dragHandler(details) {
    if (details.destination) {
      if (details.type === "columns") {
        columnChangeHandler(details);
        return null;
      }
      setCurrentBoard((prev) => {
        let newArr = [...prev.columns];
        let sourceColumn = newArr.find(
          (e) => e._id == details.source.droppableId
        );
        let destinationColumn = newArr.find(
          (e) => e._id == details.destination.droppableId
        );
        let deletedTask = sourceColumn.tasks.splice(details.source.index, 1);
        destinationColumn.tasks.splice(
          details.destination.index,
          0,
          deletedTask[0]
        );
        prev.columns = newArr;
        return prev;
      });
      socket.emit("tasksReorder", details, currentBoardIId);
    }
  }
  return (
    <DragDropContext onDragEnd={dragHandler}>
      <Droppable
        direction="horizontal"
        droppableId="columnsDroppable"
        type="columns"
      >
        {(ColumnsDroppableProvider) => {
          return (
            <div
              className="column-area tw-me-auto"
              ref={ColumnsDroppableProvider.innerRef}
              {...ColumnsDroppableProvider.droppableProps}
              {...ColumnsDroppableProvider.droppableProps}
              style={{ display: "flex" }}
            >
              {currentBoard.columns.map((column, columnIndex) => {
                return (
                  <>
                    <Column
                      columnData={column}
                      columnIndex={columnIndex}
                      currentBoard={currentBoard}
                      setCurrentBoard={setCurrentBoard}
                      currentBoardIId={currentBoardIId}
                      socket={socket}
                      theme={theme}
                    />
                  </>
                );
              })}
            </div>
          );
        }}
      </Droppable>

      <div
        class={`newCol tw-flex tw-justify-center tw-items-center tw-min-w-60 tw-bg-red-50 height-transition 
        ${showAddColumnInput ? "tw-h-1/3" : "tw-h-4/5"}`}
      >
        {showAddColumnInput ? (
          <ColumnInput
            setShowAddColumnInput={setShowAddColumnInput}
            setCurrentBoard={setCurrentBoard}
            socket={socket}
            currentBoardIId={currentBoardIId}
          />
        ) : (
          <div
            className=" tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center
            "
            onClick={() => {
              setShowAddColumnInput(true);
            }}
          >
            <p className=" tw-text-primColor">New Column +</p>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
