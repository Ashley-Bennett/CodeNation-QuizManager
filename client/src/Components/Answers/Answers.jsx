import React, { useEffect, useState } from "react";
import {
  deleteAnswer,
  deleteQuestion,
  getAllAnswersForQuestion,
  postAnswersForQuestion,
} from "../../Utils/Axios";
import {
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";

import "./Answers.css";

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setQuestion(props.question);
    callGetAllAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callGetAllAnswers = () => {
    getAllAnswersForQuestion(props.questionId).then((res) => {
      if (res.data.success) {
        setAnswers(res.data.data);
      }
    });
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChangeAnswer = (e, answerIndex) => {
    let newArr = [...answers];
    newArr[answerIndex].AnswerName = e.target.value;
    setAnswers(
      answers.map((item) =>
        item.id === answerIndex ? (item.AnswerName = e.target.value) : item
      )
    );
  };

  const handleChangeAnswerCorrect = (e, answerIndex) => {
    let isCorrect = e.target.value === "1" ? 0 : 1;
    let newArr = [...answers];
    newArr[answerIndex].IsCorrect = isCorrect;

    setAnswers(
      answers.map((item) =>
        item.id === answerIndex ? (item.IsCorrect = isCorrect) : item
      )
    );
  };

  const handleUpdate = () => {
    postAnswersForQuestion(
      props.questionId,
      question === props.question ? null : question,
      answers
    ).then((res) => {
      if (res.data.success) {
        callGetAllAnswers();
        props.callGetAllQuestionsForQuiz();
      }
    });
  };

  const handleDeleteAnswer = (answerIndex) => {
    if (answers[answerIndex].Id) {
      deleteAnswer(answers[answerIndex].Id).then((res) => {
        if (res.data.success) {
          callGetAllAnswers();
        }
      });
    } else {
      let newArr = [...answers];
      newArr.splice(answerIndex, 1);
      setAnswers(newArr);
    }
  };

  const handleNewAnswer = () => {
    let newArr = [...answers];
    newArr.push({
      Answer: "",
      IsCorrect: 0,
      Question: props.questionId,
      IsDeleted: 0,
    });

    setAnswers(newArr);
  };

  const handleDeleteQuestion = () => {
    deleteQuestion(props.questionId).then((res) => {
      if (res.data.success) {
        props.callGetAllQuestionsForQuiz();
        callGetAllAnswers();
      }
    });
  };

  const handleToggleDeleteDialog = (status) => {
    setIsDeleteDialogOpen(status);
  };

  return (
    <div className="answersContainer">
      {props.authLevel > 2 && (
        <div className="answersEditContainer">
          <div className="answersTopRow">
            <TextField
              className="answers_questionInput"
              label="Question"
              value={question}
              onChange={(e) => handleQuestionChange(e)}
            />
          </div>
          <ol className="answersMidRow" type="A">
            {answers.map((answer, index) => {
              return (
                <>
                  <li>
                    <div className="answers_answers">
                      <TextField
                        label="Answer"
                        value={answer.AnswerName}
                        onChange={(e) => {
                          handleChangeAnswer(e, index);
                        }}
                      />
                      <div className="answers_checkbox">
                        {index === 0 ? (
                          <FormControlLabel
                            value=""
                            control={
                              <Checkbox
                                style={{ color: "#00796b" }}
                                checked={answer.IsCorrect}
                                value={answer.IsCorrect}
                                onChange={(e) => {
                                  handleChangeAnswerCorrect(e, index);
                                }}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                              />
                            }
                            label="Is A Correct Answer"
                            labelPlacement="top"
                          />
                        ) : (
                          <Checkbox
                            style={{ color: "#00796b" }}
                            color="primary"
                            checked={answer.IsCorrect}
                            value={answer.IsCorrect}
                            onChange={(e) => {
                              handleChangeAnswerCorrect(e, index);
                            }}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        )}
                      </div>
                      {answers.length > 3 ? (
                        <IconButton
                          onClick={() => {
                            handleDeleteAnswer(index);
                          }}
                          color="#d11a2a"
                          aria-label="upload picture"
                          component="span"
                        >
                          <DeleteForeverIcon
                            style={{
                              borderColor: "#d11a2a",
                              color: "#d11a2a",
                            }}
                          />
                        </IconButton>
                      ) : //   <Button
                      //     variant="outlined"
                      // style={{
                      //   borderColor: "#d11a2a",
                      //   color: "#d11a2a",
                      // }}
                      //     onClick={() => {
                      //       handleDeleteAnswer(index);
                      //     }}
                      // endIcon={<VisibilityIcon />}

                      //   >
                      //     <DeleteForeverIcon />
                      //   </Button>
                      null}
                    </div>
                  </li>
                  <Divider />
                </>
              );
            })}
          </ol>
          <div className="answersBottomRow">
            {answers.length < 5 ? (
              <Button
                variant="outlined"
                onClick={handleNewAnswer}
                style={{
                  borderColor: "#00796b",
                  color: "#00796b",
                }}
                endIcon={<AddCircleOutlineIcon />}
              >
                Add Answer
              </Button>
            ) : null}
            <div className="answersBottomRow_standard">
              <Button
                variant="contained"
                style={{ backgroundColor: "#00796b", color: "#ffffff" }}
                onClick={handleUpdate}
                endIcon={<SaveIcon />}
              >
                Save And Update
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#d11a2a", color: "#ffffff" }}
                onClick={() => handleToggleDeleteDialog(true)}
                endIcon={<DeleteForeverIcon />}
              >
                Delete Question
              </Button>
            </div>
          </div>
        </div>
      )}
      {props.authLevel === 2 && (
        <ol className="answers_viewModeContainer" type="A">
          {answers.map((answer) => {
            return (
              <>
                <li className="answers_viewModeAnswers">{answer.Answer}</li>
                <Divider variant="middle" />
              </>
            );
          })}
        </ol>
      )}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => handleToggleDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ backgroundColor: "#004d40", color: "#ffffff" }}
        >
          {"Delete this question for good?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#000000" }}
          >
            Deleting this question will also delete any answers associated to
            this question. Are you sure you wan to delete this question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleToggleDeleteDialog(false)}
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
              handleDeleteQuestion();
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

export default Answers;
