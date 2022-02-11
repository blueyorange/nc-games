import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

export default function LoginStatus() {
  const { user } = useContext(UserContext);
  return (
    <div className="LoginStatus">
      Logged in as{" "}
      <Link to={`/users/${user.username}`}>
        {user.username}
        <img
          src={user.avatar_url}
          alt={user.username}
          className="LoginStatus__user-image"
        ></img>
      </Link>
    </div>
  );
}
