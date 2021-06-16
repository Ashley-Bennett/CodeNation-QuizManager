import React, { useState, useEffect } from "react";
import { postLogin } from "../../../Utils/Axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";


import Button from "@material-ui/core/Button";
import "./LoginPage.css";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    postLogin(userName, password).then(res => {
      if (res.data.success) {
        props.handleLogIn(res.data.data)
      }
    })
  }

  return (
    <div className="loginPageContainer">
      {/* Compnay Logo */}
      {/* <img src="" alt="" /> */}
      <h1>Quiz Manager</h1>
      <div className="loginPage_form">
        <div className="loginPage_input">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="loginPage_input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
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
