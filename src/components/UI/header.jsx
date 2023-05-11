import { Nav } from "./nav";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <Link to="/" className="headerClass">HOLIDAZE</Link>
      <Nav />
    </header>
  );
}
