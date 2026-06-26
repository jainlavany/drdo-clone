import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import "./ImportantLinksCarousel.css";

import img1 from "../assets/1.webp";
import img2 from "../assets/2.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.webp";
import img5 from "../assets/5.webp";
import img6 from "../assets/6.webp";
import img7 from "../assets/7.webp";
import img8 from "../assets/8.webp";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const fallbackItems = [
    { img: img1, link: "https://www.india.gov.in/" },
    { img: img2, link: "https://www.india.gov.in/" },
    { img: img3, link: "https://www.gallantryawards.gov.in/" },
    { img: img4, link: "https://indiainvestmentgrid.gov.in/" },
    { img: img5, link: "https://www.eci.gov.in/" },
    { img: img6, link: "pib.gov.in/index.aspx?reg=48&lang=2" },
    { img: img7, link: "https://wcd.nic.in/bbbp-schemes/" },
    { img: img8, link: "https://www.digitalindia.gov.in/" },
];

export default function ImportantLinksCarousel() {
    const { t } = useTranslation();
    const [start, setStart] = useState(0);
    const [images, setImages] = useState(fallbackItems);

    useEffect(() => {
        fetch(`${SERVER}/api/home-bottom-links`)
            .then(r => r.json())
            .then(data => {
                if (data && data.length > 0) {
                    const sorted = data
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((item, i) => ({
                            img: item.imageUrl
                                ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${SERVER}${item.imageUrl}`)
                                : (fallbackImages[i] || img1),
                            link: item.link || '#',
                        }));
                    setImages(sorted);
                }
            })
            .catch(() => {});
    }, []);

    const visibleCount = Math.min(5, images.length);

    const prev = () => {
        setStart((s) => (s === 0 ? images.length - visibleCount : s - 1));
    };

    const next = () => {
        setStart((s) => (s === images.length - visibleCount ? 0 : s + 1));
    };

    return (
        <section className="important-links-carousel">
            <button className="carousel-arrow" onClick={prev}>
                ❮
            </button>

            <div className="carousel-track">
                {images.slice(start, start + visibleCount).map((item, i) => (
                    <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="carousel-card"
                    >
                        <img src={item.img} alt="" />
                    </a>
                ))}
            </div>

            <button className="carousel-arrow" onClick={next}>
                ❯
            </button>
        </section>
    );
}