import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { deleteQuiz, getQuizzes, postNewQuiz } from "../../../Utils/Axios";
import "./QuizzesPage.css";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
const QuizzesPage = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [newQuizName, setNewQuizName] = useState("");
  const [quizErrorMessage, setQuizErrorMessage] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);

  useEffect(() => {
    callGetQuizzes();
    props.handleSetPath("Quizzes");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCardClick = (status) => {
    setNewQuizName("");
    setCreatingQuiz(status);
    setQuizErrorMessage(false);
  };

  const handleQuizNameChange = (e) => {
    setNewQuizName(e.target.value);
  };

  const handlePostNewQuiz = () => {
    setQuizErrorMessage(false);
    postNewQuiz(newQuizName).then((res) => {
      if (res.data.success) {
        setNewQuizName("");
        setCreatingQuiz(false);
        callGetQuizzes();
      } else {
        switch (res.data[0].code) {
          case "ER_DUP_ENTRY":
            setQuizErrorMessage("A quiz by this name already exists");
            break;

          default:
            break;
        }
      }
    });
  };

  const callGetQuizzes = () => {
    setIsLoadingQuizzes(true);
    getQuizzes().then((res) => {
      setIsLoadingQuizzes(false);
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

  const handleToggleDeleteDialog = (status) => {
    setIsDeleteDialogOpen(status);
  };

  return (
    <div className="quizzesPageContainer">
      {isLoadingQuizzes ? (
        <div className="questionsLoadingSpinner">
          <CircularProgress
            style={{ width: 100, height: 100, color: "#004d40" }}
          />
        </div>
      ) : (
        <div className="quizzesPage_cardsWrapper">
          {quizzes.map((quiz) => {
            return (
              <Card
                className="quizzesPage_quizCard"
                key={quiz.id}
                style={{
                  backgroundColor: "#004d40",
                  color: "#ffffff",
                  padding: 10,
                }}
              >
                <div className="quizzesPage_quizCardHeader">
                  <h2>{quiz.QuizName}</h2>
                </div>
                <CardActions className="quizzesPage_quizCardActions">
                  {props.authLevel > 2 && (
                    <Button
                      style={{ backgroundColor: "#d11a2a", color: "#ffffff" }}
                      variant="contained"
                      onClick={() => {
                        handleToggleDeleteDialog(true);
                        setSelectedQuiz(quiz.Id);
                      }}
                      endIcon={<DeleteForeverIcon />}
                    >
                      Delete Quiz
                    </Button>
                  )}
                  <Link
                    to={{
                      pathname: "/questions",
                      search: `?quizId=${quiz.Id}`,
                      state: { quizId: "true" },
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#00796b", color: "#ffffff" }}
                      endIcon={<VisibilityIcon />}
                    >
                      View Quiz
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
          {creatingQuiz ? (
            <Card className="quizzesPage_quizCard quizzesPage_newQuizCard">
              <CardContent>
                <TextField
                  label="Quiz Name"
                  value={newQuizName}
                  onChange={(e) => {
                    handleQuizNameChange(e);
                  }}
                  error={quizErrorMessage}
                  helperText={quizErrorMessage && quizErrorMessage}
                />
              </CardContent>
              <CardActions
                className="quizzesPage_newQuizCardActions"
                style={{ padding: "0 17px" }}
              >
                <Button
                  // style={{ backgroundColor: "#ffb74d", color: "#ffffff" }}
                  variant="outlined"
                  style={{
                    borderColor: "#00796b",
                    color: "#00796b",
                  }}
                  onClick={() => {
                    handleAddCardClick(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00796b", color: "#ffffff" }}
                  onClick={handlePostNewQuiz}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          ) : null}
          {props.authLevel < 3 && quizzes.length === 0 && (
            <h1>No Quizzes Yet</h1>
          )}
          {props.authLevel > 2 && (
            <Card
              className="quizzesPage_addCard"
              style={{ backgroundColor: "#00796b" }}
              onClick={() => {
                handleAddCardClick(true);
              }}
            >
              <h1>Create a new quiz</h1>
              <AddCircleOutlineIcon
                style={{ color: "#ffffff" }}
                fontSize="large"
              />
            </Card>
          )}
        </div>
      )}
      {!props.loggedIn && <Redirect to="/" />}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => {
          handleToggleDeleteDialog(false);
          setSelectedQuiz(null);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ backgroundColor: "#004d40", color: "#ffffff" }}
        >
          {"Delete this quiz for good?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#000000" }}
          >
            Deleting this quiz will also delete any questions and answers
            associated to this quiz. Are you sure you wan to delete this quiz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleToggleDeleteDialog(false);
              setSelectedQuiz(null);
            }}
            color="primary"
            variant="outlined"
            style={{
              borderColor: "#00796b",
              color: "#00796b",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleToggleDeleteDialog(false);
              handleDeleteQuiz(selectedQuiz);
              setSelectedQuiz(null);
            }}
            variant="contained"
            style={{ backgroundColor: "#d11a2a", color: "#ffffff" }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizzesPage;
