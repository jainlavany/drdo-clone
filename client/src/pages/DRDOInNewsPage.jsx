import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import AISummarizer from '../components/AISummarizer';
import './DRDOInNewsPage.css';

const initialNews = [
  { id: 1, title: 'DRDO News - 04 June 2026', date: '04/06/2026', timestamp: 1780598400, size: '2.10 MB', file: 'drdo_news_04_jun_2026.pdf' },
  { id: 2, title: 'DRDO News - 03 June 2026', date: '03/06/2026', timestamp: 1780512000, size: '2.13 MB', file: 'drdo_news_03_jun_2026.pdf' },
  { id: 3, title: 'DRDO News - 02 June 2026', date: '02/06/2026', timestamp: 1780425600, size: '1.85 MB', file: 'drdo_news_02_jun_2026.pdf' },
  { id: 4, title: 'DRDO News - 01 June 2026', date: '01/06/2026', timestamp: 1780339200, size: '2.05 MB', file: 'drdo_news_01_jun_2026.pdf' },
  { id: 5, title: 'DRDO News - 31 May 2026', date: '31/05/2026', timestamp: 1780252800, size: '1.92 MB', file: 'drdo_news_31_may_2026.pdf' },
  { id: 6, title: 'DRDO News - 30 May 2026', date: '30/05/2026', timestamp: 1780166400, size: '2.22 MB', file: 'drdo_news_30_may_2026.pdf' },
  { id: 7, title: 'DRDO News - 29 May 2026', date: '29/05/2026', timestamp: 1780080000, size: '2.01 MB', file: 'drdo_news_29_may_2026.pdf' },
  { id: 8, title: 'DRDO News - 28 May 2026', date: '28/05/2026', timestamp: 1779993600, size: '1.96 MB', file: 'drdo_news_28_may_2026.pdf' },
  { id: 9, title: 'DRDO News - 27 May 2026', date: '27/05/2026', timestamp: 1779907200, size: '1.90 MB', file: 'drdo_news_27_may_2026.pdf' },
  { id: 10, title: 'DRDO News - 26 May 2026', date: '26/05/2026', timestamp: 1779820800, size: '2.15 MB', file: 'drdo_news_26_may_2026.pdf' },
  { id: 11, title: 'DRDO News - 07 May 2026', date: '07/05/2026', timestamp: 1778179200, size: '2.51 MB', file: 'drdo_news_07_may_2026.pdf' },
  { id: 12, title: 'DRDO News - 01 to 04 May 2026', date: '04/05/2026', timestamp: 1777920000, size: '1.92 MB', file: 'drdo_news_01_04_may_2026.pdf' },
  { id: 13, title: 'DRDO News - 30 April 2026', date: '30/04/2026', timestamp: 1777574400, size: '3.72 MB', file: 'drdo_news_30_april_2026.pdf' },
  { id: 14, title: 'DRDO News - 29 April 2026', date: '29/04/2026', timestamp: 1777488000, size: '2.00 MB', file: 'drdo_news_29_april_2026.pdf' },
  { id: 15, title: 'DRDO News - 28 April 2026', date: '28/04/2026', timestamp: 1777401600, size: '1.83 MB', file: 'drdo_news_28_april_2026.pdf' }
];

export default function DRDOInNewsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [news, setNews] = useState(initialNews);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/drdo-in-news`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setNews(data);
        }
      })
      .catch(err => console.error('Error fetching news:', err));
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter(item =>
      (item.title || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [news, search]);

  const sortedNews = useMemo(() => {
    return [...filteredNews].sort((a, b) => {
      const tsA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const tsB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      if (sortOrder === 'latest') {
        return tsB - tsA;
      } else {
        return tsA - tsB;
      }
    });
  }, [filteredNews, sortOrder]);

  const displayedNews = useMemo(() => {
    return sortedNews.slice(0, 9);
  }, [sortedNews]);

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
            <h1>{t("DRDO in News")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/documents/publications" className="connect-subnav-link">{t("Publications")}</Link>
          <Link to="/documents/avalanche-warning-bulletin" className="connect-subnav-link">{t("Avalanche Warning Bulletin")}</Link>
          <Link to="/documents/drdo-in-news" className="connect-subnav-link active">{t("DRDO in News")}</Link>
          <Link to="/documents/form-and-manual" className="connect-subnav-link">{t("Forms and Manuals")}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="dn-toolbar-border">
          <div className="dn-toolbar">

            <div className="dn-search-wrap">
              <svg
                className="dn-search-icon"
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
                className="dn-search-input"
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="news-search"
              />
            </div>


            <div className="dn-toolbar-right">
              <div className="dn-select-wrap">
                <svg
                  className="dn-select-icon"
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
                  className="dn-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  id="news-sort"
                >
                  <option value="latest">{t("Latest first")}</option>
                  <option value="oldest">{t("Oldest first")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="dn-layout">

          <div className="dn-table-wrapper">
            <table className="dn-table">
              <thead>
                <tr>
                  <th className="dn-col-sno">{t("S.NO")}</th>
                  <th className="dn-col-title">TITLE</th>
                  <th className="dn-col-date">DATE</th>
                  <th className="dn-col-size">{t("TYPE/SIZE")}</th>
                  <th className="dn-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {displayedNews.length > 0 ? (
                  displayedNews.map((item, index) => {
                    const targetLink = item.fileUrl
                      ? (item.fileUrl.startsWith('http') ? item.fileUrl : `${window.SERVER_BASE_URL || 'http://localhost:4000'}${item.fileUrl}`)
                      : (item.link
                        ? (item.link.startsWith('http') ? item.link : `${window.SERVER_BASE_URL || 'http://localhost:4000'}${item.link}`)
                        : (item.file ? `https://drdo.gov.in/drdo/sites/default/files/drdo_in_news/${item.file}` : '')
                      );
                    return (
                      <tr key={item._id || item.id}>
                        <td>{index + 1}</td>
                        <td className="dn-table-title">{t(item.title)}</td>
                        <td className="dn-date-cell">{t(item.date)}</td>
                        <td>
                          PDF
                          <span className="dn-file-info">({item.size})</span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="ais-table-cell-actions">
                            <a
                              href={targetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="dn-view-btn"
                              id={`view-news-${item._id || item.id}`}
                            >
                              {t("👁 View")}
                            </a>
                            <AISummarizer
                              item={item}
                              itemId={item._id || item.id || `dn-${index}`}
                              docLink={targetLink}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="dn-no-results">{t("No news items found matching your search.")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          <div className="dn-archive-row">
            <a
              href="https://drdo.gov.in/drdo/en/documents/drdo-in-news/archive"
              target="_blank"
              rel="noreferrer"
              className="dn-archive-btn"
              id="news-archive-btn"
            >
              <span className="dn-archive-icon">📁</span>
              View Archive
            </a>
          </div>


          <div className="dn-bottom-row">
            <div className="dn-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 04 Jun 2026
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
