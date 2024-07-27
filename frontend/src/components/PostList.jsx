

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/blogList.css';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchTitle, searchContent, filterAuthor, filterStatus]);

  const fetchPosts = async () => {
    try {
      // Send search and filter parameters along with the page number
      const response = await axios.get(`https://blog-application-4179.onrender.com/api/posts`, {
        params: {
          page: currentPage,
          title: searchTitle,
          content: searchContent,
          author: filterAuthor,
          status: filterStatus,
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`);
      fetchPosts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Blog Posts</h1>

      {/* Search and Filter Controls */}
      <div className="search-filter-controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by content"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by author"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          className="filter-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <p className="post-author">Author: {post.author}</p>
            <p className="post-status">Status: {post.status}</p>
            <button className="delete-button" onClick={() => handleDelete(post._id)}>
              Delete
            </button>

            {/* Comment Form and Comment List */}
            <div className="comments-section">
              <CommentForm postId={post._id} />
              <CommentsList postId={post._id} />
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
