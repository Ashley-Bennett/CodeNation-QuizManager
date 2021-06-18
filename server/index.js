import express from "express";
import mysql from "mysql"
import password from "./DBPassword.js";
import bodyParser from "body-parser";
import cors from "cors"
import bcrypt from "bcryptjs"
import sqlCreateTables from "./initSqlTables.js";
const app = express()

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  //  Password stored locally
  password: password,
  database: "cn_test",
  multipleStatements: true
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

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
      for (let i = 0; i < result.length; i++) {
        const account = result[i];
        if (account.UserName === userName && bcrypt.compareSync(password, account.Password)) {
          
          success = true
          user = account
          break
        }
      }

      if (success) {
        res.send({
          data: user,
          success: success
        })
      } else {
        res.send(["No user found with those credentials", success])
      }

    } else {
      res.status(500).send(success)
      console.log(err);
      console.log(result);
    }
  })
})

// Get Permissions
app.post("/auth/permissions", (req, res) => {
  const sqlSelect = "select * from permissions where id = ?"

  db.query(sqlSelect, [req.body.permissionId], (err, result) => {
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

app.post("/questions/getAll", (req, res) => {
  const isAuthorised = req.body.isAuthorised
  if (isAuthorised) {
    const sqlSelect = "select * from question where quiz = ?"
    db.query(sqlSelect, [req.body.quizId], (err, result) => {
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

app.post("/answers/getAll", (req, res) => {
  const isAuthorised = req.body.isAuthorised
  if (isAuthorised) {
    const sqlSelect = "select * from answers where question = ?"
    db.query(sqlSelect, [req.body.questionId], (err, result) => {
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

app.post("/answers/deleteAnswer", (req, res) => {
  const isAuthorised = req.body.isAuthorised

  const sqlDelete = "delete from answers where id = ?"
  db.query(sqlDelete, [req.body.id], (err, result) => {
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
})

//  Delete Question
app.post("/questions/deleteQuestion", (req, res) => {
  const isAuthorised = req.body.isAuthorised

  const sqlDelete = "delete from answers where question = ?; delete from question where id = ?"
  db.query(sqlDelete, [req.body.questionId, req.body.questionId], (err, result) => {
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
})

//  Post Answers
app.post("/answers/postAnswers", (req, res) => {
  const isAuthorised = req.body.isAuthorised

  const question = req.body.question
  const answers = req.body.answers
  const questionId = req.body.questionId

  console.log(246, question);
  console.log(247, answers);
  console.log(248, questionId);

  if (isAuthorised) {
    if (question) {
      const sqlPut = "update cn.question set question = ? where id = ?"
      db.query(sqlPut, [question, questionId], (err, result) => {
        console.log(265, err);
        console.log(266, result);
      })
    }
    if (answers) {
      //  Sort answers
      let existingAnswers = []
      let newAnswers = []
      answers.map(answer => {
        var keyNames = Object.keys(answer)
        keyNames.includes("Id") ? existingAnswers.push(answer) : newAnswers.push(answer)
      })

      // update existing answers
      existingAnswers.forEach(answer => {
        const sqlPut = "update answers set answer = ?, iscorrect = ? where id = ?"
        db.query(sqlPut, [answer.Answer, answer.IsCorrect, answer.Id], (err, result) => {
          console.log(284, err);
        })
      })

      // Add new answers
      newAnswers.forEach(answer => {
        const sqlPost = "insert into answers (answer, iscorrect, question) values (?, ?, ?)"
        db.query(sqlPost, [answer.Answer, answer.IsCorrect, questionId], (err, result) => {
          console.log(303, err);
          console.log(304, result);
        })
      })
    }

    res.send({
      success: true
    })

  } else {
    return res.status(401).send("Unauthorised Access")
  }
})

//  Post new question
app.post("/questions/postNewQuestion", (req, res) => {
  const isAuthorised = req.body.isAuthorised

  const sqlInsert = "insert into question (question, quiz) values ('New Question', ?); SELECT LAST_INSERT_ID();"
  db.query(sqlInsert, [req.body.quizId], (err, result) => {
    let success = false
    if (err) {
      res.send([err, success])
    } else if (result) {
      const questionId = Object.values(result[1][0])[0]
      //  Insert default answers
      const sqlInsertAnswers = "insert into answers (answer, iscorrect, question) values ('Answer', true, ?);insert into answers (answer, iscorrect, question) values ('Answer', false, ?);insert into answers (answer, iscorrect, question) values ('Answer', false, ?);"
      db.query(sqlInsertAnswers, [questionId, questionId, questionId], (err, result) => {
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
      res.status(500).send(success)
      console.log(err);
      console.log(result);
    }
  })
})

//  Create a user
app.post("/auth/createUser", (req, res) => {
  const sqlSelect = "insert into users (username, password, permissions) values (?, ?, ?)"
  db.query(sqlSelect, [req.body.userName, bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()), req.body.permissionsId], (err, result) => {
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
})

//  Create initial tables
app.post("/init", (req, res) => {
  const sqlInsert = sqlCreateTables
  db.query(sqlInsert,(err, result) => {
    let success = false
    if (err) {
      res.send([err, success])
    } else if (result) {
      success = true
      console.log(result);
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
})

app.listen(3001, () => {
  console.log("Listening on port 3001");
})[0]