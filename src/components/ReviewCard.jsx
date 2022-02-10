import { Link, useNavigate } from "react-router-dom";
export default function ReviewCard({ review }) {
  const {
    title,
    category,
    owner,
    review_body,
    review_img_url,
    votes,
    comment_count,
  } = review;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/review/${review.review_id}`)}
      className="ReviewCard"
    >
      <Link to={`/?category=${category}`} className="ReviewCard__category">
        {category}
      </Link>
      <h2 className="ReviewCard__title">{title}</h2>
      <img alt={title} src={review_img_url} className="ReviewCard__image"></img>
      <div className="ReviewCard__owner">
        review by{" "}
        <Link to={`/users/${owner}`} className="ReviewCard__owner_name">
          {owner}
        </Link>
        ({votes} votes, {comment_count} comments)
      </div>
      <div className="ReviewCard__body">{review_body}</div>
    </div>
  );
}
