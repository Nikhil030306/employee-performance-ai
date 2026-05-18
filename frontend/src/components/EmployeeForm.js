import React, { useState } from "react";
import axios from "axios";

function EmployeeForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    name: "", email: "", department: "", skills: "", performanceScore: "", experience: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const employeeData = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      skills: formData.skills.split(",").map(s => s.trim()),
      performanceScore: Number(formData.performanceScore),
      experience: Number(formData.experience)
    };
    try {
      await axios.post("http://localhost:5000/api/employees", employeeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Employee added successfully!");
      setFormData({ name: "", email: "", department: "", skills: "", performanceScore: "", experience: "" });
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (err) {
      alert(err.response?.data?.error || "Error adding employee");
    }
  };

  return (
    <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
      <h3>➕ Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="number" name="performanceScore" placeholder="Performance Score (0-100)" value={formData.performanceScore} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} style={{ width: "100%", padding: "8px", margin: "5px 0" }} required />
        <button type="submit" style={{ background: "#28a745", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
