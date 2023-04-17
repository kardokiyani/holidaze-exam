import { Link } from "react-router-dom";

export function Nav() {

  return (
    <nav className="navStyle">
      <ul className="ulStyle">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/signIn">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}
