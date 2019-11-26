import React, { useEffect } from "react";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import {
  logoutUser,
  setUser,
  validateSession
} from "./redux/action/authActions";

function App(props) {
  useEffect(() => {
    if (!cookie.load("SESSION")) {
      props.logoutUser();
    } else {
      validateSession();
      props.setUser();
    }
  }, [props]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  logoutUser,
  setUser,
  validateSession
})(App);
