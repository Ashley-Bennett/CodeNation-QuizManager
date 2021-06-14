import React, { useState, useEffect } from "react";
import { postLogin } from "../../../Utils/Axios";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";


import Button from "@material-ui/core/Button";
import "./LoginPage.css";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem("isLoggedIn") === "true"){
      setLoggedIn(true)
    }
  }, [])

  const handleSubmit = () => {
    postLogin(userName, password).then(res => {
      console.log(res);
      if (res.data.success) {
        console.log("here");
        setLoggedIn(true)
        sessionStorage.setItem("isLoggedIn", "true")
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
      {loggedIn ? <Redirect to="/quizzes" /> : null}
    </div>
  );
};

export default withRouter(LoginPage);
