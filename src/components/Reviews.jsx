import Nav from "./Nav";
import ReviewsList from "./ReviewsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import Loading from "./Loading";
import NotFound404 from "./NotFound404";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

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
      })
      .catch((err) => setError(err));
  }, [searchParams]);
  if (error) {
    return <NotFound404 />;
  } else {
    return (
      <main className="Reviews">
        <Nav />
        {isLoading ? <Loading /> : <ReviewsList reviews={reviews} />}
      </main>
    );
  }
}
