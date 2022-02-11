import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useParams } from "react-router-dom";
import { postComment } from "../api";

export default function AddComment({ setComments }) {
  const [showForm, setShowForm] = useState(false);
  const { review_id } = useParams();

  function CommentForm({ setComments, setShow }) {
    const { user } = useContext(UserContext);
    const [body, setBody] = useState("");

    const handleSubmitComment = (e) => {
      e.preventDefault();
      const newComment = {
        review_id,
        author: user.username,
        body: e.target.body.value,
      };
      console.log(newComment);
      postComment(review_id, newComment).then((commentsFromApi) => {
        setComments(commentsFromApi);
        setShow(false);
      });
    };

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
    return <button onClick={() => setShowForm(!showForm)}>Add Comment</button>;
  }

  return (
    <div className="AddComment">
      {showForm ? (
        <CommentForm setComments={setComments} setShow={setShowForm} />
      ) : (
        <AddCommentButton />
      )}
    </div>
  );
}
