import { useState } from "react";
import { voteComment } from "../api";

function timeDifference(dateString) {
  const previous = new Date(dateString).valueOf();
  const current = new Date(Date.now()).valueOf();

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "about " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "about " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "about " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

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
        <p>{timeDifference(created_at)}</p>
      </div>
      <p>{body}</p>
      <button onClick={handleVote}>{votes} 👍</button>
    </article>
  );
}
