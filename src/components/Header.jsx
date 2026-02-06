import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // ferme le menu quand on change de page
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  // lock scroll (optionnel mais agréable)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/img/logo.png" alt="Studio Lumoria" />
          </Link>
        </div>

        <nav className="nav">
          <ul className={`nav-menu ${open ? "active" : ""}`}>
            <li>
              <NavLink to="/" end onClick={() => setOpen(false)}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" onClick={() => setOpen(false)}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div
            className={`nav-toggle ${open ? "active" : ""}`}
            onClick={() => setOpen((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
            }}
            aria-label="Ouvrir le menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
