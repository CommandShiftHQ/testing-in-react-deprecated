import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/post.css";

const Post = ({postData, handleUpvote}) => {
  const {title, author, date, isPublished, body, tags} = postData;
  const [count, setCount] = useState(0);

  const handleClick = (event) => {
    setCount(prev => prev + 1)
    handleUpvote(event.target.value)
  }

  return (
    <div className="post">
      <div className="post-heading">
        <h2>{title}</h2>
        {isPublished ? <p>{body}</p> : <p>Coming soon!</p>}
      </div>
      <div className="post-counter">
        <span>Upvotes: {count}</span>
        <button onClick={handleClick} value={title} type="button">Upvote this</button>
      </div>
      <div className="post-author">Author: {author}</div>
      <div className="post-date">Published: {date}</div>
      <h3>Tags:</h3>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

Post.propTypes = {
  postData: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    isPublished: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }).isRequired,
  handleUpvote: PropTypes.func.isRequired
}

export default Post;
