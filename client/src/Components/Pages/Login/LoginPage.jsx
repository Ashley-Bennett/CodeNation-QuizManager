import React, { useState } from "react";
import { postLogin } from "../../../Utils/Axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import companyLogo from "../../../Assets/Images/Logo.png";
import {
  Button,
  TextField,
  CircularProgress,
  Divider,
} from "@material-ui/core";

import "./LoginPage.css";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [loggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(false);
    setIsLoggingIn(true);
    postLogin(userName, password).then((res) => {
      setIsLoggingIn(false);
      if (res.data.success) {
        props.handleLogIn(res.data.data);
      } else {
        setErrorMessage(res.data[0]);
      }
    });
  };

  return (
    <div className="loginPageContainer">
      <div className="loginPage_header">
        <img
          src={companyLogo}
          style={{ width: "70%", marginTop: 20 }}
          alt="WebbiSkools Logo"
        />
        <h1>Quiz Manager</h1>
      </div>
      <form
        autoComplete="on"
        className="loginPage_form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="loginPage_input">
          <TextField
            error={errorMessage}
            helperText={errorMessage && errorMessage}
            label="Username"
            style={{ textAlign: "center" }}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <Divider />
        <div className="loginPage_input">
          <TextField
            error={errorMessage}
            helperText={errorMessage && errorMessage}
            label="Password"
            style={{ textAlign: "center" }}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            color="#ffffff"
          />
        </div>

        <div className="loginPage_login">
          {loggingIn ? (
            <CircularProgress color="#004d40" />
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#004d40" }}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="loginPage_submit"
            >
              Login
            </Button>
          )}
        </div>
      </form>
      {props.loggedIn && <Redirect to="/quizzes" />}
    </div>
  );
};

export default withRouter(LoginPage);
