import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import "./HomeHighlightsSection.css";

import {
    FaFileAlt,
    FaUsers,
    FaLink,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import armedforce from "../assets/armedforce.jpeg";
import academia from "../assets/academia.png";
import industrypartner from "../assets/industrypartner.png";
import skillseeker from "../assets/skillseeker.png";
import media from "../assets/media.png";
import researcher from "../assets/researcher.png";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackDocuments = [
    { title: "DRDO in News", subtitle: "DRDO News - 05 to 19 June 2026", link: "https://drdo.gov.in/drdo/en/documents/drdo-in-news/drdo-news-05-19-june-2026" },
    { title: "Publication", subtitle: "DRDO Samachar November 2021 (Hindi)", link: "https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-november-2021-hindi" },
    { title: "Publication", subtitle: "DRDO Samachar August 2021 (Hindi)", link: "https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-august-2021-hindi" },
    { title: "Publication", subtitle: "DRDO Samachar July 2021 (Hindi)", link: "https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-july-2021-hindi" },
];

const fallbackPersonaImages = [armedforce, academia, industrypartner, skillseeker, media, researcher];

const fallbackPersonas = [
    { title: "Armed Force", image: armedforce, link: "https://www.drdo.gov.in/drdo/persona-content/Armed-Forces" },
    { title: "Academia", image: academia, link: "https://www.drdo.gov.in/drdo/persona-content/Academia" },
    { title: "Industry Partner", image: industrypartner, link: "https://www.drdo.gov.in/drdo/persona-content/Industry-Partner" },
    { title: "Skill Seeker", image: skillseeker, link: "https://www.drdo.gov.in/drdo/persona-content/Skill-Seeker" },
    { title: "Media", image: media, link: "https://www.drdo.gov.in/drdo/persona-content/Media" },
    { title: "Researcher", image: researcher, link: "https://www.drdo.gov.in/drdo/persona-content/Researcher" },
];

const fallbackImportantLinks = [
    { title: "Industry Partner Registration (Seller/Supplier)", link: "https://drdo.res.in/industry/iprm" },
    { title: "Recruitment And Assessment Centre (RAC)", link: "https://rac.gov.in/index.php?lang=en&id=0" },
    { title: "BrahMos", link: "http://www.brahmos.com/" },
    { title: "Aeronautical Development Agency", link: "https://ada.gov.in/" },
    { title: "Technology Development Fund (TDF)", link: "https://tdf.drdo.gov.in/" },
];

export default function HomeHighlightsSection() {
  const { t } = useTranslation();
    const [currentPersona, setCurrentPersona] = useState(0);
    const [documents, setDocuments] = useState(fallbackDocuments);
    const [personas, setPersonas] = useState(fallbackPersonas);

    useEffect(() => {
        // Fetch documents
        fetch(`${SERVER}/api/home-documents`)
            .then(r => r.json())
            .then(data => {
                if (data && data.length > 0) {
                    const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
                    setDocuments(sorted);
                }
            })
            .catch(() => {});

        // Fetch personas
        fetch(`${SERVER}/api/home-personas`)
            .then(r => r.json())
            .then(data => {
                if (data && data.length > 0) {
                    const sorted = data
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((p, i) => ({
                            ...p,
                            image: p.imageUrl
                                ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${SERVER}${p.imageUrl}`)
                                : (fallbackPersonaImages[i] || armedforce),
                        }));
                    setPersonas(sorted);
                }
            })
            .catch(() => {});
    }, []);

    const nextPersona = () => {
        setCurrentPersona((prev) => (prev + 1) % personas.length);
    };

    const prevPersona = () => {
        setCurrentPersona(
            (prev) => (prev - 1 + personas.length) % personas.length
        );
    };

    return (
        <section className="home-highlights">
            

            <div className="documents-section">
                <h2>
                    <FaFileAlt /> Recent Documents
                </h2>

                <div className="documents-grid">
                    {documents.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className="document-card"
                        >
                            <h3>{t(item.title)}</h3>
                            <p>{item.subtitle}</p>
                        </a>
                    ))}
                </div>

                <a href="https://drdo.gov.in/drdo/documents/publications" className="view-all-btn">
                    {t("VIEW ALL")}
                </a>
            </div>

            

            <div className="persona-section">
                <h2>
                    <FaUsers /> Explore User Personas
                </h2>

                <div className="persona-slider">
                    <button onClick={prevPersona}>
                        <FaChevronLeft />
                    </button>

                    <a
                        href={personas[currentPersona]?.link || '#'}
                        className="persona-content"
                    >
                        <img
                            src={personas[currentPersona]?.image || armedforce}
                            alt=""
                        />

                        <h3>{personas[currentPersona]?.title}</h3>
                    </a>

                    <button onClick={nextPersona}>
                        <FaChevronRight />
                    </button>
                </div>

                <div className="dots">
                    {personas.map((_, index) => (
                        <span
                            key={index}
                            className={
                                currentPersona === index
                                    ? "dot active-dot"
                                    : "dot"
                            }
                        />
                    ))}
                </div>
            </div>

            

            <div className="important-links-section">
                <h2>
                    <FaLink /> Important Links
                </h2>

                <div className="links-scroll">
                    {fallbackImportantLinks.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className="important-link-card"
                        >
                            <span>{t(item.title)}</span>
                            <FaChevronRight />
                        </a>
                    ))}
                </div>

                <a href="https://drdo.gov.in/drdo/documents/publications" className="view-all-btn">
                    {t("VIEW ALL")}
                </a>
            </div>
        </section>
    );
}