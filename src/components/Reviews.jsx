import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    const sort_by = searchParams.get("sort_by");
    const term =
      searchParams.get("searchTerm") === null
        ? ""
        : searchParams.get("searchTerm");
    getReviews(category, sort_by)
      .then((reviews) =>
        reviews.filter(({ title }) => title.toLowerCase().includes(term))
      )
      .then((filteredReviews) => setReviews(filteredReviews));
  }, [searchParams]);

  return (
    <main className="Reviews">
      <Nav />
      <ReviewsList reviews={reviews} />
    </main>
  );
}
