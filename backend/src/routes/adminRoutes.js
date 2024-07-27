const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// Route to get all comments (for admin)
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments', error });
  }
});

// Route to approve a comment
router.patch('/comments/:id/approve', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.approved = true;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error approving comment', error });
  }
});

module.exports = router;
