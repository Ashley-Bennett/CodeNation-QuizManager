import "./App.css";
import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./Utils/history";
import LoginPage from "./Components/Pages/Login/LoginPage";
import QuizzesPage from "./Components/Pages/Quizzes/QuizzesPage";
import QuestionsPage from "./Components/Pages/Questions/QuestionsPage";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Breadcrumbs,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { getPermissionsForPermissionId } from "./Utils/Axios";

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [authLevel, setAuthLevel] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [path, setPath] = useState("");
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setLoggedIn(true);
    }
    if (sessionStorage.getItem("authLevel")) {
      setAuthLevel(parseInt(sessionStorage.getItem("authLevel")));
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    setAuthLevel(0);
    setLoggedIn(false);
    history.push("/");
  };

  const handleLogIn = (data) => {
    //  Switch on user roles to set permissions
    getPermissionsForPermissionId(data.Permissions).then((res) => {
      if (res.data.success) {
        setAuthLevel(res.data.data[0].Id);
        setLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("authLevel", res.data.data[0].Id);
      }
    });
  };

  const handleSetPath = (path) => {
    setPath(path);
  };

  return (
    <Router history={history}>
      {authLevel > 0 && (
        <AppBar position="sticky" style={{ backgroundColor: "#004d40" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {path === "Questions" ? (
              <Link color="#ffffff" to="/quizzes/">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00796b", color: "#ffffff" }}
                >
                  Back
                </Button>
              </Link>
            ) : (
              <div style={{ width: 70 }} />
            )}
            {path === "Questions" ? (
              <Breadcrumbs style={{ color: "#ffffff" }}>
                <Link
                  style={{ color: "#ffffff", textDecoration: "underlined" }}
                  to="/quizzes/"
                >
                  <h1 style={{ margin: 0 }}>Quizzes</h1>
                </Link>
                <h1 style={{ margin: 0 }}>Questions</h1>
              </Breadcrumbs>
            ) : (
              <h1 style={{ margin: 0 }}>Quizzes</h1>
            )}
            <div>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleLogOut();
                    handleClose();
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginPage loggedIn={loggedIn} handleLogIn={handleLogIn} />
          </Route>
          <Route path="/quizzes">
            <QuizzesPage
              authLevel={authLevel}
              handleSetPath={handleSetPath}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/questions">
            <QuestionsPage
              authLevel={authLevel}
              handleSetPath={handleSetPath}
              loggedIn={loggedIn}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
