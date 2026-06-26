import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArchive, FaExternalLinkAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import "./CompetitionsAwardsPage.css";

const PER_PAGE_OPTIONS = [
  { label: "10 per page", value: 10 },
  { label: "20 per page", value: 20 },
  { label: "30 per page", value: 30 },
];

export default function CompetitionsAwardsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/competitions-awards`)
      .then(r => r.json())
      .then(data => setAwards(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching awards:', err));
  }, []);

  const filteredAwards = useMemo(() => {
    return awards.filter(item => {
      const matchesSearch =
        (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.desc || '').toLowerCase().includes(search.toLowerCase());
      // Only show active awards (not archived) on the main page
      return matchesSearch && !item.isArchive;
    });
  }, [awards, search]);

  const displayedAwards = useMemo(() => {
    return filteredAwards.slice(0, perPage);
  }, [filteredAwards, perPage]);

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
            <h1>{t("Competitions and Awards")}</h1>
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
          <Link to="/offerings/industry-support" className="connect-subnav-link">
            {t("Industry Support")}
          </Link>
          <Link to="/offerings/vacancies" className="connect-subnav-link">
            {t("Vacancies")}
          </Link>
          <Link to="/offerings/competitions-and-awards" className="connect-subnav-link active">
            {t("Competitions and Awards")}
          </Link>
          <Link to="/offerings/products" className="connect-subnav-link">
            {t("Products")}
          </Link>
        </div>

        <div className="award-page-bg">
          <div className="award-toolbar-border">
            <div className="award-toolbar">
              <div className="award-search-wrap">
                <svg
                  className="award-search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="award-search-input"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  id="award-search"
                />
              </div>

              <div className="award-toolbar-right">
                <div className="award-select-wrap">
                  <svg
                    className="award-select-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15" height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#555" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                  <select
                    className="award-select"
                    value={perPage}
                    onChange={e => setPerPage(Number(e.target.value))}
                    id="award-per-page"
                  >
                    {PER_PAGE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{t(o.label)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="award-layout">
            <div className="award-grid">
              {displayedAwards.length > 0 ? (
                displayedAwards.map(item => (
                  <div className="award-card" key={item._id} id={`award-${item._id}`}>
                    <div className="award-card-header">
                      <h3>{t(item.title)}</h3>
                      {item.date && <span className="award-date">{item.date}</span>}
                    </div>
                    {item.desc && <p className="award-desc">{t(item.desc)}</p>}
                    {item.link && item.link !== '#' && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="award-link-btn"
                      >
                        <FaExternalLinkAlt size={11} style={{ marginRight: '6px' }} />
                        {t("View Details")}
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="award-alert">
                  <span className="award-alert-icon">⚠</span>
                  <span>{t("No Content. Kindly Visit Archives.")}</span>
                </div>
              )}
            </div>

            <div className="award-btn-wrap">
              <a
                href="https://drdo.gov.in/drdo/en/offerings/competitions-and-awards/archive"
                className="award-archive-btn"
                target="_blank"
                rel="noopener noreferrer"
                id="award-archive-link"
              >
                <FaArchive />
                VIEW ARCHIVE
              </a>
            </div>

            <div className="award-update">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 01 Jun 2026
            </div>

            <div className="award-back-row">
              <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
                {t('← BACK TO PREVIOUS PAGE')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}