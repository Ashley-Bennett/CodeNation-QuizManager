import Axios from "axios"

const createEditUser = (userName, password) => {
  Axios.post("http://localhost:3001/auth/createUser", {
    userName: userName,
    password: password,
    permissionsId: 1
  }).then((res) => {
    console.log(res);
  })
}
