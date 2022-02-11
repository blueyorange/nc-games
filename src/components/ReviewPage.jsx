import { getReviewById, voteReview } from "../api";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import VoteButton from "./VoteButton";
import Comments from "./Comments";

export default function ReviewPage() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const { votes } = review;

  useEffect(() => {
    getReviewById(review_id).then((reviewFromApi) => {
      setReview(reviewFromApi);
    });
  }, [review_id]);

  return (
    <main className="ReviewPage">
      <h2 className="ReviewPage__header">{review.title}</h2>
      <img
        className="ReviewPage__image"
        src={review.review_img_url}
        alt={review.owner}
      ></img>
      <h4 className="ReviewPage__owner">
        review by <Link to={`/users/${review.owner}`}>{review.owner}</Link>
      </h4>
      <article className="ReviewPage__body">
        <p>{review.review_body}</p>
        <VoteButton votes={votes} updateApiFunc={voteReview} id={review_id} />
        <Comments review_id={review_id} />
      </article>
    </main>
  );
}
