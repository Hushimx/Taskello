import React from "react";
import useGetId from "../Hooks/useId";
import "../css/sideBar.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewBoardModel from "./Helpers/newBoardForm";

import Popup from "reactjs-popup";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";

import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
// export function SideBar({
//   boards,
//   setBoards,
//   currentBoardIId,
//   setCurrentBoardId,
//   isAnimating,
//   setIsAnimation,
//   themeSwitch,
//   setThemeSwitch,
// }) {
//   const [newId] = useGetId();

//   return (
//     <aside>
//       <div
//         className="d-flex flex-column flex-shrink-0 p-3 "
//         style={{
//           width: "15%",
//           height: "100vh",
//           alignSelf: "flex-start",
//           position: "absolute",
//           top: 0,
//           backgroundColor: "inherit !important",
//         }}
//       >
//         <a
//           href="/"
//           className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
//         >
//           <span className="fs-4">Taskello</span>
//         </a>
//         <hr />
//         <p>All BOARDS ( {boards.length} )</p>
//         <DragDropContext>
//           <Droppable droppableId="boards" type="boards">
//             {(p) => {
//               return (
//                 <div
//                   className="nav nav-pills flex-column mb-auto"
//                   id="boards"
//                   ref={p.innerRef}
//                   {...p.droppableProps}
//                   {...p.droppableProps}
//                 >
//                   {boards.map((e, index) => {
//                     return (
//                       <>
//                         <Draggable
//                           draggableId={`${e.id}`}
//                           index={index}
//                           key={e.id}
//                         >
//                           {(p) => {
//                             return (
//                               <>
//                                 <div
//                                   ref={p.innerRef}
//                                   {...p.dragHandleProps}
//                                   {...p.draggableProps}
//                                   style={{
//                                     ...p.draggableProps.style,
//                                     cursor: "pointer",
//                                   }}
//                                   className={`nav-item ${
//                                     currentBoardIId == e.id ? "active" : "none"
//                                   }`}
//                                   key={index}
//                                   onClick={() => {
//                                     setCurrentBoardId(e.id);
//                                   }}
//                                 >
//                                   <i className="fa fa-columns" />
//                                   <span className="bordname">{e.title}</span>
//                                 </div>
//                               </>
//                             );
//                           }}
//                         </Draggable>
//                       </>
//                     );
//                   })}
//                   <Popup
//                     trigger={
//                       <li className="new">
//                         <i className="fa fa-columns" aria-hidden="true" />
//                         <span className="bordname"> +Create New Board</span>
//                       </li>
//                     }
//                     closeOnDocumentClick
//                     modal
//                     nested
//                   >
//                     {(close) => (
//                       <NewBoardModel setBoards={setBoards} closePopUp={close} />
//                     )}
//                   </Popup>
//                 </div>
//               );
//             }}
//           </Droppable>
//         </DragDropContext>
//         <div>
//           <span
//             id="themeSwitchCenterPoint"
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%);",
//             }}
//           ></span>
//           <Switch
//             disabled={isAnimating}
//             onChange={() => {
//               setThemeSwitch((prev) => !prev);
//               setIsAnimation(true);
//             }}
//             checked={themeSwitch}
//           />
//         </div>
//         <hr />
//         <div className="dropdown">
//           <a
//             href="#"
//             className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <img
//               src="https://github.com/mdo.png"
//               alt=""
//               className="rounded-circle me-2"
//               width={32}
//               height={32}
//             />
//             <strong>mdo</strong>
//           </a>
//           <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
//             <li>
//               <a className="dropdown-item" href="#">
//                 New project...
//               </a>
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">
//                 Settings
//               </a>
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">
//                 Profile
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider" />
//             </li>
//             <li>
//               <a className="dropdown-item" href="#">
//                 Sign out
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </aside>
//   );
// }

