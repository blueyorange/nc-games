import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import UserInfo from "./UserInfo";
import { getUser } from "../api";

export default function Reviews() {
  const { username } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(username).then((userFromApi) => {
      setUser(userFromApi);
      setReviews(userFromApi.reviews);
    });
  }, [username]);

  return (
    <div className="Reviews">
      <UserInfo user={user} />
      <ReviewsList reviews={reviews} />
    </div>
  );
}
