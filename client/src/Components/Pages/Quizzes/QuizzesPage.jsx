import React, { useEffect } from "react";
import { getQuizzes } from "../../../Utils/Axios";

const QuizzesPage = () => {
  useEffect(() => {
    getQuizzes().then((res) => {
      console.log(res);
    });
  });
  return <div>Quizzes</div>;
};

export default QuizzesPage;
