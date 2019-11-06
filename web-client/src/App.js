import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
      {/* <Login></Login> */}
    </div>
  );
}

export default App;
