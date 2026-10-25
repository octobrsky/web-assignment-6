import React, { useState, useEffect, useReducer } from "react";
import { fetchPosts } from "./api/postsApi.js";
import { postsReducer, initialState } from "./reducer/postsReducer.js";
import FilterForm from "./components/FilterForm.jsx";
import PostList from "./components/PostList.jsx";

export default function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", payload: err.message || "Something went wrong" });
        }
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  // Derived state: calculate filtered posts during render (critical requirement)
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <main style={{ maxWidth: "680px", margin: "40px auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#0f172a", marginBottom: "8px" }}>Post Dashboard</h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Async data orchestration with pure useReducer and derived filtering
        </p>
      </header>

      <FilterForm
        searchTerm={searchTerm}
        onFilterChange={setSearchTerm}
      />

      {state.loading && (
        <p style={{ color: "#2563eb", fontWeight: "500" }}>
          Loading posts...
        </p>
      )}

      {state.error && (
        <div style={{ padding: "12px 16px", backgroundColor: "#fef2f2", color: "#dc2626", borderRadius: "6px", border: "1px solid #fecaca" }}>
          Error: {state.error}
        </div>
      )}

      {!state.loading && !state.error && filteredPosts.length === 0 && (
        <p style={{ color: "#64748b", fontStyle: "italic" }}>
          No posts found.
        </p>
      )}

      {!state.loading && !state.error && filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </main>
  );
}
