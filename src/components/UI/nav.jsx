import { Link } from "react-router-dom";

import { useState } from "react";

import HandleTheLogout from "../logOut";

export function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navStyle">
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul
        className={"ulStyle" + (showMenu ? " show" : "")}
        onClick={toggleMenu}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/signIn">Sign In</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={HandleTheLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
