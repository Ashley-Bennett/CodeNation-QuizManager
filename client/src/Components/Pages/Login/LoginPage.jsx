import React, { useState, useEffect } from "react";
import { postLogin } from "../../../Utils/Axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@material-ui/core";

import "./LoginPage.css";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    postLogin(userName, password).then((res) => {
      if (res.data.success) {
        props.handleLogIn(res.data.data);
      }
    });
  };

  return (
    <div className="loginPageContainer">
      {/* Compnay Logo */}
      {/* <img src="" alt="" /> */}
      <div className="loginPage_header">
        <h1>Quiz Manager</h1>
      </div>
      <div className="loginPage_form">
        <div className="loginPage_input">
          <TextField
            label="Username"
            style={{ textAlign: "center" }}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="loginPage_input">
          <TextField
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

        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#004d40", margin: "20px 0 0 0" }}
          onClick={handleSubmit}
          className="loginPage_submit"
        >
          Login
        </Button>
      </div>
      {props.loggedIn ? <Redirect to="/quizzes" /> : null}
    </div>
  );
};

export default withRouter(LoginPage);
