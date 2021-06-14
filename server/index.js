import express from "express";
import mysql from "mysql"
import password from "./DBPassword.js";
const app = express()

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  //  Password stored locally
  password: password,
  database: "cntest"
})

app.get("/", (req, res) => {
  const sqlInsert = "insert into testtable (name, number) values ('Ash', 1)"
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    console.log(result);
    res.send("Hello s")
  })
})


app.listen(3001, () => {
  console.log("Listening on port 3001");
})