export function SideBar({
  boards,
  setBoards,
  currentBoardIId,
  setCurrentBoardId,
  isAnimating,
  setIsAnimation,
  themeSwitch,
  setThemeSwitch,
  socket,
  sideShowen,
  setSideShowen,
  theme,
  user,
  useNavigate,
}) {
  const [newId] = useGetId();
  let navigate = useNavigate();

  const [invitations, setInvitations] = React.useState([]);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    socket.on("userInvitationsUpdate", () => {
      socket.emit("getUserInvitations");
    });
    socket.emit("getUserInvitations");
    socket.on("getUserInvitations", (invs) => {
      setInvitations(invs);
      // if (menuRef) menuRef.current.click();
    });
  }, []);

  return (
    <aside
      className="tranform-transition tw-relative tw-flex tw-flex-col tw-bg-clip-border tw-h-screen tw-w-4/6  lg:tw-w-1/5 tw-p-4 tw-shadow-xl tw-shadow-blue-gray-900/5  tw-z-50"
      style={{
        transform: sideShowen ? "" : "translateX(-100%)",
        position: sideShowen ? "unset" : "absolute",
      }}
    >
      <div className=" tw-p-5">
        <h5 className="tw-h-text tw-block tw-antialiased tw-tracking-normal tw-font-sans tw-text-xl tw-font-semibold tw-leading-snug tw-text-primColor">
          Taskello
        </h5>
      </div>
      <hr />
      <p className="tw-p-text tw-font-bold tw-w-full tw-text-primColor">
        All BOARDS ( {boards.length} )
      </p>
      <DragDropContext
        onDragEnd={(d) => {
          if (d.destination) {
            setBoards((prev) => {
              let deletedBoard = prev.splice(d.source.index, 1);
              prev.splice(d.destination.index, 0, deletedBoard[0]);
              return prev;
            });
            socket.emit("userBoardsReorder", d);
          }
        }}
      >
        <Droppable droppableId="boards" type="boards">
          {(DroppableProvier) => {
            return (
              <nav
                className="tw-flex tw-flex-col  tw-min-w-[240px] tw-max-h-[20rem] tw-p-2 tw-font-sans tw-text-base tw-font-normal tw-text-gray-700 overflow-auto	
                "
                ref={DroppableProvier.innerRef}
                {...DroppableProvier.droppableProps}
                {...DroppableProvier.droppableProps}
              >
                {boards.map((board, boardIdx) => {
                  return (
                    <>
                      <Draggable
                        draggableId={`${board.id}`}
                        index={boardIdx}
                        key={board.id}
                      >
                        {(draggableProvider) => {
                          return (
                            <div
                              {...draggableProvider.dragHandleProps}
                              {...draggableProvider.draggableProps}
                              ref={draggableProvider.innerRef}
                              role="button"
                              tabindex="0"
                              className={` tw-text-secColor tw-my-1 bg-transition tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-lg tw-text-start tw-leading-tight tw-hover:bg-fuchsia-500 tw-hover:text-white tw-hover:bg-opacity-80 tw-focus:bg-blue-50 tw-focus:bg-opacity-80 tw-active:bg-gray-50 tw-active:bg-opacity-80 tw-hover:text-blue-900 tw-focus:text-blue-900 tw-active:text-blue-900 tw-outline-none ${
                                currentBoardIId == board.id
                                  ? "tw-bg-fuchsia-500 tw-text-white"
                                  : "none"
                              }`}
                              style={{
                                ...draggableProvider.draggableProps.style,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setCurrentBoardId(board.id);
                              }}
                            >
                              <div
                                className="tw-grid tw-place-items-center tw-mr-4
"
                              >
                                <i className="fa fa-columns" />
                              </div>
                              {board.title}
                            </div>
                          );
                        }}
                      </Draggable>
                    </>
                  );
                })}
              </nav>
            );
          }}
        </Droppable>
      </DragDropContext>
      <Popup
        trigger={
          <div
            role="button"
            tabindex="0"
            className={`tw-flex tw-items-center tw-w-full tw-p-3 tw-rounded-lg tw-text-start tw-text-primColor tw-leading-tight  tw-hover:bg-blue-50 tw-hover:bg-opacity-80 tw-focus:bg-blue-50 tw-focus:bg-opacity-80 tw-active:bg-gray-50 tw-active:bg-opacity-80 tw-hover:text-blue-900 tw-focus:text-blue-900 tw-active:text-blue-900 tw-outline-none
            `}
          >
            <div className="tw-grid tw-place-items-center tw-mr-4 "></div>
            Create New Board +
          </div>
        }
        closeOnDocumentClick
        modal
        nested
      >
        {(close) => (
          <NewBoardModel
            setBoards={setBoards}
            closePopUp={close}
            socket={socket}
            theme={theme}
          />
        )}
      </Popup>

      <div className=" tw-w-full tw-bg-boardBG tw-flex tw-justify-center tw-gap-3 tw-p-2 tw-items-center tw-text-primColor tw-mt-auto tw-mb-5 tw-rounded-lg ">
        <LightModeIcon />
        <input
          type="checkbox"
          className="theme-checkbox tw-h-4 "
          onChange={() => {
            setThemeSwitch((prev) => !prev);
            setIsAnimation(true);
          }}
          checked={themeSwitch}
          disabled={isAnimating}
        />
        <NightsStayIcon />
      </div>
      <button
        className="  tw-mb-auto tw-bg-spacialPurple tw-p-2 tw-rounded-md tw-text-primColor"
        onClick={() => setSideShowen(false)}
      >
        Hide Sidebar
      </button>
      <div className="tw-flex tw-justify-between">
        <div className=" tw-flex tw-items-center tw-gap-3 tw-bg-boardBG tw-text-primColor tw-p-2 tw-w-3/4 ">
          <img src="/user.png" className=" tw-w-10 tw-rounded-full" alt="" />
          {user.fname}
          <Menu
            menuButton={
              <span className="tw-ms-auto tw-me-1 tw-w-5">
                <ExpandLessIcon />
              </span>
            }
            className="tw-bg-red-50 "
            direction="top"
            align={"center"}
          >
            <div className=" tw-w-32 tw-bg-boardBG tw-text-primColor -tw-mt-16 tw-shadow-2xl tw-p-4 tw-absolute tw-z-50">
              <MenuItem
                className=" tw-text-red-500 tw-cursor-pointer  tw-duration-300"
                onClick={async () => {
                  let response = await fetch(
                    `http://${process.env.SERVER_URL}/logout`,
                    {
                      method: "get",
                      headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                      },
                      credentials: "include",
                    }
                  );
                  response = await response.json();
                  if (response.status) {
                    setTimeout(() => {
                      navigate("/signin");
                    }, 2000);
                  }
                }}
              >
                Log out
              </MenuItem>
            </div>
          </Menu>
        </div>
        <div className=" tw-flex tw-items-center  tw-bg-boardBG tw-text-primColor tw-p-2 tw-w-1/5 tw-justify-center  tw-relative">
          <Menu
            menuButton={
              <span className="  tw-w-5 tw-cursor-pointer ">
                <span className=" tw-w-6 tw-h-6 tw-absolute -tw-top-3 tw-right-0 tw-rounded-full tw-bg-spacialPurple tw-flex tw-items-center tw-justify-center  ">
                  {invitations.length}
                </span>
                <NotificationsIcon />
              </span>
            }
            className="tw-bg-red-50 "
          >
            <div
              ref={menuRef}
              className=" tw-w-64 tw-h-56  tw-overflow-auto  tw-bg-boardBG tw-shadow-2xl tw-border-2 tw-border-white tw-text-primColor -tw-mt-64 -tw-ms-16  tw-p-4 tw-absolute tw-top-full  "
            >
              {invitations
                ? invitations.map((invite) => {
                    return (
                      <div
                        className="tw-flex tw-justify-between tw-items-center"
                        key={invite.inviteId}
                      >
                        <p className=" tw-text-xs">
                          Invite from "{invite.senderName}" to join board "
                          {invite.boardName}"
                        </p>
                        <div className="tw-flex tw-gap-2">
                          <MenuItem>
                            <button
                              className=" tw-bg-green-500 tw-text-white tw-rounded-full"
                              onClick={() => {
                                socket.emit("acceptInvite", invite.inviteId);
                              }}
                            >
                              <CheckIcon />
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              className=" tw-bg-red-500 tw-text-white tw-rounded-full"
                              onClick={() => {
                                socket.emit("declineInvite", invite.inviteId);
                              }}
                            >
                              <CloseIcon />
                            </button>
                          </MenuItem>
                        </div>
                      </div>
                    );
                  })
                : "no invites"}
            </div>
          </Menu>
        </div>
      </div>
    </aside>
  );
}
