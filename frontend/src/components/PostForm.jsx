import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/PostForm.css';

const PostForm = ({ postId, onFormSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`https://blog-application-4179.onrender.com/api/posts/${id}`);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setStatus(post.status);
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, author, status };

    try {
      if (postId) {
        // Update existing post
        await axios.put(`http://localhost:8080/api/posts/${postId}`, postData);
      } else {
        // Create new post
        await axios.post('http://localhost:8080/api/posts', postData);
      }
      onFormSubmit();
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{postId ? 'Edit Post' : 'Create New Post'}</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <button type="submit">{postId ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;
