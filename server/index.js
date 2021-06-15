import express from "express";
import mysql from "mysql"
import password from "./DBPassword.js";
import bodyParser from "body-parser";
import cors from "cors"
const app = express()

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  //  Password stored locally
  password: password,
  database: "cn"
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/a", (req, res) => {
  const sqlInsert = "insert into testtable (name, number) values ('Ash', 1)"
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    console.log(result);
    res.send("Hello s")
  })
})

//  Login
app.post("/auth/login", (req, res) => {
  const userName = req.body.userName
  const password = req.body.password
  const sqlSelect = "select * from users"

  db.query(sqlSelect, (err, result) => {
    let success = false
    let user;
    if (err) {
      res.send([err, success])
    } else if (!userName) {
      res.send(["Please enter a username", success])
    } else if (!password) {
      res.send(["Please enter a password", success])
    } else if (result) {
      //  Need to rewrite this later
      result.forEach(account => {
        if (account.UserName === userName && account.Password === password) {
          success = true
          user = account
          res.send({
            data: user,
            success: success
          })
        } else {
          res.send(["No user found with those credentials", success])
        }
      });
    } else {
      res.status(500).send(success)
      console.log(err);
      console.log(result);
    }
  })
})

//  Get All Quizzes
app.post("/quizzes/getAll", (req, res) => {
  const isAuthorised = req.body.isAuthorised
  if (isAuthorised) {
    const sqlSelect = "select * from quizzes"
    db.query(sqlSelect, (err, result) => {
      let success = false

      if (err) {
        res.send([err, success])
      } else if (result) {
        success = true
        res.send({
          data: result,
          success: success
        })
      } else {
        res.status(500).send(success)
        console.log(err);
        console.log(result);
      }
    })
  } else {
    return res.status(401).send("Unauthorised Access")
  }
})

//  Post New Quiz
app.post("/quizzes/postNewQuiz", (req, res) => {
  const isAuthorised = req.body.isAuthorised
  if (isAuthorised) {
    const sqlInsert = "insert into quizzes (name) values (?)"
    db.query(sqlInsert, req.body.quizName, (err, result) => {
      let success = false

      if (err) {
        res.send([err, success])
      } else if (result) {
        success = true
        res.send({
          data: result,
          success: success
        })
      } else {
        res.status(500).send(success)
        console.log(err);
        console.log(result);
      }
    })
  } else {
    return res.status(401).send("Unauthorised Access")
  }
})

app.post("/quizzes/deleteQuiz", (req, res) => {
  const isAuthorised = req.body.isAuthorised
  if (isAuthorised) {
    const sqlDelete = "delete from quizzes where id = ?"
    console.log([req.body.quizId]);
    db.query(sqlDelete, [req.body.quizId], (err, result) => {
      let success = false

      if (err) {
        res.send([err, success])
      } else if (result) {
        success = true
        res.send({
          data: result,
          success: success
        })
      } else {
        res.status(500).send(success)
        console.log(err);
        console.log(result);
      }
    })
  } else {
    return res.status(401).send("Unauthorised Access")
  }
})

app.listen(3001, () => {
  console.log("Listening on port 3001");
})