import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaThLarge, FaArchive, FaExternalLinkAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import { buildApiUrl, toAbsoluteUrl } from '../apiConfig';
import './VacanciesPage.css';

// Dynamic data loaded from backend API

const PER_PAGE_OPTIONS = [
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
  { label: '20 per page', value: 20 },
];


function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
      viewBox="0 0 24 24" fill="#888" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

export default function VacanciesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch(buildApiUrl('vacancies'))
      .then(r => r.json())
      .then(data => setVacancies(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching vacancies:', err));
  }, []);

  const filtered = useMemo(() => {
    let list = vacancies.filter(v =>
      (v.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (v.advtNo || '').toLowerCase().includes(search.toLowerCase()) ||
      (v.snippet || '').toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      const valA = a.dateVal || 0;
      const valB = b.dateVal || 0;
      return sortBy === 'oldest' ? valA - valB : valB - valA;
    });
    return list;
  }, [vacancies, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const entries = filtered.slice(start, start + perPage);

  const handleSearch = v => { setSearch(v); setPage(1); };
  const handleSort = v => { setSortBy(v); setPage(1); };
  const handlePerPage = v => { setPerPage(v); setPage(1); };

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
            <h1>{t("Vacancies")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link
            to="/offerings/schemes-and-services"
            className="connect-subnav-link"
          >
            {t("Schemes and Services")}
          </Link>

          <Link
            to="/offerings/industry-support"
            className="connect-subnav-link"
          >
            {t("Industry Support")}
          </Link>

          <Link
            to="/offerings/vacancies"
            className="connect-subnav-link active"
          >
            {t("Vacancies")}
          </Link>

          <Link
            to="/offerings/competitions-and-awards"
            className="connect-subnav-link"
          >
            {t("Competitions and Awards")}
          </Link>

          <Link
            to="/offerings/products"
            className="connect-subnav-link"
          >
            {t("Products")}
          </Link>
        </div>


        <div className="vac-page-bg">


          <div className="vac-toolbar-border">
            <div className="vac-toolbar">


              <div className="vac-search-wrap">
                <svg className="vac-search-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="#aaa" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="vac-search-input"
                  type="text"
                  placeholder="Search by title, advt no, or lab..."
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  id="vac-search"
                />
              </div>


              <div className="vac-toolbar-right">


                <div className="vac-select-wrap">
                  <svg className="vac-select-icon" xmlns="http://www.w3.org/2000/svg"
                    width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="#555" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <select
                    className="vac-select"
                    value={sortBy}
                    onChange={e => handleSort(e.target.value)}
                    id="vac-sort"
                  >
                    <option value="latest">{t("Latest")}</option>
                    <option value="oldest">{t("Oldest")}</option>
                  </select>
                </div>


                <div className="vac-select-wrap">
                  <svg className="vac-select-icon" xmlns="http://www.w3.org/2000/svg"
                    width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="#555" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                  <select
                    className="vac-select"
                    value={perPage}
                    onChange={e => handlePerPage(Number(e.target.value))}
                    id="vac-per-page"
                  >
                    {PER_PAGE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{t(o.label)}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          </div>


          <div className="vac-layout">


            <div className="vac-results-info">
              Showing {filtered.length > 0 ? start + 1 : 0}–{Math.min(start + perPage, filtered.length)} of {filtered.length} {filtered.length === 1 ? 'vacancy' : 'vacancies'}
            </div>


            <div className="vac-list">
              {entries.length > 0 ? entries.map(vac => {
                const targetUrl = vac.fileUrl ? toAbsoluteUrl(vac.fileUrl) : vac.link;
                return (
                  <div key={vac._id} className="vac-card" id={`vacancy-${vac._id}`}>
                    <div className="vac-card-inner">

                      <div className="vac-card-body">
                        <h3 className="vac-card-title">{t(vac.title)}</h3>
                        <p className="vac-card-snippet">{t(vac.snippet)}</p>

                        <div className="vac-card-meta">
                          <span className="vac-advt-badge">
                            {t(vac.advtNo)}
                          </span>
                          <span className="vac-meta-item">
                            <ClockIcon />
                            <span className="vac-meta-label">{t("Published:")}</span>
                            {t(vac.publishedDate)}
                          </span>
                          <span className="vac-meta-item">
                            <span className="vac-meta-label">{t("Start:")}</span>
                            {vac.startDate}
                          </span>
                          <span className="vac-meta-item">
                            <span className="vac-meta-label">{t("End:")}</span>
                            {vac.endDate}
                          </span>
                        </div>
                      </div>

                      <div className="vac-card-action">
                        {targetUrl ? (
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="vac-view-btn"
                            id={`vac-view-${vac._id}`}
                          >
                            <FaExternalLinkAlt size={11} />
                            View More
                          </a>
                        ) : (
                          <span className="vac-view-btn disabled">
                            No Link
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                );
              }) : (
                <div className="vac-no-results">
                  {t("No vacancies found matching your search.")}
                </div>
              )}
            </div>


            {totalPages > 1 && (
              <div className="vac-pagination">
                <button className="vac-page-btn"
                  onClick={() => setPage(1)}
                  disabled={safePage === 1}
                  aria-label="First page"
                  id="vac-page-first"
                >«</button>
                <button className="vac-page-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  id="vac-page-prev"
                >‹</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`vac-page-btn${safePage === n ? ' active' : ''}`}
                    onClick={() => setPage(n)}
                    aria-current={safePage === n ? 'page' : undefined}
                    id={`vac-page-${n}`}
                  >{n}</button>
                ))}

                <button className="vac-page-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  id="vac-page-next"
                >›</button>
                <button className="vac-page-btn"
                  onClick={() => setPage(totalPages)}
                  disabled={safePage === totalPages}
                  aria-label="Last page"
                  id="vac-page-last"
                >»</button>
              </div>
            )}


            <div className="vac-bottom-row">
              <a
                href="https://drdo.gov.in/drdo/en/offerings/vacancies/archive"
                target="_blank"
                rel="noopener noreferrer"
                className="vac-archive-link"
                id="vac-archive-link"
              >
                <FaArchive />
                VIEW ARCHIVE
              </a>
              <div className="vac-last-updated">
                <ClockIcon />
                Last Updated: 22 Jun 2026
              </div>
            </div>


            <div className="vac-back-row">
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