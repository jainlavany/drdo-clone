import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer";
import "./SchemesServicesPage.css";
import drdoLogo from "../assets/logo.png";

export default function SchemesServicesPage() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:4000/api/schemes-services')
      .then(r => r.json())
      .then(data => setSchemes(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching schemes:', err));
  }, []);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(item =>
      (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.desc || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [schemes, search]);

  const displayedSchemes = useMemo(() => {
    return filteredSchemes.slice(0, perPage);
  }, [filteredSchemes, perPage]);

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
            <h1>{t("Schemes and Services")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/offerings/schemes-and-services" className="connect-subnav-link active">
            {t("Schemes and Services")}
          </Link>
          <Link to="/offerings/industry-support" className="connect-subnav-link">
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

        <div className="scheme-container">
          <div className="scheme-topbar">
            <div className="scheme-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              className="scheme-select"
              value={perPage}
              onChange={e => setPerPage(Number(e.target.value))}
            >
              <option value={10}>{t("10 per page")}</option>
              <option value={20}>{t("20 per page")}</option>
              <option value={30}>{t("30 per page")}</option>
            </select>
          </div>

          <div className="scheme-grid">
            {displayedSchemes.map((item, index) => (
              <div className="scheme-card" key={item._id || index}>
                <img
                  src={drdoLogo}
                  alt="DRDO"
                  className="scheme-logo"
                />
                <div className="scheme-content">
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.desc)}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="scheme-arrow"
                  >
                    →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="scheme-update">
            {t("Last Updated : 01 Jun 2026")}
          </div>
        </div>

        <div className="scheme-bottom-btn">
          <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
            {t('← BACK TO PREVIOUS PAGE')}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}