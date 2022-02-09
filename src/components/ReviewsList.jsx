import ReviewCard from "./ReviewCard";

export default function ReviewsList({ reviews }) {
  return (
    <ul className="ReviewsList">
      {reviews.map((review) => (
        <li key={review.review_id} className="ReviewsList__item">
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  );
}
