import { useState } from "react";
import NavBar from "./NavBar/NavBar";
import HeaderIcons from "./HeaderIcons/HeaderIcons";

export default function Header() {
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  return (
    <header
      className="Header position-sticky top-0 z-3 bg-white shadow-sm"
      style={{ height: "var(--nav-height)" }}
    >
      <div className="container h-100 d-flex align-items-center justify-content-between py-2">
        <h1 className="fw-bold">
          Mini<span className="textMC">Store</span>
        </h1>

        <NavBar nav={nav} closeNav={closeNav} />

        <HeaderIcons nav={nav} closeNav={closeNav} openNav={openNav} />
      </div>
    </header>
  );
}
