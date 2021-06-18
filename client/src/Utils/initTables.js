import Axios from "axios"

const createTables = () => {
  Axios.post("http://localhost:3001/init").then((res) => {
    console.log(res);
  })
}

createTables()