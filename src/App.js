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
    <div className="app-wrapper">
      <motion.div
        className="eco-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>🌿 Eco Packaging Classifier</h1>
        <p className="subtitle">Know your material's environmental impact</p>

        <div className="upload-box">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={upload}
            disabled={!file || loading}
            className="analyze-btn"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {res && (
          <motion.div
            className="result-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {res.image && (
              <img src={res.image} alt="Preview" className="preview-img" />
            )}
            <div className="result-data">
              <p><strong>Material:</strong> {res.material}</p>
              <p><strong>Confidence:</strong> {res.confidence}%</p>
              <p><strong>CO₂:</strong> {res.co2} kg</p>
              <p><strong>Recommendation:</strong> {res.recommendation}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
