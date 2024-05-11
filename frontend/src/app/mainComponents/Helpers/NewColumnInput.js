import React from "react";
import useGetId from "../../Hooks/useId";
export default function ColumnInput({
  setShowAddColumnInput,
  setCurrentBoard,
  socket,
  currentBoardIId,
}) {
  const [newId] = useGetId();
  const inputRef = React.useRef(null);
  const [inputState, setInputState] = React.useState("");
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={inputState}
        placeholder="Column Name"
        onChange={(e) => {
          setInputState(e.target.value);
        }}
        onBlur={() => {
          setShowAddColumnInput(false);
        }}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            let column = { title: inputState };
            socket.emit("createColumn", column, currentBoardIId);
            setInputState("");
            setShowAddColumnInput(false);
          }
        }}
      />
      <div>
        <button
          className=" tw-me-3 text-invert "
          onClick={() => {
            let column = { title: inputState };
            socket.emit("createColumn", column, currentBoardIId);
            setInputState("");
            setShowAddColumnInput(false);
          }}
        >
          Create
        </button>
        <button
          className=" tw-text-3xl tw-text-red-500"
          onClick={() => {
            setShowAddColumnInput(false);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
