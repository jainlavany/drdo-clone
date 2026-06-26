import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import "./MediaShowcaseSection.css";

import firstImage from "../assets/lastsection1stimage.jpeg";

import slide1 from "../assets/akash_4.png";
import slide2 from "../assets/BRAHMOS.jpg";
import slide3 from "../assets/Varunastra.jpg";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackSlides = [
    { image: slide1, link: "https://drdo.gov.in/drdo/en/offerings/products/akash" },
    { image: slide2, link: "https://drdo.gov.in/drdo/en/offerings/products/brahmos" },
    { image: slide3, link: "https://drdo.gov.in/drdo/en/offerings/products/varunastra" },
];

const fallbackImages = [slide1, slide2, slide3];

export default function MediaShowcaseSection() {
  const { t } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState(fallbackSlides);

    useEffect(() => {
        fetch(`${SERVER}/api/home-media-slides`)
            .then(r => r.json())
            .then(data => {
                if (data && data.length > 0) {
                    const sorted = data
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((s, i) => ({
                            image: s.imageUrl
                                ? (s.imageUrl.startsWith('http') ? s.imageUrl : `${SERVER}${s.imageUrl}`)
                                : (fallbackImages[i] || slide1),
                            link: s.link || '#',
                        }));
                    setSlides(sorted);
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    return (
        <section className="media-showcase-section">
            <div className="media-showcase-container">

                
                <div className="media-left">
                    <img src={firstImage} alt="Showcase" />
                </div>

                
                <div className="media-right">

                    <div
                        className="slider-track"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {slides.map((slide, index) => (
                            <div className="slide" key={index}>
                                <a
                                    href={slide.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={slide.image} alt="" />
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        className="slider-arrow left-arrow"
                        onClick={prevSlide}
                    >
                        ❮
                    </button>

                    <button
                        className="slider-arrow right-arrow"
                        onClick={nextSlide}
                    >
                        ❯
                    </button>

                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={
                                    currentSlide === index
                                        ? "dot active"
                                        : "dot"
                                }
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}