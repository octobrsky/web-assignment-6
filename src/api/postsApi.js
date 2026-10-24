export async function fetchPosts(signal) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
