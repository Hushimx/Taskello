import React from "react";
import Popup from "reactjs-popup";
import "../css/popUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { EditText, EditTextarea } from "react-edit-text";

import DeletePrompt from "./Helpers/deletePopup";
import ChangeBG from "./Helpers/changeBG";
import Members from "./Helpers/members";

import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
export function Header({
  boards,
  currentBoard,
  currentBoardIId,
  socket,
  theme,
  user,
}) {
  const [showBoardMenu, setShowBoardMenu] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [leavePromit, setLeavePromit] = React.useState(false);
  const [isBgOpen, setIsBgOpen] = React.useState(false);
  const [isMembersOpen, setIsMembersOpen] = React.useState(false);
  const userRole = React.useRef("user");

  const handleClose = () => setShowBoardMenu(false);
  return (
    <header
      className="tw-w-full tw-shadow-lg tw-flex justify-content-between  tw-items-center tw-pl-5 tw-z-10 tw-px-5
       tw-text-primColor"
      style={{ height: "10vh" }}
    >
      <Members
        type="Board"
        isPopUpOpen={isMembersOpen}
        setPopUpOpen={setIsMembersOpen}
        onDelete={(close) => {
          socket.emit("deleteBoard", currentBoardIId);
          close();
        }}
        theme={theme}
        currentBoard={currentBoard}
        socket={socket}
        user={user}
        userRole={userRole}
      />

      <DeletePrompt
        type="Board"
        isPopUpOpen={isDeleteOpen}
        setPopUpOpen={setIsDeleteOpen}
        onDelete={(close) => {
          socket.emit("deleteBoard", currentBoardIId);
          close();
        }}
        onClose={(closeDeletrPrompt) => {
          setShowBoardMenu(true);
          closeDeletrPrompt();
        }}
        theme={theme}
      />
      <ChangeBG
        type="Board"
        isPopUpOpen={isBgOpen}
        setPopUpOpen={setIsBgOpen}
        onClose={(closeDeletrPrompt) => {
          setShowBoardMenu(true);
          closeDeletrPrompt();
        }}
        theme={theme}
        currentBoardIId={currentBoardIId}
        socket={socket}
      />
      <EditText
        inputClassName="taskInput tw-w-96 tw-text-sm tw-h-8 "
        placeholder={currentBoard.title}
        defaultValue={currentBoard.title}
        onSave={(e) => {
          if (e.value.length >= 1) {
            socket.emit("editBoardName", currentBoardIId, e.value);
          }
        }}
      />
      <Popup
        open={leavePromit}
        onClose={() => setLeavePromit(false)}
        closeOnDocumentClick
        modal
        nested
      >
        {(close) => (
          <div
            className={`model ${theme.current} tw-bg-asideBG tw-flex tw-flex-col tw-items-center`}
            style={{ width: "30rem", minHeight: "13rem" }}
          >
            <h3 className=" tw-text-red-500">Leave this Board?</h3>
            <p className=" tw-text-primColor">
              Are you sure you want to Leave this Board? This action cannot be
              reversed.
            </p>
            <div>
              <button
                className=" mainBtn tw-w-24"
                onClick={() => {
                  socket.emit("leaveBoard", currentBoardIId);
                  close();
                }}
              >
                Leave
              </button>
              <button
                className="  tw-w-24 tw-text-primColor"
                onClick={() => {
                  close();
                  setShowBoardMenu(true);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>

      <button
        onClick={() => {
          setShowBoardMenu(true);
        }}
      >
        <MoreHorizIcon />
      </button>
      <Offcanvas
        show={showBoardMenu}
        onHide={handleClose}
        placement="end"
        data-bs-theme={theme.current}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className=" tw-me-36"></Offcanvas.Title>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <hr></hr>
        <Offcanvas.Body>
          <div
            className=" tw-h-16  tw-bg- tw-border-2 tw-flex tw-justify-start tw-items-center tw-ps-5 tw-gap-1 tw-shadow-sm tw-cursor-pointer tw-mt-4"
            onClick={() => {
              setIsMembersOpen(true);
              handleClose();
            }}
          >
            <GroupIcon />
            Members
          </div>
          <div
            className=" tw-h-16  tw-bg- tw-border-2 tw-flex tw-justify-start tw-items-center tw-ps-5 tw-gap-1 tw-shadow-sm tw-cursor-pointer tw-mt-4"
            onClick={() => {
              setIsBgOpen(true);
              handleClose();
            }}
          >
            <WallpaperIcon />
            Background
          </div>
          {userRole.current == "owner" ? (
            <div
              className=" tw-h-16  tw-bg- tw-border-2 tw-flex tw-justify-start tw-items-center tw-ps-5 tw-gap-1 tw-shadow-sm tw-cursor-pointer tw-mt-4"
              onClick={() => {
                setIsDeleteOpen(true);
                handleClose();
              }}
            >
              <DeleteIcon />
              Delete
            </div>
          ) : (
            <div
              className=" tw-h-16  tw-bg- tw-border-2 tw-flex tw-justify-start tw-items-center tw-ps-5 tw-gap-1 tw-shadow-sm tw-cursor-pointer tw-mt-4"
              onClick={() => {
                setLeavePromit(true);
                handleClose();
              }}
            >
              <ExitToAppIcon />
              Leave
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
