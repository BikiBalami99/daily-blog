import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Bloglist({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map((eachBlog) => {
        return (
          <div className="blog-preview" key={eachBlog.id}>
            <Link to={`/blogs/${eachBlog.id}`}>
              <h2>{eachBlog.title}</h2>
              <p>Written by {eachBlog.author}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
