import Axios from "axios"

const postLogin = (userName, password) => {
  return new Promise((resolve) => {
    Axios.post("http://localhost:3001/auth/login", {
      userName: userName,
      password: password
    }).then((res) => {
      resolve(res);
    })
  })
}

const getQuizzes = () => {
  return new Promise ((resolve) => {
    Axios.get()
  })
}

export {
  postLogin
}