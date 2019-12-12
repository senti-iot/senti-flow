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
const whyDidYouRender = require("@welldone-software/why-did-you-render");
whyDidYouRender(React);

function App(props) {
  const { logoutUser, setUser } = props;

  useEffect(() => {
    if (!cookie.load("SESSION")) {
      logoutUser();
    } else {
      validateSession();
      setUser();
    }
  }, [logoutUser, setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/(login||)/">
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
