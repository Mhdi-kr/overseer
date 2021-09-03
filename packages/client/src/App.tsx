import './index.css';
import React from "react";
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';
import RegistrationView from './views/registrationView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
 
  return (
      <Router>
      <Switch>
        <Route path="/login">
          <LoginView />
        </Route>
        <Route path="/register">
          <RegistrationView />
        </Route>
        <Route path="/dashboard">
          <DashboardView />
        </Route>
      </Switch>
    </Router >
  )
}

export default App;