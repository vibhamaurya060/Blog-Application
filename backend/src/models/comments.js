const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  post: { 
    type: Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  approved: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('Comment', commentSchema);
