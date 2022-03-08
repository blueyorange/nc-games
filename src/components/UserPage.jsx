import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import UserInfo from "./UserInfo";
import { getUser } from "../api";
import NotFound404 from "./NotFound404";
import Loading from "./Loading";

export default function Reviews() {
  const { username } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    getUser(username)
      .then((userFromApi) => {
        setUser(userFromApi);
        setReviews(userFromApi.reviews);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [username]);
  if (error) {
    return <NotFound404 />;
  } else if (loading) {
    return <Loading />;
  }
  return (
    <div className="UserPage">
      <UserInfo user={user} />
      <ReviewsList reviews={reviews} />
    </div>
  );
}
