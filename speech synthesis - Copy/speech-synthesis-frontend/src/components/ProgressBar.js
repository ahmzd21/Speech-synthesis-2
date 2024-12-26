import React from "react";

function ProgressBar({ progress }) {
  return (
    <div style={{ background: "#eee", width: "100%", height: "10px" }}>
      <div
        style={{
          background: "#4caf50",
          width: `${progress}%`,
          height: "100%",
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
