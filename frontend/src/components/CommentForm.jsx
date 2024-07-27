import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://blog-application-4179.onrender.com/api/comments`, { post: postId, author, content });
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Add a Comment</h3>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
