import React from "react";
import useGetId from "../../Hooks/useId";
export default function TaskInput({
  setShowTaskInput,
  socket,
  currentBoardIId,
  columnId,
}) {
  const [newId] = useGetId();
  const inputRef = React.useRef(null);
  const [inputState, setInputState] = React.useState("");
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className=" tw-flex tw-flex-col tw-flex-wrap">
      <input
        className="tw-w-3/4 tw-border-2 tw-border-spacialPurple focus:tw-outline-none "
        type="text"
        ref={inputRef}
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            let task = { _id: newId(), title: inputState };
            socket.emit("createTask", task, columnId, currentBoardIId);
            setInputState("");
          }
        }}
      />

      <div>
        <button
          className=" tw-me-3 text-invert "
          onClick={() => {
            let task = { _id: newId(), title: inputState };
            socket.emit("createTask", task, columnId, currentBoardIId);
            setInputState("");
            setShowTaskInput(false);
          }}
        >
          Create
        </button>
        <button
          className=" tw-text-3xl tw-text-red-500"
          onClick={() => {
            setShowTaskInput(false);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
