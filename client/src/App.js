import "./App.css";
import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { getPermissionsForPermissionId } from "./Utils/Axios";
import { Button } from "@material-ui/core";

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
        setAuthLevel(res.data.data[0].Level);
        setLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
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
        <AppBar position="static" style={{ backgroundColor: "#004d40" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {path === "Questions" ? (
              <Link color="#ffffff" to="/quizzes/">
                <Button variant="contained" color="secondary">
                  Back
                </Button>
              </Link>
            ) : (
              <div style={{width: 70}}/>
            )}
            {path === "Questions" ? (
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="#ffffff" to="/quizzes/">
                  Quizzes
                </Link>
                <Typography color="#ffffff">Questions</Typography>
              </Breadcrumbs>
            ) : (
              <Typography color="#ffffff">Quizzes</Typography>
            )}
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
