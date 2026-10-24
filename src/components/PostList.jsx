import React from "react";
import Post from "./Post.jsx";

export default function PostList({ posts }) {
  return (
    <div style={{ marginTop: "16px" }}>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
}
