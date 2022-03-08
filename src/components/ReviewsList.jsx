import ReviewCard from "./ReviewCard";

export default function ReviewsList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <h2>
        No reviews found with those search criteria. Please perform another
        search.
      </h2>
    );
  } else {
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
}
