import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./IndustrySupportPage.css";
import drdoLogo from "../assets/logo.png";

export default function IndustrySupportPage() {
  const { t } = useTranslation();
  const [industryData, setIndustryData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/industry-support')
      .then(r => r.json())
      .then(data => setIndustryData(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching industry support:', err));
  }, []);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <Link to="/offerings/schemes-and-services" className="hero-link">{t("Offerings")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Industry Support")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/offerings/schemes-and-services" className="connect-subnav-link">
            {t("Schemes and Services")}
          </Link>
          <Link to="/offerings/industry-support" className="connect-subnav-link active">
            {t("Industry Support")}
          </Link>
          <Link to="/offerings/vacancies" className="connect-subnav-link">
            {t("Vacancies")}
          </Link>
          <Link to="/offerings/competitions-and-awards" className="connect-subnav-link">
            {t("Competitions and Awards")}
          </Link>
          <Link to="/offerings/products" className="connect-subnav-link">
            {t("Products")}
          </Link>
        </div>

        <div className="industry-container">
          <h2 className="industry-heading">
            {t("Industry Support")}
          </h2>

          <div className="industry-grid">
            {industryData.map((item, index) => (
              <div className="industry-card" key={item._id || index}>
                <img
                  src={drdoLogo}
                  alt="DRDO"
                  className="industry-logo"
                />
                <div className="industry-content">
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.desc)}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="industry-arrow"
                  >
                    →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="industry-update">
            {t("Last Updated : 12 Jun 2026")}
          </div>

          <div className="industry-bottom-btn">
            <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
              {t('← BACK TO PREVIOUS PAGE')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}