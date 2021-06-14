import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/Login/LoginPage";
import QuizzesPage from "./Components/Pages/Quizzes/QuizzesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/test">
            <h1>Test</h1>
          </Route>
          <Route path="/users"></Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/quizzes">
            <QuizzesPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
