import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import App from "./app/App";
import Dashboard from "./dashboard/dashboard";
import Login from "./dashboard/login";
import Register from "./dashboard/register";
import "./app.css";

import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";

const AnimationWrap = () => {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route exact path="/" element={<Dashboard Link={Link} />}></Route>
          <Route
            exact
            path="/signin"
            element={
              <Login
                ReactNotifications={ReactNotifications}
                Store={Store}
                Link={Link}
                useNavigate={useNavigate}
                user={user}
                setUser={setUser}
              />
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              <Register
                ReactNotifications={ReactNotifications}
                Store={Store}
                Link={Link}
                useNavigate={useNavigate}
                user={user}
                setUser={setUser}
              />
            }
          ></Route>
          <Route
            exact
            path="/app"
            element={
              <App
                ReactNotifications={ReactNotifications}
                Store={Store}
                Link={Link}
                useNavigate={useNavigate}
                user={user}
                setUser={setUser}
              />
            }
          ></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function Main() {
  return (
    <>
      <BrowserRouter>
        <AnimationWrap />
      </BrowserRouter>
    </>
  );
}
export default Main;
