import Axios from "axios"
import prompt from 'prompt';

const createUser = (userName, password,permissionsId) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/auth/createUser", {
      userName: userName,
      password: password,
      permissionsId: permissionsId
    }).then((res) => {
      resolve(res)
    })
  })
}


prompt.start();

prompt.get(['Username', 'Password', "PermissionsId"], function (err, result) {
  if (err) {
    return onErr(err);
  }
  createUser(result.Username, result.Password, result.PermissionsId).then(
    res => {
      console.log(res);
    }
  )
});

const onErr = (err) => {
  console.log(err);
  return 1;
}