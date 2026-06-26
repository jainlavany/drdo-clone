import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import './AvalancheWarningPage.css';

const initialBulletins = [
  { id: 1, title: 'Avalanche Warning Bulletin - 03 June 2026', date: '03-06-2026', timestamp: 1780512000, size: '745.46 KB', file: 'DGRE_AWB_03-Jun-2026.pdf' },
  { id: 2, title: 'Closing of Operational Avalanche Forecasting Services for the Winter Season 2025-26', date: '03-06-2026', timestamp: 1780512000, size: '409.91 KB', file: 'NDMA_closingofwinter2025_26.pdf' },
  { id: 3, title: 'Avalanche Warning Bulletin - 02 June 2026', date: '02-06-2026', timestamp: 1780425600, size: '720.12 KB', file: 'DGRE_AWB_02-Jun-2026.pdf' },
  { id: 4, title: 'Avalanche Warning Bulletin - 01 June 2026', date: '01-06-2026', timestamp: 1780339200, size: '710.45 KB', file: 'DGRE_AWB_01-Jun-2026.pdf' },
  { id: 5, title: 'Avalanche Warning Bulletin - 31 May 2026', date: '31-05-2026', timestamp: 1780252800, size: '690.30 KB', file: 'DGRE_AWB_31-May-2026.pdf' },
  { id: 6, title: 'Avalanche Warning Bulletin - 30 May 2026', date: '30-05-2026', timestamp: 1780166400, size: '730.22 KB', file: 'DGRE_AWB_30-May-2026.pdf' },
  { id: 7, title: 'Avalanche Warning Bulletin - 29 May 2026', date: '29-05-2026', timestamp: 1780080000, size: '702.15 KB', file: 'DGRE_AWB_29-May-2026.pdf' },
  { id: 8, title: 'Avalanche Warning Bulletin - 28 May 2026', date: '28-05-2026', timestamp: 1779993600, size: '698.88 KB', file: 'DGRE_AWB_28-May-2026.pdf' },
  { id: 9, title: 'Avalanche Warning Bulletin - 27 May 2026', date: '27-05-2026', timestamp: 1779907200, size: '710.22 KB', file: 'DGRE_AWB_27-May-2026.pdf' },
  { id: 10, title: 'Avalanche Warning Bulletin - 26 May 2026', date: '26-05-2026', timestamp: 1779820800, size: '705.50 KB', file: 'DGRE_AWB_26-May-2026.pdf' },
  { id: 11, title: 'Avalanche Warning Bulletin- 25 May 2026', date: '25-05-2026', timestamp: 1779734400, size: '741.71 KB', file: 'DGRE_AWB_25-May-2026.pdf' },
  { id: 12, title: 'Avalanche Warning Bulletin- 24 May 2026', date: '24-05-2026', timestamp: 1779648000, size: '741.46 KB', file: 'DGRE_AWB_24-May-2026.pdf' },
  { id: 13, title: 'Avalanche Warning Bulletin- 23 May 2026', date: '23-05-2026', timestamp: 1779561600, size: '720.50 KB', file: 'DGRE_AWB_23-May-2026.pdf' },
  { id: 14, title: 'Avalanche Warning Bulletin- 22 May 2026', date: '22-05-2026', timestamp: 1779475200, size: '730.00 KB', file: 'DGRE_AWB_22-May-2026.pdf' }
];

export default function AvalancheWarningPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [bulletins, setBulletins] = useState(initialBulletins);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/avalanche-bulletin`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setBulletins(data);
        }
      })
      .catch(err => console.error('Error fetching bulletins:', err));
  }, []);

  const filteredBulletins = useMemo(() => {
    return bulletins.filter(item =>
      item.title ? item.title.toLowerCase().includes(search.toLowerCase()) : false
    );
  }, [bulletins, search]);

  const sortedBulletins = useMemo(() => {
    return [...filteredBulletins].sort((a, b) => {
      const tsA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const tsB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      if (sortOrder === 'latest') {
        return tsB - tsA;
      } else {
        return tsA - tsB;
      }
    });
  }, [filteredBulletins, sortOrder]);

  const totalItems = sortedBulletins.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirstItem = (safePage - 1) * itemsPerPage;
  const paginatedBulletins = sortedBulletins.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <Link to="/documents/publications" className="hero-link">{t("Documents")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Avalanche Warning Bulletin")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/documents/publications" className="connect-subnav-link">{t("Publications")}</Link>
          <Link to="/documents/avalanche-warning-bulletin" className="connect-subnav-link active">{t("Avalanche Warning Bulletin")}</Link>
          <Link to="/documents/drdo-in-news" className="connect-subnav-link">{t("DRDO in News")}</Link>
          <Link to="/documents/form-and-manual" className="connect-subnav-link">{t("Forms and Manuals")}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="aw-toolbar-border">
          <div className="aw-toolbar">

            <div className="aw-search-wrap">
              <svg
                className="aw-search-icon"
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
                className="aw-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                id="bulletin-search"
              />
            </div>


            <div className="aw-toolbar-right">

              <div className="aw-select-wrap">
                <svg
                  className="aw-select-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#555" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <select
                  className="aw-select"
                  value={sortOrder}
                  onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                  id="bulletin-sort"
                >
                  <option value="latest">{t("Latest first")}</option>
                  <option value="oldest">{t("Oldest first")}</option>
                </select>
              </div>


              <div className="aw-select-wrap">
                <svg
                  className="aw-select-icon"
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
                  className="aw-select"
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  id="bulletin-limit"
                >
                  <option value={5}>{t("5 per page")}</option>
                  <option value={10}>{t("10 per page")}</option>
                  <option value={20}>{t("20 per page")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="aw-layout">

          <div className="aw-table-wrapper">
            <table className="aw-table">
              <thead>
                <tr>
                  <th className="aw-col-sno">{t("S.NO")}</th>
                  <th className="aw-col-title">TITLE</th>
                  <th className="aw-col-date">DATE</th>
                  <th className="aw-col-size">{t("TYPE/SIZE")}</th>
                  <th className="aw-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBulletins.length > 0 ? (
                  paginatedBulletins.map((item, index) => {
                    const targetLink = item.fileUrl
                      ? (item.fileUrl.startsWith('http') ? item.fileUrl : `${window.SERVER_BASE_URL || 'http://localhost:4000'}${item.fileUrl}`)
                      : (item.link || `https://drdo.gov.in/drdo/sites/default/files/avalanche_warning_bulletin/${item.file}`);
                    return (
                      <tr key={item._id || item.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td className="aw-table-title">{t(item.title)}</td>
                        <td className="aw-date-cell">{t(item.date)}</td>
                        <td>
                          PDF
                          <span className="aw-file-info">({item.size})</span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <a
                            href={targetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="aw-view-btn"
                            id={`view-bulletin-${item._id || item.id}`}
                          >
                            {t("👁 View")}
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="aw-no-results">{t("No bulletins found matching your search.")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {totalPages > 1 && (
            <div className="aw-pagination">
              <div className="aw-pagination-info">
                Showing {sortedBulletins.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfFirstItem + itemsPerPage, totalItems)} of {totalItems} entries
              </div>
              <div className="aw-pagination-btns">
                <button
                  className={`aw-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={safePage === 1}
                >
                  «
                </button>
                <button
                  className={`aw-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`aw-page-btn ${safePage === p ? 'active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className={`aw-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                >
                  ›
                </button>
                <button
                  className={`aw-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={safePage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}


          <div className="aw-bottom-row">
            <div className="aw-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 03 Jun 2026
            </div>
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
