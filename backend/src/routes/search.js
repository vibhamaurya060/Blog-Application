const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

router.get('/posts', async (req, res) => {
  try {
    const { page = 1, title, content, author, status } = req.query;
    const pageSize = 10; 
    const skip = (page - 1) * pageSize;

    // Build the query object with search and filter parameters
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive title search
    }
    if (content) {
      query.content = { $regex: content, $options: 'i' }; // Case-insensitive content search
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' }; // Case-insensitive author search
    }
    if (status) {
      query.status = status;
    }

    // Get total count for pagination
    const totalPosts = await BlogPost.countDocuments(query);

    // Get posts with pagination, search, and filters
    const posts = await BlogPost.find(query)
      .skip(skip)
      .limit(pageSize);

    // Respond with posts and total pages
    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

module.exports = router;
