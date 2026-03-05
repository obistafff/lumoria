import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/img/logo.png" alt="Studio Lumoria" />
            <p>L'art de capturer la lumière</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Légal</h4>
              <ul>
                <li><a href="#mentions">Mentions légales</a></li>
                <li><a href="#cgv">CGV</a></li>
                <li><a href="#privacy">Confidentialité</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Suivez-nous</h4>
              <div className="social-links">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-line"></div>
          <p>&copy; 2025 Studio Lumoria. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
