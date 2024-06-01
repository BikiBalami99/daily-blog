import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Create() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      history.push("/");
    });
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog title:</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />

        <label htmlFor="">Blog body</label>
        <textarea
          value={body}
          onChange={({ target }) => setBody(target.value)}
          required
        />

        <label htmlFor="">Blog Author</label>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
        </select>

        {!isPending && <button>Add blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
    </div>
  );
}
