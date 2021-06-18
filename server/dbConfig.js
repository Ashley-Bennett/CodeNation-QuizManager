import password from "./DBPassword.js";

const dbconfig = {
  host: "localhost",
  user: "root",
  password: password,
  database: "cn_test",
  multipleStatements: true
};


export default dbconfig;