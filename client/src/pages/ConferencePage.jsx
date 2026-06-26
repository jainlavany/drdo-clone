import { useTranslation } from 'react-i18next';
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArchive } from "react-icons/fa";
import Footer from "../components/Footer";
import "./ConferencePage.css";

const conferences = [
  {
    id: 1,
    title:
      "DRDO is going to organise Unmesh-2027 Fourth All India Technical Rajbhasha Conference on Dated 10-11 January 2027",
    startDate: "14/05/2026",
    endDate: "11/01/2027",
    link: "https://drdo.gov.in/drdo/en/announcement/drdo-going-organise-unmesh-2027-fourth-all-india-technical-rajbhasha-conference-dated",
  },
  {
    id: 2,
    title:
      "International Conference on Autonomous Aerial Vehicles ICAAV - 2026 On 20-21 Aug 2026 Jointly Organized by ADE-DRDO and Design Division-AeSI",
    startDate: "25/03/2026",
    endDate: "21/08/2026",
    link: "https://www.ddaesi.in/icaav-2026",
  },
];

const PER_PAGE_OPTIONS = [
  { label: "10 per page", value: 10 },
  { label: "15 per page", value: 15 },
  { label: "20 per page", value: 20 },
];

export default function ConferencePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() =>
    conferences.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const rows = filtered.slice(0, perPage);

  return (
    <>
      <div className="connect-page-wrapper">

        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <Link to="/resources/photo-gallery" className="hero-link">{t("Resources")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Conference")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link
            to="/resources/photo-gallery"
            className="connect-subnav-link"
          >
            {t("Photo Gallery")}
          </Link>

          <Link
            to="/resources/video-gallery"
            className="connect-subnav-link"
          >
            {t("Video Gallery")}
          </Link>

          <Link
            to="/resources/conference"
            className="connect-subnav-link active"
          >
            {t("Conference")}
          </Link>

          <Link
            to="/resources/onos"
            className="connect-subnav-link"
          >
            {t("ONOS")}
          </Link>
        </div>


        <div className="cp-toolbar-border">
          <div className="cp-toolbar">


            <div className="cp-search-wrap">
              <svg
                className="cp-search-icon"
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
                className="cp-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="conf-search"
              />
            </div>


            <div className="cp-toolbar-right">
              <div className="cp-select-wrap">
                <svg
                  className="cp-select-icon"
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
                  className="cp-select"
                  value={perPage}
                  onChange={e => setPerPage(Number(e.target.value))}
                  id="conf-per-page"
                >
                  {PER_PAGE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{t(o.label)}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>


        <div className="cp-layout">


          <div className="cp-table-wrapper">
            <table className="cp-table">
              <thead>
                <tr>
                  <th className="cp-col-sno">{t("S.NO")}</th>
                  <th className="cp-col-title">TITLE</th>
                  <th className="cp-col-date">{t("START DATE")}</th>
                  <th className="cp-col-date">{t("END DATE")}</th>
                  <th className="cp-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="cp-table-title">{t(item.title)}</td>
                    <td className="cp-date-cell">{item.startDate}</td>
                    <td className="cp-date-cell">{item.endDate}</td>
                    <td style={{ textAlign: "center" }}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cp-view-btn"
                        id={`conf-view-${item.id}`}
                      >
                        {t("👁 View")}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="cp-bottom-actions">
            <a
              href="https://drdo.gov.in/drdo/en/resources/conference/archive"
              target="_blank"
              rel="noreferrer"
              className="cp-archive-link"
              id="conf-archive-link"
            >
              <FaArchive />
              VIEW ARCHIVE
            </a>
          </div>


          <div className="cp-last-updated">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13" height="13"
              viewBox="0 0 24 24"
              fill="#888"
              aria-hidden="true"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            Last Updated: 25 Mar 2026
          </div>


          <div className="connect-back-row">
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