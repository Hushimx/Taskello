import React from "react";
import Popup from "reactjs-popup";

export default function DeletePrompt({
  title,
  type,
  onDelete,
  onClose,
  isPopUpOpen,
  setPopUpOpen,
  deleteText,
  theme,
  currentBoardIId,
  socket,
}) {
  const inputRef = React.useRef(null);
  const [backgrounds, setBackgrounds] = React.useState(null);
  const [currentBg, setCurrentBg] = React.useState(null);

  socket.on("fetchBGs", (bgs) => {
    setBackgrounds(bgs);
  });
  return (
    <>
      <Popup
        open={isPopUpOpen}
        onClose={() => setPopUpOpen(false)}
        closeOnDocumentClick
        modal
        nested
      >
        {(close) => (
          <div
            className={`model ${theme.current} tw-bg-asideBG tw-flex tw-flex-col tw-items-center`}
            style={{ width: "30rem", minHeight: "13rem" }}
          >
            <div className=" tw-flex flex-column tw-justify-between tw-gap-5 tw-items-center">
              <h3 className=" tw-text-primColor">Change Background</h3>
              <input
                type="text"
                className=" taskInput"
                ref={inputRef}
                placeholder="Search for background"
              />
              <button
                className="tw-bg-red-500 mainBtn tw-w-24 "
                onClick={() => {
                  socket.emit("bgSearch", inputRef.current.value);
                }}
              >
                Search
              </button>
            </div>
            <div className=" tw-flex tw-flex-wrap tw-w-full tw-gap-2 tw-mt-10">
              {backgrounds ? (
                <>
                  {backgrounds.map((item) => {
                    return (
                      <div
                        className={` ${
                          currentBg == item.id
                            ? " tw-border-4 tw-border-spacialPurple"
                            : ""
                        }`}
                        style={{ width: "48%" }}
                        onClick={() => {
                          if (currentBg != item.id) {
                            socket.emit("bgChange", item, currentBoardIId);
                            setCurrentBg(item.id);
                          }
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={item.thumb}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <span className=" tw-text-primColor tw-w-full tw-text-center">
                  No Backgrounds
                </span>
              )}
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
