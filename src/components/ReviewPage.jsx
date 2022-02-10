import { getReviewById, getCommentsByReviewId, voteReview } from "../api";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "./Comment";

export default function ReviewPage() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getReviewById(review_id).then((reviewFromApi) => {
      setReview(reviewFromApi);
    });
    getCommentsByReviewId(review_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [review_id]);

  function handleVote(e) {
    e.stopPropagation();
    const { votes } = review;
    setReview({ ...review, votes: votes + 1 });
    voteReview(review_id).catch((err) => {
      setReview({ ...review, votes });
    });
  }

  return (
    <main className="ReviewPage">
      <h2 className="ReviewPage__header">{review.title}</h2>
      <img
        className="ReviewPage__image"
        src={review.review_img_url}
        alt="review image"
      ></img>
      <h4 className="ReviewPage__owner">
        review by <Link to={`/users/${review.owner}`}>{review.owner}</Link>
      </h4>
      <article className="ReviewPage__body">
        <p>{review.review_body}</p>
        <button className="ReviewPage__votes-button" onClick={handleVote}>
          {review.votes} 👍
        </button>
        {comments.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment}></Comment>;
        })}
      </article>
    </main>
  );
}
