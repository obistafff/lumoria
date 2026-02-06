import { useEffect, useState } from "react";

function Notification({ message, type = "info", onClose }) {
  if (!message) return null;

  const icon =
    type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle";

  return (
    <div className={`notification notification-${type} show`}>
      <div className="notification-content">
        <i className={`fas fa-${icon}`}></i>
        <span>{message}</span>
      </div>
      <button className="notification-close" onClick={onClose} type="button">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [notif, setNotif] = useState({ message: "", type: "info" });

  // Auto-hide notif
  useEffect(() => {
    if (!notif.message) return;
    const t = setTimeout(() => setNotif({ message: "", type: "info" }), 5000);
    return () => clearTimeout(t);
  }, [notif]);

  const showNotification = (msg, type = "info") => setNotif({ message: msg, type });

  const scrollToForm = () => {
    const el = document.getElementById("contactForm");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const first = el.querySelector("input");
        if (first) first.focus();
      }, 500);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      showNotification("Veuillez remplir tous les champs obligatoires.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Veuillez entrer une adresse email valide.", "error");
      return;
    }

    setIsSending(true);

    // simulate submit
    setTimeout(() => {
      showNotification("Merci pour votre message ! Nous vous recontacterons bientôt.", "success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSending(false);
    }, 2000);
  };

  return (
    <>
      <Notification
        message={notif.message}
        type={notif.type}
        onClose={() => setNotif({ message: "", type: "info" })}
      />

      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">Contact</h1>
            <p className="contact-hero-subtitle">
              Découvrez notre univers et prenons contact pour donner vie à vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <h2 className="section-title">À propos du Studio</h2>
                <div className="section-line"></div>
              </div>

              <div className="about-story">
                <p className="lead-text">
                  Fondé sur une passion inébranlable pour l'art photographique, le Studio Lumoria
                  est né de la conviction que chaque instant mérite d'être immortalisé avec
                  excellence et raffinement.
                </p>
                <p>
                  Notre philosophie repose sur la <strong>maîtrise parfaite de la lumière</strong>,
                  cet élément fondamental qui transforme une simple image en œuvre d'art. Nous
                  cultivons une <strong>esthétique intemporelle</strong>, où chaque cliché
                  transcende les modes pour devenir un témoignage permanent de beauté et d'émotion.
                </p>
                <p>
                  À travers notre approche artisanale et notre exigence technique, nous créons des
                  images qui révèlent l'essence même de nos sujets. Que ce soit pour un portrait
                  intime, un shooting mode audacieux, ou la capture de moments précieux lors
                  d'événements, notre mission reste invariable : sublimer la réalité par la magie
                  de la photographie.
                </p>

                <blockquote className="philosophy-quote">
                  <i className="fas fa-quote-left"></i>
                  <p>"La lumière ne se contente pas d'éclairer, elle révèle l'âme de ce qu'elle touche."</p>
                  <cite>— Philosophie Studio Lumoria</cite>
                </blockquote>
              </div>
            </div>

            <div className="about-image">
              <img src="/img/studio-about.jpg" alt="Studio Lumoria - À propos" />
              <div className="about-image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Prenons Contact</h2>
            <div className="section-line"></div>
          </div>

          <div className="contact-layout">
            {/* Form */}
            <div className="contact-form-wrapper">
              <h3 className="form-title">Envoyez-nous un message</h3>

              <form className="contact-form-main" id="contactForm" onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse e-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSending}
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="portrait">Séance Portrait</option>
                    <option value="mode">Shooting Mode</option>
                    <option value="evenementiel">Événementiel</option>
                    <option value="nature">Photographie Nature</option>
                    <option value="corporate">Corporate</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez-nous votre projet..."
                    rows="6"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn-main" disabled={isSending}>
                  {isSending ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span className="btn-text">Envoyer le message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="contact-info-wrapper">
              <h3 className="info-title">Informations de contact</h3>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Adresse</h4>
                    <p>
                      18 avenue Léon Betoulle
                      <br />
                      87350 Panazol, France
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Téléphone</h4>
                    <p>05 55 XX XX XX</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h4>E-mail</h4>
                    <p>contact@studiolumoria.fr</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Horaires</h4>
                    <p>
                      Lundi - Vendredi : 9h - 19h
                      <br />
                      Samedi : 10h - 17h
                      <br />
                      Dimanche : Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-contact">
                <h4>Suivez-nous</h4>
                <div className="social-links-contact">
                  <a href="#" aria-label="Instagram" className="social-link">
                    <i className="fab fa-instagram"></i>
                    <span>@studiolumoria</span>
                  </a>
                  <a href="#" aria-label="Facebook" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                    <span>Studio Lumoria</span>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                    <span>Studio Lumoria</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h3 className="map-title">Nous localiser</h3>

          <div className="map-wrapper">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.9234567890123!2d1.3123456789012346!3d45.73456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12345678901234567%3A0x123456789abcdef!2s18%20Avenue%20L%C3%A9on%20Betoulle%2C%2087350%20Panazol%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890123"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Studio Lumoria"
              ></iframe>
            </div>

            <div className="map-info">
              <div className="map-info-content">
                <h4>Studio facilement accessible</h4>
                <p>
                  Situé à Panazol, notre studio bénéficie d'un emplacement privilégié avec un
                  parking privé pour votre confort.
                </p>
                <div className="map-features">
                  <div className="map-feature">
                    <i className="fas fa-parking"></i>
                    <span>Parking gratuit</span>
                  </div>
                  <div className="map-feature">
                    <i className="fas fa-wheelchair"></i>
                    <span>Accès PMR</span>
                  </div>
                  <div className="map-feature">
                    <i className="fas fa-coffee"></i>
                    <span>Espace détente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Réservez votre séance</h2>
            <p className="cta-subtitle">
              Transformons ensemble vos idées en images d'exception. Contactez-nous dès maintenant
              pour planifier votre séance photo sur mesure.
            </p>
            <div className="cta-buttons">
              <a href="tel:0555XXXXXX" className="cta-btn primary">
                <i className="fas fa-phone"></i>
                <span>Appelez-nous</span>
              </a>
              <a
                href="#contactForm"
                className="cta-btn secondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToForm();
                }}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Prendre rendez-vous</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
