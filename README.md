# Assignment 6 - React Post Dashboard

A robust React application built with Vite demonstrating pure API abstraction, async state management via `useReducer`, side-effect handling with `useEffect` cleanup (`AbortController`), and compute-on-render derived state for filtering.

## File Organization
- `src/api/postsApi.js`: Pure data access layer utilizing the native browser `fetch` API to query `https://jsonplaceholder.typicode.com/posts`. Contains no React imports or JSX.
- `src/reducer/postsReducer.js`: Pure reducer function managing async states (`loading`, `error`, `posts`) across `FETCH_START`, `FETCH_SUCCESS`, and `FETCH_ERROR` action types without mutations or side effects.
- `src/components/Post.jsx`: Stateless presentational component rendering post `title` and `body` passed via props.
- `src/components/PostList.jsx`: Renders the list of posts using `.map()` and ensures each item has a unique `key={post.id}`.
- `src/components/FilterForm.jsx`: Controlled form component handling search input while keeping state ownership in `App.jsx`.
- `src/App.jsx`: Top-level orchestrator holding state, triggering API fetches on mount, cleaning up active requests on unmount, deriving filtered lists during render, and handling loading/error/empty UI states.
- `src/main.jsx`: Application entry point mounting the root component into the DOM.

## Technical Challenges & Architectural Decisions
- **Derived State Over Redundant State:** Filtering is derived strictly during render via `posts.filter(...)` rather than synchronization effects or redundant state fields (`filteredPosts`), avoiding desynchronization and unnecessary re-renders.
- **Pure Reducer Isolation:** All asynchronous logic is maintained inside `useEffect`, keeping `postsReducer` strictly pure and predictable.
- **Race Condition & Memory Leak Prevention:** Employed `AbortController` inside `useEffect` to abort inflight requests during component unmounts and prevent state updates on unmounted trees.
