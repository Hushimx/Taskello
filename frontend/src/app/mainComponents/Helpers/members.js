import React from "react";
import Popup from "reactjs-popup";
import DeletePrompt from "./deletePopup";

import PersonIcon from "@mui/icons-material/Person";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Members({
  title,
  type,
  onDelete,
  onClose,
  isPopUpOpen,
  setPopUpOpen,
  deleteText,
  theme,
  currentBoard,
  socket,
  user,
}) {
  const [users, setUsers] = React.useState(null);
  const [invitations, setInvitations] = React.useState(null);
  const userRole = React.useRef("user");
  const inviteInput = React.useRef(null);
  React.useEffect(() => {
    socket.on("membersUpdate", () => {
      socket.emit("getUsers", currentBoard.id);
    });
    socket.emit("getUsers", currentBoard.id);
    socket.on("getUsers", (users) => {
      setUsers(users);
      userRole.current = users.find((u) => u._id == user._id).role;
    });
    socket.on("boardInvitationsUpdate", () => {
      socket.emit("getBoardInvitations", currentBoard.id);
    });

    socket.emit("getBoardInvitations", currentBoard.id);
    socket.on("getBoardInvitations", (invs) => {
      setInvitations(invs);
    });
  }, []);
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
            className={`model ${theme.current} tw-bg-asideBG tw-flex tw-flex-col tw-items-center tw-overflow-auto`}
            style={{ width: "30rem", minHeight: "13rem" }}
          >
            <h3 className=" tw-text-primColor">Board Members</h3>
            <div className=" tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-2">
              {!users ? (
                "No Users"
              ) : (
                <>
                  {users.map((u) => {
                    return (
                      <div
                        className={`tw-flex tw-w-56 tw-bg-boardBG tw-text-primColor tw-h-10 tw-items-center tw-rounded-md iconContainer ${
                          u._id == user._id
                            ? "tw-border-2 tw-border-spacialPurple"
                            : ""
                        }`}
                      >
                        <PersonIcon />
                        <span>{u.name}</span>
                        {u.role != "owner" && userRole.current == "owner" ? (
                          <>
                            <span
                              onClick={() => {
                                socket.emit("kickUser", currentBoard.id, u._id);
                              }}
                              className="iconDiv tw-text-primColor tw-cursor-pointer tw-text-red-500"
                            >
                              Kick
                            </span>
                          </>
                        ) : userRole.current == "owner" ? (
                          <>
                            <span className=" tw-bg-red-500 tw-ms-auto tw-me-2 tw-rounded-md">
                              Owner
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className=" tw-flex tw-flex-col tw-items-center tw-gap-3 tw-my-5">
              <h3 className=" tw-text-primColor">Add members</h3>
              <input
                type="text"
                className=" taskInput"
                placeholder="User Email"
                ref={inviteInput}
              />
              <button
                className=" mainBtn tw-w-32"
                onClick={() => {
                  if (inviteInput.current.value) {
                    socket.emit(
                      "inviteUser",
                      currentBoard.id,
                      inviteInput.current.value
                    );
                  }
                }}
              >
                Invite
              </button>
            </div>
            <div className=" tw-w-full tw-flex tw-justify-center">
              {!invitations ? (
                "No Invitations"
              ) : (
                <>
                  {invitations.map((invite) => {
                    return (
                      <div className=" tw-flex tw-w-56 tw-bg-boardBG tw-text-primColor tw-h-10 tw-items-center tw-rounded-md iconContainer ">
                        <PersonIcon />
                        <span>{invite.recipientEmail}</span>
                        {userRole.current == "owner" && (
                          <>
                            <span className="iconDiv tw-text-primColor tw-cursor-pointer tw-text-red-500">
                              Canel
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>{" "}
          </div>
        )}
      </Popup>
    </>
  );
}
