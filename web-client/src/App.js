import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/login" component={Login} />
        <Route path="/dashborad" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
