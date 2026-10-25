import React from "react";

export default function FilterForm({ searchTerm, onFilterChange }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ marginBottom: "20px" }}
    >
      <label
        htmlFor="filterInput"
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155"
        }}
      >
        Filter Posts by Title:
      </label>
      <input
        id="filterInput"
        type="text"
        value={searchTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Type to filter posts..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: "6px",
          border: "1px solid #cbd5e1",
          fontSize: "1rem",
          boxSizing: "border-box",
          outline: "none"
        }}
      />
    </form>
  );
}
