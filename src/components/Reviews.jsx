import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import Loading from "./Loading";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
      .then((filteredReviews) => {
        setReviews(filteredReviews);
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <main className="Reviews">
      <Nav />
      {isLoading ? <Loading /> : <ReviewsList reviews={reviews} />}
    </main>
  );
}
