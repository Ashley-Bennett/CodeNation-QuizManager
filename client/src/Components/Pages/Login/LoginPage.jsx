import React, { useState } from "react";
import postLogin from "../../../Utils/PostLogin";
import Button from '@material-ui/core/Button';
import "./LoginPage.css"


const LoginPage = () => {
  const handleSubmit = () => {
    console.log("here");
    postLogin();
  };

  return (
    <div className="loginPageContainer">
      {/* Compnay Logo */}
      {/* <img src="" alt="" /> */}
      <h1>Quiz Manager</h1>
      <div className="loginPage_form">
        <div className="loginPage_input">
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName" />
        </div>
        <div className="loginPage_input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        
        <Button variant="contained" color="primary" onClick={handleSubmit} className="loginPage_submit">Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
