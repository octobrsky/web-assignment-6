import React from "react";

export default function Post({ title, body }) {
  return (
    <article
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", textTransform: "capitalize", color: "#1e293b" }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: "#475569", lineHeight: "1.5" }}>
        {body}
      </p>
    </article>
  );
}
