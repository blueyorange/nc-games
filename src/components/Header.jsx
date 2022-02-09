import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="Header">
      <h1 className="header__h1">
        <Link className="Header__link" to="/">
          NC Game Reviews
        </Link>
      </h1>
    </header>
  );
}
