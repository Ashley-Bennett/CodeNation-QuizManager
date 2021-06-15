import React, { useEffect, useState } from "react";
import {
  deleteAnswer,
  getAllAnswersForQuestion,
  postAnswersForQuestion,
} from "../../Utils/Axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

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
    );
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

  return (
    <div>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => handleQuestionChange(e)}
      />
      {answers.map((answer, index) => {
        return (
          <div>
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              value={answer.Answer}
              onChange={(e) => {
                handleChangeAnswer(e, index);
              }}
            />
            <input
              type="checkbox"
              name=""
              id=""
              checked={answer.IsCorrect}
              value={answer.IsCorrect}
              onChange={(e) => {
                handleChangeAnswerCorrect(e, index);
              }}
            />
            {answers.length > 3 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleDeleteAnswer(index);
                }}
              >
                Delete
              </Button>
            ) : null}
          </div>
        );
      })}
      {answers.length < 5 ? (
        <Button variant="contained" color="primary" onClick={handleNewAnswer}>
          Add Question
        </Button>
      ) : null}
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default Answers;
