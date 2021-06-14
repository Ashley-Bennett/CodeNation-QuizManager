import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/Login/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/test">
            <h1>Test</h1>
          </Route>
          <Route path="/users"></Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
