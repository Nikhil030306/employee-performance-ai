import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
        await axios.post("http://localhost:5000/api/auth/signup", { email, password });
        setMessage("Account created! Please login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          <button type="submit" style={styles.button}>{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); setMessage(""); }} style={styles.linkButton}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  card: { background: "white", padding: "40px", borderRadius: "10px", width: "350px" },
  input: { width: "100%", padding: "12px", margin: "10px 0", border: "1px solid #ddd", borderRadius: "5px" },
  button: { width: "100%", padding: "12px", background: "#667eea", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red" },
  success: { color: "green" },
  toggle: { marginTop: "20px", textAlign: "center" },
  linkButton: { background: "none", border: "none", color: "#667eea", cursor: "pointer" }
};

export default Login;
