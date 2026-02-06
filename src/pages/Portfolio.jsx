import { useEffect, useMemo, useRef, useState } from "react";

const ALL_ITEMS = [
  // Portraits
  { category: "portraits", title: "Portrait Professionnel", src: "/img/portrait1.jpg", alt: "Portrait Professionnel" },
  { category: "portraits", title: "Portrait Artistique", src: "/img/portrait2.jpg", alt: "Portrait Artistique" },
  { category: "portraits", title: "Portrait Studio", src: "/img/portrait3.jpg", alt: "Portrait Studio" },
  { category: "portraits", title: "Portrait Créatif", src: "/img/portrait4.jpg", alt: "Portrait Créatif" },
  { category: "portraits", title: "Portrait Lifestyle", src: "/img/portrait5.jpg", alt: "Portrait Lifestyle" },

  // Mode
  { category: "mode", title: "Shooting Mode Editorial", src: "/img/mode1.jpg", alt: "Shooting Mode Editorial" },
  { category: "mode", title: "Collection Automne", src: "/img/mode2.jpg", alt: "Collection Automne" },
  { category: "mode", title: "Haute Couture", src: "/img/mode3.jpg", alt: "Haute Couture" },
  { category: "mode", title: "Street Fashion", src: "/img/mode4.jpg", alt: "Street Fashion" },
  { category: "mode", title: "Accessoires de Luxe", src: "/img/mode5.jpg", alt: "Accessoires de Luxe" },

  // Nature
  { category: "nature", title: "Paysage Noir et Blanc", src: "/img/nature1.jpg", alt: "Paysage Noir et Blanc" },
  { category: "nature", title: "Forêt d'Automne", src: "/img/nature2.jpg", alt: "Forêt d'Automne" },
  { category: "nature", title: "Reflets sur l'Eau", src: "/img/nature3.jpg", alt: "Reflets sur l'Eau" },
  { category: "nature", title: "Lumière Dorée", src: "/img/nature4.jpg", alt: "Lumière Dorée" },
  { category: "nature", title: "Architecture Naturelle", src: "/img/nature5.jpg", alt: "Architecture Naturelle" },

  // Événementiel
  { category: "evenementiel", title: "Mariage Élégant", src: "/img/event1.jpg", alt: "Mariage Élégant" },
  { category: "evenementiel", title: "Soirée Corporate", src: "/img/event2.jpg", alt: "Soirée Corporate" },
  { category: "evenementiel", title: "Gala de Charité", src: "/img/event3.jpg", alt: "Gala de Charité" },
  { category: "evenementiel", title: "Lancement Produit", src: "/img/event4.jpg", alt: "Lancement Produit" },
  { category: "evenementiel", title: "Conférence Prestige", src: "/img/event5.jpg", alt: "Conférence Prestige" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoplayRef = useRef(null);
  const touchStartX = useRef(0);

  const filteredItems = useMemo(() => {
    if (filter === "all") return ALL_ITEMS;
    return ALL_ITEMS.filter((it) => it.category === filter);
  }, [filter]);

  // Helpers
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % Math.max(filteredItems.length, 1));
    }, 4000);
  };

  const openSlideshow = (startIdx) => {
    if (!filteredItems.length) return;
    setCurrentIndex(startIdx);
    setIsOpen(true);
  };

  const closeSlideshow = () => setIsOpen(false);

  const goPrev = () => {
    if (!filteredItems.length) return;
    setCurrentIndex((i) => (i === 0 ? filteredItems.length - 1 : i - 1));
    startAutoplay();
  };

  const goNext = () => {
    if (!filteredItems.length) return;
    setCurrentIndex((i) => (i + 1) % filteredItems.length);
    startAutoplay();
  };

  const goTo = (idx) => {
    if (idx < 0 || idx >= filteredItems.length) return;
    setCurrentIndex(idx);
    startAutoplay();
  };

  // When modal opens/closes: body scroll lock + autoplay + cleanup
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "auto";
      stopAutoplay();
      return;
    }

    document.body.style.overflow = "hidden";
    // petit délai comme ton JS d’avant
    const t = setTimeout(() => startAutoplay(), 1000);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "auto";
      stopAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // If filter changes while open, keep index safe
  useEffect(() => {
    setCurrentIndex((i) => {
      if (!filteredItems.length) return 0;
      return Math.min(i, filteredItems.length - 1);
    });
    // relance autoplay si ouvert
    if (isOpen) startAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeSlideshow();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filteredItems.length]);

  const current = filteredItems[currentIndex];

  return (
    <>
      {/* Portfolio Hero */}
      <section className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero-content">
            <h1 className="portfolio-hero-title">Portfolio</h1>
            <p className="portfolio-hero-subtitle">
              Chaque image raconte une histoire unique, capturée avec passion et précision.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Main Section */}
      <section className="portfolio-main">
        <div className="container">
          {/* Filter */}
          <div className="portfolio-filter">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              Tous
            </button>
            <button className={`filter-btn ${filter === "portraits" ? "active" : ""}`} onClick={() => setFilter("portraits")}>
              Portraits
            </button>
            <button className={`filter-btn ${filter === "mode" ? "active" : ""}`} onClick={() => setFilter("mode")}>
              Mode
            </button>
            <button className={`filter-btn ${filter === "nature" ? "active" : ""}`} onClick={() => setFilter("nature")}>
              Nature
            </button>
            <button
              className={`filter-btn ${filter === "evenementiel" ? "active" : ""}`}
              onClick={() => setFilter("evenementiel")}
            >
              Événementiel
            </button>
          </div>

          {/* Gallery */}
          <div className="portfolio-gallery">
            {filteredItems.map((it, idx) => (
              <div
                key={`${it.category}-${it.src}`}
                className="portfolio-item"
                data-category={it.category}
                data-title={it.title}
                data-image={it.src}
                onClick={() => openSlideshow(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openSlideshow(idx);
                }}
              >
                <img src={it.src} alt={it.alt} />
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <span className="portfolio-category">
                      {it.category === "portraits"
                        ? "Portraits"
                        : it.category === "mode"
                        ? "Mode"
                        : it.category === "nature"
                        ? "Nature"
                        : "Événementiel"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Diaporama */}
      <div
        className={`slideshow-modal ${isOpen ? "active" : ""}`}
        id="slideshowModal"
        onClick={(e) => {
          // fermer si clic sur le fond
          if (e.target.id === "slideshowModal") closeSlideshow();
        }}
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => {
          if (isOpen) startAutoplay();
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0].screenX;
        }}
        onTouchEnd={(e) => {
          const endX = e.changedTouches[0].screenX;
          const diff = touchStartX.current - endX;
          const threshold = 50;
          if (Math.abs(diff) > threshold) {
            if (diff > 0) goNext();
            else goPrev();
          }
        }}
      >
        <div className="slideshow-container">
          <button
            className="close-slideshow"
            id="closeSlideshow"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeSlideshow();
            }}
          >
            <i className="fas fa-times"></i>
          </button>

          <button
            className="slide-nav slide-prev"
            id="prevSlide"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            className="slide-nav slide-next"
            id="nextSlide"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div id="slidesContainer">
            {isOpen && current && (
              <div className="slide active">
                <img src={current.src} alt={current.alt} className="slideshow-image" />
                <div className="slide-info">
                  <div className="slide-category">{current.category}</div>
                  <div className="slide-title">{current.title}</div>
                  <div className="slide-counter">
                    {currentIndex + 1} / {filteredItems.length}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="slide-indicators" id="slideIndicators">
            {isOpen &&
              filteredItems.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${idx === currentIndex ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(idx);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goTo(idx);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
