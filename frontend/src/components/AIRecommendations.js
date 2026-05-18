import React, { useState } from "react";
import axios from "axios";

function AIRecommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const employeesRes = await axios.get("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const aiRes = await axios.post("http://localhost:5000/api/ai/recommendations", 
      { employees: employeesRes.data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRecommendations(aiRes.data);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={getRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get AI Recommendations"}
      </button>
      {recommendations && (
        <div>
          <h4>📈 Promotions:</h4>
          <pre>{JSON.stringify(recommendations.promotions, null, 2)}</pre>
          <h4>🏆 Ranking:</h4>
          <pre>{JSON.stringify(recommendations.ranking, null, 2)}</pre>
          <h4>📚 Training:</h4>
          <pre>{JSON.stringify(recommendations.training, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AIRecommendations;
