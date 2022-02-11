import { useState, useContext } from "react";
import { voteComment, deleteComment } from "../api";
import timeDifference from "../helpers/timeDifference";
import VoteButton from "./VoteButton";
import { UserContext } from "../contexts/User";

export default function Comment({ comment }) {
  const { avatar_url, author, body, created_at, comment_id, votes } = comment;
  const [commentDeleted, setCommentDeleted] = useState(false);
  const { user } = useContext(UserContext);

  const handleDelete = (e) => {
    e.stopPropagation();
    setCommentDeleted(true);
    deleteComment(comment_id).catch(() => {
      setCommentDeleted(false);
    });
  };

  return (
    <article className="Comment">
      <header className="Comment__header">
        <img alt={author} src={avatar_url} className="Comment__image"></img>
        <h4 className="Comment_owner">{author}</h4>
        <p>{timeDifference(created_at)}</p>
      </header>
      {commentDeleted ? <i>Comment deleted.</i> : <p>{body}</p>}
      <nav className="Comment_buttons">
        <VoteButton votes={votes} updateApiFunc={voteComment} id={comment_id} />
        {user.username === author ? (
          <button onClick={handleDelete} className="Comment__delete-button">
            Delete
          </button>
        ) : (
          ""
        )}
      </nav>
    </article>
  );
}
