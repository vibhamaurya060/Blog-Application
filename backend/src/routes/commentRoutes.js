const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');
const Post = require('../models/Post'); 

// Route to add a comment
router.post('/comments', async (req, res) => {
  try {
    const { post, author, content, created_at } = req.body;

    if (!post || !author || !content) {
      return res.status(400).json({ message: 'Post, author, and content are required.' });
    }

    const newComment = new Comment({ post, author, content, created_at });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment', error);
    res.status(500).json({
      message: 'Error posting comment',
      error: error
    });
  }
});

// Route to get comments for a post (only approved comments)
router.get('/comments/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ 
      post: req.params.postId,
      approved: true 
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments', error });
  }
});

module.exports = router;
