import "./App.css";
import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./Utils/history";
import LoginPage from "./Components/Pages/Login/LoginPage";
import QuizzesPage from "./Components/Pages/Quizzes/QuizzesPage";
import QuestionsPage from "./Components/Pages/Questions/QuestionsPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
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
      setAuthLevel(sessionStorage.getItem("authLevel"));
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
    sessionStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true)
    //  Switch on user roles to set permissions
    getPermissionsForPermissionId(data.Permissions).then((res) => {
      if (res.data.success) {
        setAuthLevel(res.data.data[0].Level);
        sessionStorage.setItem("authLevel", res.data.data[0].Level);
      }
    });
  };

  const handleSetPath = (path) => {
    setPath(path);
  };

  return (
    <Router history={history}>
      {authLevel > 0 && (
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{path}</Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
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
            <QuizzesPage handleSetPath={handleSetPath} loggedIn={loggedIn}/>
          </Route>
          <Route path="/questions">
            <QuestionsPage handleSetPath={handleSetPath} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
