import { motion } from "framer-motion";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("image", file);

    const resp = await fetch("http://localhost:5000/classify", {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();
    setRes(data);
    setLoading(false);
  };

  return (
    <div className="app-container">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌱 Eco Packaging Adviser
      </motion.h1>

      <motion.div
        className="upload-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="analyze-btn" onClick={upload} disabled={!file || loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </motion.div>

      {res && (
        <motion.div
          className="result-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {res.image && (
            <img
              src={res.image}
              alt="Uploaded Preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                marginBottom: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          )}
          <p><strong>Material:</strong> {res.material}</p>
          <p><strong>Confidence:</strong> {res.confidence}%</p>
          <p><strong>CO₂:</strong> {res.co2} kg</p>
          <p><strong>Recommendation:</strong> {res.recommendation}</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
