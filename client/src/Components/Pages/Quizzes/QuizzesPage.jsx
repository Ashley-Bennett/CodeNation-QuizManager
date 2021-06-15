import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { deleteQuiz, getQuizzes, postNewQuiz } from "../../../Utils/Axios";
import "./QuizzesPage.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [newQuizName, setNewQuizName] = useState("");

  useEffect(() => {
    callGetQuizzes();
  }, []);

  const handleAddCardClick = (status) => {
    setNewQuizName("");
    setCreatingQuiz(status);
  };

  const handleQuizNameChange = (e) => {
    setNewQuizName(e.target.value);
  };

  const handlePostNewQuiz = () => {
    console.log("post quiz", newQuizName);
    postNewQuiz(newQuizName).then((res) => {
      if (res.data.success) {
        setNewQuizName("");
        setCreatingQuiz(false);
        callGetQuizzes();
      }
    });
  };

  const callGetQuizzes = () => {
    getQuizzes().then((res) => {
      setQuizzes(res.data.data);
    });
  };

  const handleDeleteQuiz = (quizId) => {
    console.log(quizId);
    deleteQuiz(quizId).then((res) => {
      if (res.data.success) {
        callGetQuizzes();
      }
    });
    console.log("delete");
  };

  return (
    <div className="quizzesPageContainer">
      <h1>Quizzes</h1>
      <div className="quizzesPage_cardsWrapper">
        {quizzes.map((quiz) => {
          return (
            <Card className="quizzesPage_quizCard" key={quiz.id}>
              <CardContent>
                <Typography>{quiz.Name}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  style={{ backgroundColor: "#e57373", color: "#ffffff" }}
                  variant="contained"
                  onClick={() => {
                    handleDeleteQuiz(quiz.Id);
                  }}
                >
                  Delete
                </Button>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          );
        })}
        {creatingQuiz ? (
          <Card className="quizzesPage_quizCard">
            <CardContent>
              <label htmlFor="quizName">Quiz Name:</label>
              <input
                type="text"
                name="quizName"
                onChange={(e) => {
                  handleQuizNameChange(e);
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                style={{ backgroundColor: "#ffb74d", color: "#ffffff" }}
                variant="contained"
                onClick={() => {
                  handleAddCardClick(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePostNewQuiz}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        ) : null}
        <Card
          className="quizzesPage_addCard"
          style={{ backgroundColor: "#4caf50" }}
          onClick={() => {
            handleAddCardClick(true);
          }}
        >
          <AddCircleOutlineIcon style={{ color: "#ffffff" }} />
        </Card>
      </div>
    </div>
  );
};

export default QuizzesPage;
