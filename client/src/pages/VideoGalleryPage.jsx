import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import './VideoGalleryPage.css';


const ALL_VIDEOS = [
  {
    id: 'flight-trial-1500km',
    title: 'DRDO conducts successful flight trial of 1500-km range missile',
    dateStr: '11/03/2025', dateVal: 20250311,
    youtubeId: 'zfkJ1kA-kgA',
    href: 'https://www.youtube.com/watch?v=zfkJ1kA-kgA',
  },
  {
    id: 'srijan-platform',
    title: 'SRIJAN Defence Establishment and Entrepreneurs Platform — Gateway to India\'s Defence Ecosystem',
    dateStr: '31/10/2025', dateVal: 20251031,
    youtubeId: 'ArAaGdJhJSo',
    href: 'https://www.youtube.com/watch?v=ArAaGdJhJSo',
  },
  {
    id: 'join-drdo',
    title: 'Join DRDO',
    dateStr: '14/11/2024', dateVal: 20241114,
    youtubeId: null,
    href: 'https://drdo.gov.in/drdo/en/resources/video-gallery/join-drdo',
  },
];

const PER_PAGE_OPTIONS = [
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
  { label: '20 per page', value: 20 },
];


function VideoThumb({ video }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const thumbSrc = video.youtubeId
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <div className="vg-thumb">
      {thumbSrc && !imgError ? (
        <img
          src={thumbSrc}
          alt={t(video.title)}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="vg-thumb-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
            viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15l6-3.5L8 8v7z" />
          </svg>
        </div>
      )}

      <div className="vg-play-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
          viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export default function VideoGalleryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [videos, setVideos] = useState(ALL_VIDEOS);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/videos`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVideos(data);
        }
      })
      .catch(err => console.error('Error fetching videos:', err));
  }, []);

  const filtered = useMemo(() => {
    let list = videos.filter(v =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === 'oldest') {
      list = [...list].sort((a, b) => {
        const valA = a.dateVal || (a.timestamp ? parseInt(a.timestamp) : (a.createdAt ? new Date(a.createdAt).getTime() : 0));
        const valB = b.dateVal || (b.timestamp ? parseInt(b.timestamp) : (b.createdAt ? new Date(b.createdAt).getTime() : 0));
        return valA - valB;
      });
    } else {
      list = [...list].sort((a, b) => {
        const valA = a.dateVal || (a.timestamp ? parseInt(a.timestamp) : (a.createdAt ? new Date(a.createdAt).getTime() : 0));
        const valB = b.dateVal || (b.timestamp ? parseInt(b.timestamp) : (b.createdAt ? new Date(b.createdAt).getTime() : 0));
        return valB - valA;
      });
    }
    return list;
  }, [videos, search, sortBy]);

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
              <Link to="/resources/photo-gallery" className="hero-link">{t("Resources")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Video Gallery")}</h1>
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
            className="connect-subnav-link active"
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


        <div className="vg-toolbar-border">
          <div className="vg-toolbar">


            <div className="vg-search-wrap">
              <svg className="vg-search-icon" xmlns="http://www.w3.org/2000/svg"
                width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="vg-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                id="video-search"
              />
            </div>


            <div className="vg-toolbar-right">

              <div className="vg-select-wrap">
                <svg className="vg-select-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <select
                  className="vg-select"
                  value={sortBy}
                  onChange={e => handleSort(e.target.value)}
                  id="video-sort"
                >
                  <option value="latest">{t("Latest")}</option>
                  <option value="oldest">{t("Oldest")}</option>
                </select>
              </div>

              <div className="vg-select-wrap">
                <svg className="vg-select-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <select
                  className="vg-select"
                  value={perPage}
                  onChange={e => handlePerPage(Number(e.target.value))}
                  id="video-per-page"
                >
                  {PER_PAGE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{t(o.label)}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>


        <div className="vg-layout">
          <main className="vg-main-content">

            <div className="vg-grid">
              {entries.map(video => {
                const targetLink = video.href || '#';
                return (
                  <a
                    key={video._id || video.id}
                    href={targetLink}
                    className="vg-card"
                    target={targetLink !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    id={`video-${video._id || video.id}`}
                  >
                    <VideoThumb video={video} />

                    <div className="vg-card-body">
                      <div className="vg-card-title">{t(video.title)}</div>
                      <div className="vg-card-meta">
                        <span className="vg-card-date">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                            viewBox="0 0 24 24" fill="#888">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                          </svg>
                          {video.dateStr || video.date}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>


            {totalPages > 1 && (
              <div className="vg-pagination">
                <button
                  className={`vg-page-btn${safePage === 1 ? ' disabled' : ''}`}
                  onClick={() => setPage(1)}
                  disabled={safePage === 1}
                  aria-label="First page"
                >«</button>
                <button
                  className={`vg-page-btn${safePage === 1 ? ' disabled' : ''}`}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`vg-page-btn${safePage === n ? ' active' : ''}`}
                    onClick={() => setPage(n)}
                    aria-current={safePage === n ? 'page' : undefined}
                  >{n}</button>
                ))}
                <button
                  className={`vg-page-btn${safePage === totalPages ? ' disabled' : ''}`}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                >›</button>
                <button
                  className={`vg-page-btn${safePage === totalPages ? ' disabled' : ''}`}
                  onClick={() => setPage(totalPages)}
                  disabled={safePage === totalPages}
                  aria-label="Last page"
                >»</button>
              </div>
            )}


            <div className="vg-last-updated">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                viewBox="0 0 24 24" fill="#888" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 31 Oct 2025
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
