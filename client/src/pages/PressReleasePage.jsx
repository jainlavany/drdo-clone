import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import AISummarizer from '../components/AISummarizer';
import './PressReleasePage.css';

const initialArchiveRelease = [
  { id: 1, title: 'Union Minister Dr Jitendra Singh presents certificates and testimonials to the first batch of Scientists and Academicians receiving a formal training course in administration and governance', date: '06/05/2026', timestamp: 1778112000, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2258439&reg=3&lang=1' },
  { id: 2, title: 'DRDO opens CBRN Field Training & Demonstration Centre in Delhi', date: '06/05/2026', timestamp: 1778112000, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2258463&reg=3&lang=1' },
  { id: 3, title: 'Successful flight test of Long-Range Glide Bomb (LRGB) Gaurav from Su-30MKI fighter aircraft', date: '12/04/2026', timestamp: 1776038400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248102' },
  { id: 4, title: 'DRDO conducts successful flight test of new generation anti-radiation missile Rudra-II', date: '08/04/2026', timestamp: 1775692800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246059' },
  { id: 5, title: 'DRDO technology licensing agreement signed with private defence industry partners', date: '28/03/2026', timestamp: 1774742400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241940' },
  { id: 6, title: 'Successful flight test of Agni-Prime missile off Odisha coast by DRDO and Strategic Forces Command', date: '15/03/2026', timestamp: 1773619200, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2238122' },
  { id: 7, title: 'DRDO successfully test fires Very Short Range Air Defence System (VSHORADS) missile', date: '28/02/2026', timestamp: 1772236800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2232145' },
  { id: 8, title: 'DRDO successfully test fires Autonomous Flying Wing Technology Demonstrator', date: '15/12/2025', timestamp: 1765756800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2210103' },
  { id: 9, title: 'DRDO successfully test fires medium range air-to-air missile Astra', date: '10/11/2025', timestamp: 1762732800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2202021' },
  { id: 10, title: 'Successful flight test of Pinaka Multi-Barrel Rocket Launcher System', date: '28/10/2025', timestamp: 1761609600, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2198031' },
  { id: 11, title: 'NAVAL ARMAMENT ORGANISATION CONCLUDES 24th OFFICERS-IN-CHARGE (OIC) CONFERENCE AND 7th IT, PROJECT AND INFRASTRUCTURE MEETING (IPIM)', date: '13/02/2026', timestamp: 1770940800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2227814&reg=3&lang=1' },
  { id: 12, title: '24th India-US Joint Technical Group Plenary held at DRDO HQs in New Delhi to advance cooperation in Defence Science & Technologies', date: '05/02/2026', timestamp: 1770249600, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2224065&reg=3&lang=1' },
  { id: 13, title: 'INS SAGARDHWANI FLAGS OFF FOR SAGAR MAITRI V', date: '18/01/2026', timestamp: 1768694400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2215791&reg=3&lang=1' },
  { id: 14, title: 'DRDO successfully conducts two consecutive flight-tests of Pralay missile', date: '29/07/2025', timestamp: 1753747200, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2149610' },
  { id: 15, title: 'Aatmanirbhar Bharat: DRDO & AIIMS Bibinagar unveil first Make-in-India cost-effective advanced Carbon Fibre Foot Prosthesis', date: '15/07/2025', timestamp: 1752537600, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2144797' }
];

export default function PressReleasePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [releases, setReleases] = useState(initialArchiveRelease);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/press-release`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setReleases(data);
        }
      })
      .catch(err => console.error('Error fetching press releases:', err));
  }, []);

  const filteredReleases = useMemo(() => {
    return releases.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [releases, search]);

  const sortedReleases = useMemo(() => {
    return [...filteredReleases].sort((a, b) => {
      const timeA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const timeB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return sortOrder === 'latest' ? timeB - timeA : timeA - timeB;
    });
  }, [filteredReleases, sortOrder]);

  const displayedReleases = useMemo(() => {
    return sortedReleases.slice(0, 15); // Show more items now that it's dynamic
  }, [sortedReleases]);

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
            <h1>{t("Press Release")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/documents/publications" className="connect-subnav-link">{t("Publications")}</Link>
          <Link to="/documents/avalanche-warning-bulletin" className="connect-subnav-link">{t("Avalanche Warning Bulletin")}</Link>
          <Link to="/documents/drdo-in-news" className="connect-subnav-link">{t("DRDO in News")}</Link>
          <Link to="/documents/form-and-manual" className="connect-subnav-link">{t("Forms and Manuals")}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link active">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="pr-toolbar-border">
          <div className="pr-toolbar">

            <div className="pr-search-wrap">
              <svg
                className="pr-search-icon"
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
                className="pr-search-input"
                type="text"
                placeholder="Search press releases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="archive-search"
              />
            </div>


            <div className="pr-toolbar-right">
              <div className="pr-select-wrap">
                <svg
                  className="pr-select-icon"
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
                  className="pr-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  id="archive-sort"
                >
                  <option value="latest">{t("Latest first")}</option>
                  <option value="oldest">{t("Oldest first")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="pr-layout">

          <div className="pr-table-wrapper">
            <table className="pr-table">
              <thead>
                <tr>
                  <th className="pr-col-sno">{t("S.NO")}</th>
                  <th className="pr-col-title">TITLE</th>
                  <th className="pr-col-date">{t("PUBLISH DATE")}</th>
                  <th className="pr-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {displayedReleases.length > 0 ? (
                  displayedReleases.map((item, index) => {
                    const targetLink = item.fileUrl
                      ? (item.fileUrl.startsWith('http') ? item.fileUrl : `${window.SERVER_BASE_URL || 'http://localhost:4000'}${item.fileUrl}`)
                      : item.link;
                    return (
                      <tr key={item._id || item.id}>
                        <td>{index + 1}</td>
                        <td className="pr-table-title">{t(item.title)}</td>
                        <td className="pr-date-cell">{t(item.date)}</td>
                        <td style={{ textAlign: "center" }}>
                          <div className="ais-table-cell-actions">
                            <a
                              href={targetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="pr-view-btn"
                              id={`view-archive-item-${item._id || item.id}`}
                            >
                              {t("👁 View")}
                            </a>
                            <AISummarizer
                              item={item}
                              itemId={item._id || item.id || `pr-${index}`}
                              docLink={targetLink}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="pr-no-results">{t("No press releases found matching your search.")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          <div className="pr-archive-row">
            <a
              href="https://drdo.gov.in/drdo/en/documents/press-release/archive"
              target="_blank"
              rel="noreferrer"
              className="pr-archive-btn"
              id="view-archive-btn"
            >
              <span className="pr-archive-icon">📁</span>
              View Archive
            </a>
          </div>


          <div className="pr-bottom-row">
            <div className="pr-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 06 May 2026
            </div>
          </div>


          <div className="connect-back-row">
            <button onClick={() => navigate(-1)} className="connect-back-btn" id="release-back-btn">
              {t("← BACK TO PREVIOUS PAGE")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
