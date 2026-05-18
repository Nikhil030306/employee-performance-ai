import React, { useState } from "react";
import Login from "./components/Login";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AIRecommendations from "./components/AIRecommendations";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Employee Performance Analytics</h1>
      <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>Logout</button>
      <EmployeeForm />
      <EmployeeList />
      <AIRecommendations />
    </div>
  );
}

export default App;
