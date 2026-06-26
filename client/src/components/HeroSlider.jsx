import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from "react";
import "./HeroSlider.css";

import hero1 from "../assets/1sthero.jpg";
import hero2 from "../assets/2ndhero.webp";
import hero3 from "../assets/hero3.jpg";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackSlides = [
  {
    image: hero1,
    caption: "",
    link: "https://www.mygov.in/group-issue/inviting-ideas-mann-ki-baat-prime-minister-narendra-modi-28th-june-2026/?target=inapp&type=group_issue&nid=5670",
  },
  {
    image: hero2,
    caption:
      "Join DRDO : Be a part of journey towards Aatmanirbhar Bharat in Defence R&D",
    link: "https://drdo.res.in/candidates21/index.php",
  },
  {
    image: hero3,
    caption: "",
    link: "https://rac.gov.in/index.php?lang=en&id=0",
  },
];

export default function HeroSlider() {
  const { t } = useTranslation();
  const [slides, setSlides] = useState(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  // Fetch from API
  useEffect(() => {
    fetch(`${SERVER}/api/hero-slides`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(s => ({
              image: s.imageUrl ? (s.imageUrl.startsWith('http') ? s.imageUrl : `${SERVER}${s.imageUrl}`) : hero1,
              caption: s.subtitle || '',
              link: s.link || '',
            }));
          setSlides(mapped);
        }
      })
      .catch(() => {}); // fallback to static data
  }, []);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);

    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  };

  const goToSlide = (index) => {
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <section className="hero-slider">
      <div
        className="slides-wrapper"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide.link ? (
              <a href={slide.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%", width: "100%" }}>
                <img
                  src={slide.image}
                  alt={`slide-${index + 1}`}
                  className="slide-image"
                />
              </a>
            ) : (
              <img
                src={slide.image}
                alt={`slide-${index + 1}`}
                className="slide-image"
              />
            )}

            {slide.caption && (
              <div className="slide-caption">
                {slide.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="slider-arrow left"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        ❮
      </button>

      <button
        className="slider-arrow right"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        ❯
      </button>

      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${current === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="slider-pause"
        onClick={() => setIsPaused((prev) => !prev)}
        aria-label="Pause Slider"
      >
        {isPaused ? "▶" : "❚❚"}
      </button>
    </section>
  );
}
