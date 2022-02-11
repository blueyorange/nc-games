import { useState } from "react";
import { voteComment } from "../api";

export default function Comment({ comment }) {
  const { avatar_url, author, body, created_at, comment_id } = comment;
  const [votes, setVotes] = useState(comment.votes);

  function handleVote(e) {
    const v = votes;
    setVotes(v + 1);
    voteComment(comment_id).catch((err) => {
      console.log(err);
      alert(err);
      setVotes(v);
    });
  }

  return (
    <article className="Comment">
      <div className="Comment__header">
        <img alt={author} src={avatar_url} className="Comment__image"></img>
        <h4 className="Comment_owner">{author}</h4>
        <p>{created_at}</p>
      </div>
      <p>{body}</p>
      <button onClick={handleVote}>{votes} 👍</button>
    </article>
  );
}
