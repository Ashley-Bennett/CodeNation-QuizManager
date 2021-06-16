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
  return new Promise((resolve) => {
    Axios.post("http://localhost:3001/quizzes/getAll", {
      isAuthorised: true
    }).then(res => {
      resolve(res)
    })
  })
}

const postNewQuiz = (quizName) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/quizzes/postNewQuiz", {
      isAuthorised: true,
      quizName: quizName
    }).then(res => {
      resolve(res)
    })
  })
}

const deleteQuiz = (quizId) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/quizzes/deleteQuiz", {
      isAuthorised: true,
      quizId: quizId
    }).then(res => {
      resolve(res)
    })
  })
}

const getAllQuestionsForQuiz = (quizId) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/questions/getAll", {
      isAuthorised: true,
      quizId: quizId
    }).then(res => {
      resolve(res)
    })
  })
}

const getAllAnswersForQuestion = (questionId) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/answers/getAll", {
      isAuthorised: true,
      questionId: questionId
    }).then(res => {
      resolve(res)
    })
  })
}

const postAnswersForQuestion = (questionId, question, answers) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/answers/postAnswers", {
      isAuthorised: true,
      questionId: questionId,
      question: question,
      answers: answers,
    }).then(res => {
      resolve(res)
    })
  })
}
const deleteAnswer = (id) => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/answers/deleteAnswer", {
      isAuthorised: true,
      id: id,
    }).then(res => {
      resolve(res)
    })
  })
}

const deleteQuestion = questionId => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/questions/deleteQuestion", {
      isAuthorised: true,
      questionId: questionId,
    }).then(res => {
      resolve(res)
    })
  })
}

const postNewQuestion = quizId => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/questions/postNewQuestion", {
      isAuthorised: true,
      quizId
    }).then(res => {
      resolve(res)
    })
  })
}

const getPermissionsForPermissionId = permissionId => {
  return new Promise(resolve => {
    Axios.post("http://localhost:3001/auth/permissions", {
      isAuthorised: true,
      permissionId: permissionId
    }).then(res => {
      resolve(res)
    })
  })
}

export {
  postLogin,
  getQuizzes,
  postNewQuiz,
  deleteQuiz,
  getAllQuestionsForQuiz,
  getAllAnswersForQuestion,
  postAnswersForQuestion,
  deleteAnswer,
  deleteQuestion,
  postNewQuestion,
  getPermissionsForPermissionId

}