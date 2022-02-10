import { useState } from "react";

export default function Comment({ comment }) {
  const { avatar_url, author, body, created_at } = comment;
  const [votes, setVotes] = useState(comment.votes);

  function handleVote(e) {
    setVotes(votes + 1);
    console.log("no endpoint for comment voting!");
  }

  return (
    <article className="Comment">
      <div className="Comment__header">
        <img alt={author} src={avatar_url} className="Comment__image"></img>
        <h4 className="Comment_owner">{author}</h4>
      </div>
      <p>{comment.body}</p>
      <button onClick={handleVote}>{votes}👍</button>
    </article>
  );
}
