import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeList({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [searchDept, setSearchDept] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEmployees(res.data);
  };

  const handleSearch = async () => {
    if (!searchDept) {
      fetchEmployees();
      return;
    }
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:5000/api/employees/search?department=${searchDept}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    }
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
      <h3>📋 Employee List</h3>
      <div>
        <input type="text" placeholder="Search by department..." value={searchDept} onChange={(e) => setSearchDept(e.target.value)} style={{ padding: "8px", marginRight: "10px" }} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchEmployees}>Reset</button>
      </div>
      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Department</th><th>Skills</th><th>Score</th><th>Experience</th><th>Action</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td><td>{emp.email}</td><td>{emp.department}</td>
              <td>{emp.skills?.join(", ")}</td><td>{emp.performanceScore}</td><td>{emp.experience}</td>
              <td><button onClick={() => handleDelete(emp.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
