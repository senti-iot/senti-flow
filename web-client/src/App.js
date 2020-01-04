import React, { useEffect } from "react";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import {
  logoutUser,
  setUser,
  validateSession
} from "./redux/action/authActions";

const useStyles = makeStyles(theme => ({
  toastStyle: {
    paddingLeft: 20,
    textAlign: "left"
  }
}));

function App(props) {
  const { logoutUser, setUser } = props;
  const classes = useStyles();

  const notify = (text, type) => {
    toast[type](text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      bodyClassName: classes.toastStyle
    });
  };

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
            <Dashboard
              notify={(text, type) => notify(text, type)}
              cookie={cookie.load("SESSION")}
            />
          </Route>
        </Switch>
        <ToastContainer style={{ width: 400 }} />
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
