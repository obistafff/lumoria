import { useEffect } from "react";

export default function Home() {
  // Scroll indicator (chevron)
  useEffect(() => {
    const el = document.querySelector(".scroll-indicator");
    if (!el) return;

    const onClick = () => {
      const target =
        document.getElementById("portfolio") ||
        document.getElementById("services");

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="accueil">
        <div className="hero-image">
          <img src="/img/img1.jpg" alt="Studio Photo Shooting" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">Studio Lumoria</h1>
          <p className="hero-subtitle">L'art de capturer la lumière</p>
          <a href="/portfolio" className="hero-btn">
            Voir notre portfolio
          </a>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Aperçu de notre travail</h2>
            <div className="section-line"></div>
          </div>

          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img src="/img/img2.jpg" alt="Studio Photo 1" />
              <div className="portfolio-overlay">
                <h3>Découvrez notre univers</h3>
              </div>
            </div>

            <div className="portfolio-item">
              <img src="/img/img3.jpg" alt="Studio Photo 2" />
              <div className="portfolio-overlay">
                <h3>L'art de la photographie</h3>
              </div>
            </div>

            <div className="portfolio-item">
              <img src="/img/img4.jpg" alt="Studio Photo 3" />
              <div className="portfolio-overlay">
                <h3>Création sur mesure</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Services</h2>
            <div className="section-line"></div>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-camera"></i>
              </div>
              <h3>Portraits Studio</h3>
              <p>
                Séances portraits professionnelles en studio avec éclairage maîtrisé
                et retouche haut de gamme.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Photos Corporate</h3>
              <p>
                Images professionnelles pour entreprises, équipes et dirigeants.
                Qualité premium garantie.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Mode & Fashion</h3>
              <p>
                Shootings mode créatifs avec direction artistique personnalisée
                et style unique.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Événementiel</h3>
              <p>
                Couverture photo d'événements avec discrétion et professionnalisme.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
