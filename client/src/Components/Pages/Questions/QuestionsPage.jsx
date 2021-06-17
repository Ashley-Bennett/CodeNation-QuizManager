import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getAllQuestionsForQuiz, postNewQuestion } from "../../../Utils/Axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Answers from "../../Answers/Answers";
import "./QuestionsPage.css";

const QuestionsPage = (props) => {
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let searchQuery = window.location.search;
    const urlParams = new URLSearchParams(searchQuery);
    setQuizId(urlParams.get("quizId"));
    callGetAllQuestionsForQuiz(urlParams.get("quizId"));
    props.handleSetPath("Questions");
  }, []);

  const callGetAllQuestionsForQuiz = (initQuizId) => {
    getAllQuestionsForQuiz(quizId || initQuizId).then((res) => {
      if (res.data.success) {
        setQuestions(res.data.data);
      }
    });
  };

  const handleAddNewQuestion = () => {
    postNewQuestion(quizId).then((res) => {
      if (res.data.success) {
        callGetAllQuestionsForQuiz();
      }
    });
  };

  return (
    <div className="questionsPageContainer">
      <ol className="questionAccordion">
        {questions.map((question) => {
          return (
            <Accordion
              style={{ borderRadius: 20, margin: "10px 0" }}
              className="questionsPage_question"
              disabled={props.authLevel > 1 ? false : true}
            >
              <AccordionSummary
                style={{
                  backgroundColor: "#004d40",
                  color: "#ffffff",
                  borderRadius: 20,
                  paddingLeft: 30,
                }}
                className="questionsPage_questionHeader"
                expandIcon={<ExpandMoreIcon style={{ color: "#ffffff" }} />}
              >
                <li>
                  <h2>{question.Question}</h2>
                </li>
              </AccordionSummary>
              <AccordionDetails>
                <Answers
                  authLevel={props.authLevel}
                  questionId={question.Id}
                  question={question.Question}
                  callGetAllQuestionsForQuiz={callGetAllQuestionsForQuiz}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </ol>
      {props.authLevel < 3 && questions.length === 0 && (
        <h1>No Questions Yet</h1>
      )}
      {props.authLevel > 2 && (
        <Button
            style={{ backgroundColor: "#00796b",color: "#ffffff" }}
            className="questionsPage_addQuestionBox"
          onClick={handleAddNewQuestion}
        >
          Add a question
        </Button>
        // <Accordion>
        //   <AccordionSummary
        //     className="questionsPage_addQuestionBox"
        //     expandIcon={<AddCircleOutlineIcon style={{ color: "#ffffff" }} />}
        //     onClick={handleAddNewQuestion}
        //   >
        //     Add a question
        //   </AccordionSummary>
        // </Accordion>
      )}
      {!props.loggedIn && <Redirect to="/" />}
    </div>
  );
};

export default QuestionsPage;
