import React, { useEffect, useState } from "react";
import { getAllQuestionsForQuiz, postNewQuestion } from "../../../Utils/Axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Answers from "../../Answers/Answers";
import "./QuestionsPage.css";

const QuestionsPage = () => {
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let searchQuery = window.location.search;
    const urlParams = new URLSearchParams(searchQuery);
    setQuizId(urlParams.get("quizId"));
    callGetAllQuestionsForQuiz(urlParams.get("quizId"));
  }, []);

  const callGetAllQuestionsForQuiz = (initQuizId) => {
    getAllQuestionsForQuiz(quizId || initQuizId).then((res) => {
      if (res.data.success) {
        setQuestions(res.data.data);
      }
    });
  };

  const handleAddNewQuestion = () => {
    postNewQuestion().then((res) => {
      if (res.data.success) {
        callGetAllQuestionsForQuiz();
      }
    });
  };

  return (
    <div className="questionsPageContainer">
      <h1>Questions</h1>
      {questions.map((question) => {
        return (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {question.Question}
            </AccordionSummary>
            <AccordionDetails>
              <Answers
                questionId={question.Id}
                question={question.Question}
                callGetAllQuestionsForQuiz={callGetAllQuestionsForQuiz}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Accordion>
        <AccordionSummary
          className="questionsPage_addQuestionBox"
          expandIcon={<AddCircleOutlineIcon style={{ color: "#ffffff" }} />}
          onClick={handleAddNewQuestion}
        >
          Add a question
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

export default QuestionsPage;
