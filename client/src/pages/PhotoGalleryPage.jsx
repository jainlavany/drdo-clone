import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './PhotoGalleryPage.css';


const ALL_ENTRIES = [
  { id: 'mar-apr-2026', title: 'Photo Gallery: March and April 2026', dateStr: '13/04/2026', dateVal: 20260413, items: 5 },
  { id: 'jan-feb-2026', title: 'Photo Gallery: January and February 2026', dateStr: '19/02/2026', dateVal: 20260219, items: 8 },
  { id: 'nov-dec-2025', title: 'Photo Gallery: November and December 2025', dateStr: '08/12/2025', dateVal: 20251208, items: 4 },
  { id: 'sep-oct-2025', title: 'Photo Gallery: September and October 2025', dateStr: '31/10/2025', dateVal: 20251031, items: 5 },
  { id: 'aug-2025', title: 'Photo Gallery: August 2025', dateStr: '01/08/2025', dateVal: 20250801, items: 3 },
  { id: 'jun-jul-2025', title: 'Photo Gallery: June and July 2025', dateStr: '14/07/2025', dateVal: 20250714, items: 2 },
  { id: 'may-2025', title: 'Photo Gallery: May 2025', dateStr: '01/05/2025', dateVal: 20250501, items: 3 },
  { id: 'mar-apr-2025', title: 'Photo Gallery: March and April 2025', dateStr: '08/04/2025', dateVal: 20250408, items: 13 },
  { id: 'jan-feb-2025', title: 'Photo Gallery: January and February 2025', dateStr: '25/02/2025', dateVal: 20250225, items: 10 },
  { id: 'nov-dec-2024', title: 'Photo Gallery: November and December 2024', dateStr: '05/12/2024', dateVal: 20241205, items: 5 },
  { id: 'sep-oct-2024', title: 'Photo Gallery: September and October 2024', dateStr: '30/10/2024', dateVal: 20241030, items: 7 },
  { id: 'jul-aug-2024', title: 'Photo Gallery: July and August 2024', dateStr: '28/08/2024', dateVal: 20240828, items: 6 },
  { id: 'may-jun-2024', title: 'Photo Gallery: May and June 2024', dateStr: '20/06/2024', dateVal: 20240620, items: 4 },
  { id: 'mar-apr-2024', title: 'Photo Gallery: March and April 2024', dateStr: '12/04/2024', dateVal: 20240412, items: 8 },
  { id: 'jan-feb-2024', title: 'Photo Gallery: January and February 2024', dateStr: '20/02/2024', dateVal: 20240220, items: 5 },
];


function ImagePlaceholder() {
  return (
    <div className="pg-thumb-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
        fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

const PER_PAGE_OPTIONS = [
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
  { label: '20 per page', value: 20 },
];

export default function PhotoGalleryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(10);


  const filtered = useMemo(() => {
    let list = ALL_ENTRIES.filter(e =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === 'oldest') {
      list = [...list].sort((a, b) => a.dateVal - b.dateVal);
    } else {

      list = [...list].sort((a, b) => b.dateVal - a.dateVal);
    }
    return list;
  }, [search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const entries = filtered.slice(start, start + perPage);

  const handlePerPage = (val) => {
    setPerPage(val);
    setPage(1);
  };

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleSort = (val) => {
    setSortBy(val);
    setPage(1);
  };

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
            <h1>{t("Photo Gallery")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link
            to="/resources/photo-gallery"
            className="connect-subnav-link active"
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
            className="connect-subnav-link"
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


        <div className="pg-toolbar-border">
          <div className="pg-toolbar">


            <div className="pg-search-wrap">
              <svg className="pg-search-icon" xmlns="http://www.w3.org/2000/svg"
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="pg-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                id="gallery-search"
              />
            </div>


            <div className="pg-toolbar-right">


              <div className="pg-select-wrap">
                <svg className="pg-select-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <select
                  className="pg-select"
                  value={sortBy}
                  onChange={e => handleSort(e.target.value)}
                  id="gallery-sort"
                >
                  <option value="latest">{t("Latest")}</option>
                  <option value="oldest">{t("Oldest")}</option>
                </select>
              </div>


              <div className="pg-select-wrap">
                <svg className="pg-select-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <select
                  className="pg-select"
                  value={perPage}
                  onChange={e => handlePerPage(Number(e.target.value))}
                  id="gallery-per-page"
                >
                  {PER_PAGE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{t(o.label)}</option>
                  ))}
                </select>
              </div>

            </div>

          </div>
        </div>


        <div className="pg-layout">
          <main className="pg-main-content">

            <div className="pg-grid">
              {entries.map((entry) => (

                <a
                  key={entry.id}
                  href="#"
                  className="pg-card"
                  id={`gallery-${entry.id}`}
                >
                  <div className="pg-thumb">

                    <ImagePlaceholder />
                    <span className="pg-card-arrow">›</span>
                  </div>

                  <div className="pg-card-body">
                    <div className="pg-card-title">{t(entry.title)}</div>
                    <div className="pg-card-meta">
                      <span className="pg-card-date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                          viewBox="0 0 24 24" fill="#888">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                        </svg>
                        {entry.dateStr}
                      </span>
                      <span className="pg-card-count">{entry.items} ITEMS</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>


            {totalPages > 1 && (
              <div className="pg-pagination">
                <button
                  className={`pg-page-btn${safePage === 1 ? ' disabled' : ''}`}
                  onClick={() => setPage(1)}
                  disabled={safePage === 1}
                  aria-label="First page"
                  id="pagination-first"
                >«</button>
                <button
                  className={`pg-page-btn${safePage === 1 ? ' disabled' : ''}`}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  id="pagination-prev"
                >‹</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`pg-page-btn${safePage === n ? ' active' : ''}`}
                    onClick={() => setPage(n)}
                    aria-current={safePage === n ? 'page' : undefined}
                    id={`pagination-${n}`}
                  >{n}</button>
                ))}

                <button
                  className={`pg-page-btn${safePage === totalPages ? ' disabled' : ''}`}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  id="pagination-next"
                >›</button>
                <button
                  className={`pg-page-btn${safePage === totalPages ? ' disabled' : ''}`}
                  onClick={() => setPage(totalPages)}
                  disabled={safePage === totalPages}
                  aria-label="Last page"
                  id="pagination-last"
                >»</button>
              </div>
            )}


            <div className="pg-last-updated">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                viewBox="0 0 24 24" fill="#888" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 13 Apr 2026
            </div>


            <div className="connect-back-row">
              <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
                {t('← BACK TO PREVIOUS PAGE')}
              </button>
            </div>

          </main>
        </div>

      </div>

      <Footer />
    </>
  );
}
