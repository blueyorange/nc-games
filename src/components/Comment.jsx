import { voteComment } from "../api";
import timeDifference from "../helpers/timeDifference";
import VoteButton from "./VoteButton";

export default function Comment({ comment }) {
  const { avatar_url, author, body, created_at, comment_id, votes } = comment;

  return (
    <article className="Comment">
      <div className="Comment__header">
        <img alt={author} src={avatar_url} className="Comment__image"></img>
        <h4 className="Comment_owner">{author}</h4>
        <p>{timeDifference(created_at)}</p>
      </div>
      <p>{body}</p>
      <VoteButton votes={votes} updateApiFunc={voteComment} id={comment_id} />
    </article>
  );
}
