import React, { useEffect, useState } from "react";
import {
  deleteAnswer,
  deleteQuestion,
  getAllAnswersForQuestion,
  postAnswersForQuestion,
} from "../../Utils/Axios";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";

import "./Answers.css";

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(props.question);
    callGetAllAnswers();
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
    newArr[answerIndex].Answer = e.target.value;
    setAnswers(
      answers.map((item) =>
        item.id === answerIndex ? (item.Answer = e.target.value) : item
      )
    );
  };

  const handleChangeAnswerCorrect = (e, answerIndex) => {
    console.log(e.target.value);
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
      }
    });
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
                        value={answer.Answer}
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
                                style={{color: "#00796b"}}
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
                        <Button
                          variant="outlined"
                          style={{
                            borderColor: "#d11a2a",
                            color: "#d11a2a",
                          }}
                          onClick={() => {
                            handleDeleteAnswer(index);
                          }}
                        >
                          <DeleteForeverIcon />
                        </Button>
                      ) : null}
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
                color="primary"
                onClick={handleNewAnswer}
              >
                Add Answer
                <AddCircleOutlineIcon style={{margin: "0 0 0 10"}} />
              </Button>
            ) : null}
            <div className="answersBottomRow_standard">
              <Button
                variant="contained"
                style={{ backgroundColor: "#4caf50", color: "#ffffff" }}
                onClick={handleUpdate}
              >
                Save And Update <SaveIcon style={{margin: "0 0 0 10"}} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#d11a2a", color: "#ffffff" }}
                onClick={handleDeleteQuestion}
              >
                Delete Question <DeleteForeverIcon  style={{margin: "0 0 0 10"}}/>
              </Button>
            </div>
          </div>
        </div>
      )}
      {props.authLevel === 2 && (
        <ol type="A">
          {answers.map((answer) => {
            return <li>{answer.Answer}</li>;
          })}
        </ol>
      )}
      
    </div>
  );
};

export default Answers;
