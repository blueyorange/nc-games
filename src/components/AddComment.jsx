import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useParams } from "react-router-dom";
import { postComment } from "../api";

export default function AddComment() {
  const [displayCommentForm, setDisplayCommentForm] = useState(false);
  const { review_id } = useParams();

  function CommentForm({ comment }) {
    const { user } = useContext(UserContext);
    const handleSubmitComment = (e) => {
      e.preventDefault();
      comment = {
        ...comment,
        review_id,
        author: user.username,
        body: e.target.body.value,
      };
      postComment(review_id, comment);
    };
    const [body, setBody] = useState("");
    return (
      <form className="CommentForm__Form" onSubmit={handleSubmitComment}>
        <div className="Comment__header">
          <img
            alt={user.username}
            src={user.avatar_url}
            className="Comment__image"
          ></img>
          <h4 className="Comment_owner">{user.username}</h4>
        </div>
        <label>
          <textarea
            type="text"
            className="CommentForm__textarea"
            value={body}
            name="body"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Submit comment</button>
      </form>
    );
  }

  function AddCommentButton() {
    return (
      <button onClick={() => setDisplayCommentForm(!displayCommentForm)}>
        Add Comment
      </button>
    );
  }

  return (
    <div className="AddComment">
      {displayCommentForm ? <CommentForm /> : <AddCommentButton />}
    </div>
  );
}
