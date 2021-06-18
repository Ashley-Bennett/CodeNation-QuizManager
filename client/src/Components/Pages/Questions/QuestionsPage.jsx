import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getAllQuestionsForQuiz, postNewQuestion } from "../../../Utils/Axios";
import {
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

import Answers from "../../Answers/Answers";
import "./QuestionsPage.css";

const QuestionsPage = (props) => {
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  useEffect(() => {
    let searchQuery = window.location.search;
    const urlParams = new URLSearchParams(searchQuery);
    setQuizId(urlParams.get("quizId"));
    callGetAllQuestionsForQuiz(urlParams.get("quizId"));
    props.handleSetPath("Questions");
  }, []);

  const callGetAllQuestionsForQuiz = (initQuizId) => {
    setIsLoadingQuestions(true);
    setQuestions([]);
    getAllQuestionsForQuiz(quizId || initQuizId).then((res) => {
      setIsLoadingQuestions(false);
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
      {isLoadingQuestions ? (
        <div className="questionsLoadingSpinner">
          <CircularProgress
            style={{ width: 100, height: 100, color: "#004d40" }}
          />
        </div>
      ) : (
        <>
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
                      opacity: 1,
                    }}
                    className="questionsPage_questionHeader"
                    expandIcon={
                      props.authLevel > 1 ? (
                        <ExpandMoreIcon style={{ color: "#ffffff" }} />
                      ) : (
                        <NotInterestedIcon style={{ color: "#ffffff" }} />
                      )
                    }
                  >
                    <li>
                      <h2>{question.QuestionName}</h2>
                    </li>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Answers
                      authLevel={props.authLevel}
                      questionId={question.Id}
                      question={question.QuestionName}
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
              style={{ backgroundColor: "#00796b", color: "#ffffff" }}
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
        </>
      )}
      {!props.loggedIn && <Redirect to="/" />}
    </div>
  );
};

export default QuestionsPage;
