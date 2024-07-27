import axios from 'axios';
import { useEffect, useState } from 'react';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://blog-application-4179.onrender.com/admin/api/comments?post=${postId}`)
      .then(response => setComments(response.data))
      .catch(error => setError(error));
  }, [postId]);

  if (error) return <div>Error fetching comments: {error.message}</div>;

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </div>
  );
};

export default CommentsList;
