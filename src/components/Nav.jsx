import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getCategories } from "../api";
import { UserContext } from "../contexts/User";

export default function Nav() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    setSearchParams({ category, searchTerm });
  };

  return (
    <nav className="Nav">
      <ul className="Nav__categories-list">
        {categories.map(({ slug }) => (
          <li key={slug} className="Nav__category-listitem">
            <Link
              className={`Nav__category-link${
                slug === searchParams.get("category") ? "--selected" : ""
              }`}
              to={`?category=${slug}`}
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
      <form className="Nav__form" onSubmit={handleSubmit}>
        <img
          alt="search icon"
          className="Nav__search-icon"
          src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
        />
        <input
          autoComplete="off"
          placeholder="Search"
          className="Nav__search-input"
          name="searchTerm"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        in{" "}
        <select name="category" className="Nav__category-selector">
          {categories.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {slug}
              </option>
            );
          })}
        </select>
      </form>
      <div className="Nav__login-status">
        Logged in as{" "}
        <Link to={`/users/${user.username}`}>
          {user.username}
          <img
            src={user.avatar_url}
            alt={user.username}
            className="Nav__login-user-image"
          ></img>
        </Link>
      </div>
    </nav>
  );
}
