/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ nav, closeNav }) {
  return (
    <nav
      className={`${
        nav ? "open" : ""
      } NavBar d-flex align-items-center justify-content-between gap-3`}
    >
      <NavLink onClick={closeNav} to={"/"} className="NavBar__link fs-5 py-2">
        Home
      </NavLink>

      <NavLink
        onClick={closeNav}
        to={"/categories"}
        className="NavBar__link fs-5 py-2"
      >
        Categories
      </NavLink>

      <NavLink
        onClick={closeNav}
        to={"/about"}
        className="NavBar__link fs-5 py-2"
      >
        About
      </NavLink>
    </nav>
  );
}
