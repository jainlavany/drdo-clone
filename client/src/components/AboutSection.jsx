import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AboutSection.css";

import rajnathSingh from "../assets/rajnathsingh.png";
import rakshaRM from "../assets/raksharm.jpg";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackMinisters = [
  { name: "Shri Rajnath Singh", title: "HON'BLE RAKSHA MANTRI", imageUrl: '', _fallbackImg: rajnathSingh },
  { name: "Shri Sanjay Seth", title: "RAKSHA RAJYA MANTRI", imageUrl: '', _fallbackImg: rakshaRM },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const [ministers, setMinisters] = useState(fallbackMinisters);

  useEffect(() => {
    fetch(`${SERVER}/api/home-ministers`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          // Merge with fallback images
          const merged = sorted.map((m, i) => ({
            ...m,
            _fallbackImg: i === 0 ? rajnathSingh : rakshaRM,
          }));
          setMinisters(merged);
        }
      })
      .catch(() => {});
  }, []);

  const getImage = (minister) => {
    if (minister.imageUrl) {
      return minister.imageUrl.startsWith('http') ? minister.imageUrl : `${SERVER}${minister.imageUrl}`;
    }
    return minister._fallbackImg || rajnathSingh;
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-left">
          <div className="about-heading">
            <div className="about-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
                <path d="M12 7v6" />
                <path d="M5 17v-3h14v3" />
              </svg>
            </div>
            <h2>{t("About Organisation")}</h2>
          </div>

          <p className="about-description">
            {t("DRDO is the R&D wing of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services.")}
          </p>

          <p className="about-description">
            {t("DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.")}
          </p>

          <div className="about-cards">
            <Link to="/organisation/our-team" className="about-card">
              <div className="card-icon">👥</div>
              <h3>{t("Our Team")}</h3>
            </Link>

            <Link to="/organisation/corporate-clusters" className="about-card">
              <div className="card-icon">{t("🏛️")}</div>
              <h3>{t("Corporate Clusters")}</h3>
            </Link>

            <Link to="/organisation/technology-clusters" className="about-card">
              <div className="card-icon">🏢</div>
              <h3>{t("Technology Clusters")}</h3>
            </Link>
          </div>
        </div>

        <div className="about-right">
          {ministers.map((minister, index) => (
            <div className="minister-card" key={minister._id || index}>
              <div className="minister-image-wrapper">
                <img
                  src={getImage(minister)}
                  alt={minister.name}
                  className="minister-image"
                />
              </div>
              <h3>{t(minister.name)}</h3>
              <p>{t(minister.title)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}