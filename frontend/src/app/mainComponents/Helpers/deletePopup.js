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
}) {
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
            <h3 className=" tw-text-red-500">Delete this {type} ?</h3>
            <p className=" tw-text-primColor">
              Are you sure you want to delete the {title ? `"${title}" ` : ""}
              {type}? This action cannot be reversed.
            </p>
            <div>
              <button
                className=" mainBtn tw-w-24"
                onClick={() => {
                  onDelete(close);
                }}
              >
                Delete
              </button>
              <button
                className="  tw-w-24 tw-text-primColor"
                onClick={
                  onClose
                    ? () => {
                        onClose(close);
                      }
                    : () => {
                        close();
                      }
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
