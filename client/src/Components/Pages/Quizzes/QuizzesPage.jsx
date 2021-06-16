import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { deleteQuiz, getQuizzes, postNewQuiz } from "../../../Utils/Axios";
import "./QuizzesPage.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const QuizzesPage = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [newQuizName, setNewQuizName] = useState("");

  useEffect(() => {
    callGetQuizzes();
    props.handleSetPath("Quizzes");
  }, []);

  const handleAddCardClick = (status) => {
    setNewQuizName("");
    setCreatingQuiz(status);
  };

  const handleQuizNameChange = (e) => {
    setNewQuizName(e.target.value);
  };

  const handlePostNewQuiz = () => {
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
    deleteQuiz(quizId).then((res) => {
      if (res.data.success) {
        callGetQuizzes();
      }
    });
  };

  return (
    <div className="quizzesPageContainer">
      <div className="quizzesPage_cardsWrapper">
        {quizzes.map((quiz) => {
          return (
            <Card className="quizzesPage_quizCard" key={quiz.id}>
              <CardContent>
                <Typography>{quiz.Name}</Typography>
              </CardContent>
              <CardActions>
                {props.authLevel > 2 && (
                  <Button
                    style={{ backgroundColor: "#e57373", color: "#ffffff" }}
                    variant="contained"
                    onClick={() => {
                      handleDeleteQuiz(quiz.Id);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Link
                  to={{
                    pathname: "/questions",
                    search: `?quizId=${quiz.Id}`,
                    state: { quizId: "true" },
                  }}
                >
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </Link>
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
        {props.authLevel < 3 && quizzes.length === 0 && <h1>No Quizzes Yet</h1>}
        {props.authLevel > 2 && (
          <Card
            className="quizzesPage_addCard"
            style={{ backgroundColor: "#4caf50" }}
            onClick={() => {
              handleAddCardClick(true);
            }}
          >
            <AddCircleOutlineIcon style={{ color: "#ffffff" }} />
          </Card>
        )}
      </div>
      {!props.loggedIn && <Redirect to="/" />}
    </div>
  );
};

export default QuizzesPage;
