import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
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

export default App;
