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
  const [error, setError] = useState();

  useEffect(() => {
    setError();
  }, [searchParams]);

  useEffect(() => {
    setError();
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
        if (filteredReviews.length === 0) {
          setError("404");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [searchParams]);
  return (
    <main className="Reviews">
      <Nav />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <h2>No reviews found.</h2>
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </main>
  );
}
