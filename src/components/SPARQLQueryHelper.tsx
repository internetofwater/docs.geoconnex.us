import React from 'react';
import { useState } from 'react';

export default function SPARQLQueryHelper() {
  const [loading, setLoading] = useState(true);

  const spinnerOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
  };

  const spinnerStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  };

  const iframeContainerStyle = {
    position: "relative",
    width: "100%",
    height: "80vh",
  };

  const iframeStyle = {
    border: "none",
    width: "100%",
    height: "100%",
    display: "block",
  };

  // Inject the keyframes animation dynamically
  if (typeof document !== "undefined" && !document.getElementById("spinner-style")) {
    const style = document.createElement("style");
    style.id = "spinner-style";
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <h1>Geoconnex SPARQL Query Helper</h1>
      </div>

      <div style={iframeContainerStyle}>
        {loading && (
          <div style={spinnerOverlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
        )}
        <iframe
          src="https://sparql-ui-414886575015.us-central1.run.app/"
          title="SPARQL Query Helper"
          onLoad={() => setLoading(false)}
          style={iframeStyle}
        />
      </div>
    </>
  );
}