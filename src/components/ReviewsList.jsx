import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const term = searchParams.get("searchTerm") === null ? "" : searchParams.get("searchTerm");
    console.log(term === null);
    getReviews(category).then((reviews) =>
      reviews.filter(({ title }) => title.toLowerCase().includes(term))
    ).then(filteredReviews => setReviews(filteredReviews));
  }, [searchParams]);

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
