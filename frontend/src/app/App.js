import React from "react";
import LoadingScreen from "./mainComponents/LoadingScreen";
import { Header } from "./mainComponents/Header";
import { SideBar } from "./mainComponents/SideBar";
import NewBoardModel from "./mainComponents/Helpers/newBoardForm";
import Main from "./mainComponents/Main";
import useGetId from "./Hooks/useId";
import { io } from "socket.io-client";
import "../app.css"; // Import your CSS file for styling
import { ReactNotifications, Store } from "react-notifications-component";
import Popup from "reactjs-popup";

function App({ useNavigate, user, setUser }) {
  let navigate = useNavigate();

  const [newId] = useGetId();
  const [socket, setSocket] = React.useState(null);
  const [boards, setBoards] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [themeSwitch, setThemeSwitch] = React.useState(true);
  const [isAnimating, setIsAnimation] = React.useState(false);
  const [currentBoard, setCurrentBoard] = React.useState(null);
  const [sideShowen, setSideShowen] = React.useState(true);
  const [currentBoardIId, setCurrentBoardId] = React.useState(null);
  const theme = React.useRef("dark");
  const loadingRef = React.useRef(null);
  function clearLoading() {
    loadingRef.current.style.opacity = 0;
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }
  React.useEffect(() => {
    const Socket = io("http://test.soft-fire.com:8000", {
      withCredentials: true,
    });
    Socket.on("connect", (t) => {
      console.log("Conntected to the websocket");
    });
    Socket.on("disconnect", (message) => {
      setIsLoading(true);
    });
    Socket.on("connect_error", (err) => {
      if (err.message == "noCookies") {
        Store.addNotification({
          title: "Ops!",
          message: "You have to login first",
          type: "danger",
          insert: "center",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        setUser(null);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        Store.addNotification({
          title: "Ops!",
          message: "Something Went Wrong",
          type: "danger",
          insert: "center",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    });
    Socket.on("boardCreated", (boardId, user) => {
      setUser(user);
      setCurrentBoardId(boardId);
    });
    Socket.on("boardUpdate", (board) => {
      setCurrentBoard(board);
    });
    Socket.on("inialPool", (user) => {
      setUser(user);
    });
    Socket.on("changeBoard", (board) => {
      setCurrentBoard(board);
    });

    Socket.on("userUpdate", (user) => {
      setUser(user);
    });
    Socket.on("boardDeleted", () => {
      Socket.emit("poolUser");
      setCurrentBoardId(null);
      setCurrentBoard(null);
    });
    Socket.on("userChanged", () => {
      Socket.emit("poolUser");
    });
    Socket.on("error", (e) => {
      Store.addNotification({
        title: "Ops!",
        message: e,
        type: "danger",
        insert: "center",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    });
    Socket.on("success", (e) => {
      Store.addNotification({
        title: "Ops!",
        message: e,
        type: "success",
        insert: "center",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    });
    setSocket(Socket);
  }, []);
  React.useEffect(() => {
    if (user) {
      setBoards(user.boards);
      if (user.boards.length > 0 && !currentBoardIId) {
        setCurrentBoardId(user.boards[0].id);
      }
      setTimeout(() => {
        if (isLoading) clearLoading();
      }, 2000);
    }
  }, [user]);
  React.useEffect(() => {
    if (currentBoardIId && socket) {
      socket.emit("changeBoard", currentBoardIId);
      setCurrentBoard(null);
    }
  }, [currentBoardIId]);
  React.useEffect(() => {
    if (isAnimating) {
      theme.current = theme.current === "dark" ? "light" : "dark";
      setTimeout(() => {
        setIsAnimation(false);
      }, 1000);
    }
  }, [isAnimating]);
  return (
    <>
      <ReactNotifications />
      {isLoading ? (
        <LoadingScreen loadingRef={loadingRef} />
      ) : (
        <>
          <main className={`${theme.current} tw-flex`}>
            {/* <Header currentBoard={currentBoard} /> */}
            <SideBar
              boards={boards}
              setBoards={setBoards}
              currentBoardIId={currentBoardIId}
              setCurrentBoardId={setCurrentBoardId}
              isAnimating={isAnimating}
              setIsAnimation={setIsAnimation}
              themeSwitch={themeSwitch}
              setThemeSwitch={setThemeSwitch}
              socket={socket}
              sideShowen={sideShowen}
              setSideShowen={setSideShowen}
              theme={theme}
              user={user}
              useNavigate={useNavigate}
            />
            {currentBoard ? (
              <div
                className={`tw-flex tw-content-start tw-flex-wrap tw-w-full ${
                  sideShowen ? "lg:tw-w-4/5" : "tw-w-full"
                }`}
              >
                <Header
                  currentBoard={currentBoard}
                  socket={socket}
                  currentBoardIId={currentBoardIId}
                  theme={theme}
                  user={user}
                  Store={Store}
                />
                <Main
                  currentBoard={currentBoard}
                  setCurrentBoard={setCurrentBoard}
                  currentBoardIId={currentBoardIId}
                  socket={socket}
                  theme={theme}
                  sideShowen={sideShowen}
                  setSideShowen={setSideShowen}
                />
              </div>
            ) : currentBoardIId ? (
              <LoadingScreen loadingRef={loadingRef} />
            ) : (
              <div className=" tw-w-full tw-flex tw-items-center tw-justify-center tw-text-primColor tw-flex-col tw-gap-2">
                No Boards? no Problem
                <Popup
                  trigger={
                    <div
                      role="button"
                      tabindex="0"
                      className=" mainBtn tw-flex tw-items-center tw-p-2"
                    >
                      Create One Now
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
              </div>
            )}

            {/* <Main
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}

          /> */}
          </main>
          {isAnimating && (
            <main
              className={`${
                theme.current == "dark" ? "light" : "dark"
              } active tw-flex`}
            >
              {/* <Header currentBoard={currentBoard} /> */}
              <SideBar
                boards={boards}
                setBoards={setBoards}
                currentBoardIId={currentBoardIId}
                setCurrentBoardId={setCurrentBoardId}
                isAnimating={isAnimating}
                setIsAnimation={setIsAnimation}
                themeSwitch={themeSwitch}
                setThemeSwitch={setThemeSwitch}
                socket={socket}
                sideShowen={sideShowen}
                setSideShowen={setSideShowen}
                theme={theme}
                user={user}
                useNavigate={useNavigate}
              />
              {currentBoard ? (
                <div
                  className={`tw-flex tw-content-start tw-flex-wrap tw-w-full ${
                    sideShowen ? "lg:tw-w-4/5" : "tw-w-full"
                  }`}
                >
                  <Header
                    currentBoard={currentBoard}
                    socket={socket}
                    currentBoardIId={currentBoardIId}
                    theme={theme}
                    user={user}
                    Store={Store}
                  />
                  <Main
                    currentBoard={currentBoard}
                    setCurrentBoard={setCurrentBoard}
                    currentBoardIId={currentBoardIId}
                    socket={socket}
                    theme={theme}
                    sideShowen={sideShowen}
                    setSideShowen={setSideShowen}
                  />
                </div>
              ) : currentBoardIId ? (
                <LoadingScreen loadingRef={loadingRef} />
              ) : (
                <div className=" tw-w-full tw-flex tw-items-center tw-justify-center tw-text-primColor tw-flex-col tw-gap-2">
                  No Boards? no Problem
                  <Popup
                    trigger={
                      <div
                        role="button"
                        tabindex="0"
                        className=" mainBtn tw-flex tw-items-center tw-p-2"
                      >
                        Create One Now
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
                </div>
              )}

              {/* <Main
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}

        /> */}
            </main>
          )}
        </>
      )}
    </>
  );
}

export default App;
