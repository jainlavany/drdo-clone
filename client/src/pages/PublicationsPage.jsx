import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import drdoLogo from '../assets/logo.png';
import './PublicationsPage.css';

const categories = [
  {
    id: 'newsletter',
    title: 'DRDO Newsletter',
    description: 'Monthly newsletter highlighting recent activities, events, and visits of dignitaries across DRDO labs.',
  },
  {
    id: 'journals',
    title: 'DRDO Published Journals',
    description: 'Peer-reviewed scientific journals including Defence Science Journal (DSJ) and Defence Life Science Journal (DLSJ).',
  },
  {
    id: 'samachar',
    title: 'DRDO Samachar',
    description: 'Bimonthly publication covering milestones, technological achievements, and organizational news in Hindi.',
  },
  {
    id: 'monograph',
    title: 'Monograph',
    description: 'Specialized scientific treatises and technical monographs authored by leading defence scientists.',
  },
  {
    id: 'tech-focus',
    title: 'Technology Focus',
    description: 'Bimonthly bulletin detailing technology areas and product developments of interest to user services.',
  },
  {
    id: 'vishesh',
    title: 'Prodhyogiki Vishesh',
    description: 'Technical digests and focus brochures highlighting specific domains of engineering and research in Hindi.',
  },
  {
    id: 'other',
    title: 'Other publications',
    description: 'Brochures, coffee table books, reference manuals, and other general informational publications.',
  },
];

const publicationsData = {
  newsletter: [
    { id: 1, title: 'DRDO Newsletter - June 2026: Celebrating National Technology Day & Defence Excellence', year: '2026', size: '1.14 MB', date: '01/06/2026' },
    { id: 2, title: 'DRDO Newsletter - May 2026: Advances in Drone and Anti-Drone Technologies', year: '2026', size: '1.25 MB', date: '01/05/2026' },
    { id: 3, title: 'DRDO Newsletter - April 2026: Artificial Intelligence & Machine Learning in Tactical Systems', year: '2026', size: '1.89 MB', date: '01/04/2026' },
    { id: 4, title: 'DRDO Newsletter - March 2026: Indigenous Radar & Sonar Development Milestones', year: '2026', size: '1.42 MB', date: '01/03/2026' },
    { id: 5, title: 'DRDO Newsletter - February 2026: Aerospace & Aero-engines Breakthroughs', year: '2026', size: '1.30 MB', date: '01/02/2026' },
    { id: 6, title: 'DRDO Newsletter - January 2026: Republic Day Special & Advanced Missiles Showcase', year: '2026', size: '2.10 MB', date: '01/01/2026' },
    { id: 7, title: 'DRDO Newsletter - December 2025: Year-End Review & Strategic System Inductions', year: '2025', size: '1.75 MB', date: '01/12/2025' },
    { id: 8, title: 'DRDO Newsletter - November 2025: Cyber Security & Cryptography Advances', year: '2025', size: '1.48 MB', date: '01/11/2025' },
    { id: 9, title: 'DRDO Newsletter - October 2025: Self-Reliance in Armaments & Combat Vehicles', year: '2025', size: '1.62 MB', date: '01/10/2025' },
    { id: 10, title: 'DRDO Newsletter - September 2025: Advanced Naval Systems & Torpedoes', year: '2025', size: '1.55 MB', date: '01/09/2025' },
    { id: 11, title: 'SUCCESSFUL FLIGHT-TESTS OF ASTRABVRAAM WITH INDIGENOUS RF SEEKER FROM SU-30 MK-I', year: '2025', size: '1.81 MB', date: '01/08/2025' },
    { id: 12, title: 'A CELEBRATION OF SCIENTIFIC EXCELLENCE: DRDO OBSERVES NATIONAL TECHNOLOGY DAY 2025 (July 2025)', year: '2025', size: '187.33 KB', date: '01/07/2025' },
    { id: 13, title: 'A CELEBRATION OF SCIENTIFIC EXCELLENCE: DRDO OBSERVES NATIONAL TECHNOLOGY DAY 2025 (June 2025)', year: '2025', size: '1.79 MB', date: '01/06/2025' },
    { id: 14, title: 'LIGHT AS A WEAPON: DRDO’S DEW MARKS INDIA’S DEFENCE MILESTONE', year: '2025', size: '1.95 MB', date: '01/05/2025' },
    { id: 15, title: 'VIGYAN VAIBHAV 2025: SHOWCASING DRDO\'S SCIENTIFIC EXCELLENCE AND INNOVATION', year: '2025', size: '1.99 MB', date: '01/04/2025' }
  ],
  journals: [
    { id: 1, title: 'Defence Science Journal - Vol. 76, No. 3: Special Issue on Hypersonic Aerodynamics', year: '2026', size: '3.42 MB', date: '15/05/2026' },
    { id: 2, title: 'Defence Life Science Journal - Vol. 11, No. 2: Extreme Physiology & Soldier Support', year: '2026', size: '2.80 MB', date: '28/04/2026' },
    { id: 3, title: 'Defence Science Journal - Vol. 76, No. 2: Research Papers on Materials and Metallurgy', year: '2026', size: '3.10 MB', date: '15/03/2026' },
    { id: 4, title: 'Defence Science Journal - Vol. 76, No. 1: Advanced Computing & High-Power Electromagnetics', year: '2026', size: '2.95 MB', date: '15/01/2026' },
    { id: 5, title: 'Defence Life Science Journal - Vol. 11, No. 1: Biodefence and Environmental Toxicology', year: '2026', size: '2.40 MB', date: '10/01/2026' }
  ],
  samachar: [
    { id: 1, title: 'DRDO Samachar - March-April 2026: Bi-Monthly Issue (Hindi)', year: '2026', size: '2.80 MB', date: '30/04/2026' },
    { id: 2, title: 'DRDO Samachar - January-February 2026: Republic Day Achievements (Hindi)', year: '2026', size: '3.15 MB', date: '28/02/2026' },
    { id: 3, title: 'DRDO Samachar - November-December 2025: Annual Highlights (Hindi)', year: '2025', size: '3.40 MB', date: '31/12/2025' }
  ],
  monograph: [
    { id: 1, title: 'Monograph: Flight Simulation and Control of Modern Fighter Aircraft', year: '2026', size: '12.4 MB', date: '10/01/2026' },
    { id: 2, title: 'Monograph: Principles of Sonar Signal Processing and Underwater Acoustics', year: '2025', size: '8.20 MB', date: '15/10/2025' },
    { id: 3, title: 'Monograph: High-Energy Materials: Synthesis, Characterization & Applications', year: '2024', size: '10.5 MB', date: '05/06/2024' }
  ],
  'tech-focus': [
    { id: 1, title: 'Technology Focus - May 2026: Advanced Composite Materials for Stealth Platforms', year: '2026', size: '2.10 MB', date: '12/05/2026' },
    { id: 2, title: 'Technology Focus - March 2026: Electro-Optic Sensors and Laser Range Finders', year: '2026', size: '1.75 MB', date: '10/03/2026' },
    { id: 3, title: 'Technology Focus - January 2026: Soldier Support Systems & Combat Rations', year: '2026', size: '1.50 MB', date: '15/01/2026' }
  ],
  vishesh: [
    { id: 1, title: 'Prodhyogiki Vishesh - May 2026: Cyber Security Concepts (Hindi)', year: '2026', size: '1.80 MB', date: '20/05/2026' },
    { id: 2, title: 'Prodhyogiki Vishesh - January 2026: Missile Guidance Systems (Hindi)', year: '2026', size: '2.20 MB', date: '18/01/2026' }
  ],
  other: [
    { id: 1, title: 'DRDO Year Book 2025: Overviews and Profiles of All Labs', year: '2026', size: '15.2 MB', date: '12/01/2026' },
    { id: 2, title: 'Compendium of Technologies for Transfer of Technology (ToT)', year: '2025', size: '9.80 MB', date: '14/11/2025' }
  ]
};

const FLATTENED_STATIC = [];
Object.entries(publicationsData).forEach(([type, items]) => {
  items.forEach(item => {
    FLATTENED_STATIC.push({
      ...item,
      type
    });
  });
});

const getYear = (item) => {
  if (item.year) return item.year;
  if (item.date) {
    const parts = item.date.split('/');
    if (parts.length === 3) return parts[2];
    const yr = item.date.match(/\b(20\d{2})\b/);
    if (yr) return yr[1];
  }
  if (item.createdAt) return new Date(item.createdAt).getFullYear().toString();
  return '';
};

export default function PublicationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPubs, setAllPubs] = useState(FLATTENED_STATIC);

  useEffect(() => {
    fetch('http://localhost:4000/api/publications')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setAllPubs(data);
        }
      })
      .catch(err => console.error('Error fetching publications:', err));
  }, []);

  const activeCategory = categories.find(c => c.id === selectedCat);

  const currentData = useMemo(() => {
    return allPubs.filter(p => p.type === selectedCat);
  }, [allPubs, selectedCat]);

  const filteredData = useMemo(() => {
    return currentData.filter(item => {
      const matchesSearch = item.title ? item.title.toLowerCase().includes(search.toLowerCase()) : false;
      const yr = getYear(item);
      const matchesYear = yearFilter === 'All' || yr === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [currentData, search, yearFilter]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirstItem = (safePage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleCategorySelect = (catId) => {
    setSelectedCat(catId);
    setSearch('');
    setYearFilter('All');
    setCurrentPage(1);
  };

  const handleBack = () => {
    setSelectedCat(null);
  };

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
            <h1>{t("Publications")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/documents/publications" className="connect-subnav-link active">{t("Publications")}</Link>
          <Link to="/documents/avalanche-warning-bulletin" className="connect-subnav-link">{t("Avalanche Warning Bulletin")}</Link>
          <Link to="/documents/drdo-in-news" className="connect-subnav-link">{t("DRDO in News")}</Link>
          <Link to="/documents/form-and-manual" className="connect-subnav-link">{t("Forms and Manuals")}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="pub-page-bg">
          <div className="pub-container">

            <h2 className="pub-heading">
              <span>
                {activeCategory ? `Publications › ${t(activeCategory.title)}` : 'Publications'}
              </span>
              {activeCategory && (
                <button className="pub-back-category-btn" onClick={handleBack} id="pub-back-btn">
                  {t("‹ Back to Categories")}
                </button>
              )}
            </h2>


            {!selectedCat ? (
              <div className="pub-grid">
                {categories.map((cat) => (
                  <div key={cat.id} className="pub-card" id={`cat-card-${cat.id}`}>
                    <img
                      src={drdoLogo}
                      alt="DRDO Logo"
                      className="pub-logo"
                    />
                    <div className="pub-content">
                      <h3>{t(cat.title)}</h3>
                      <p>{t(cat.description)}</p>
                    </div>
                    <button
                      className="pub-view-btn"
                      onClick={() => handleCategorySelect(cat.id)}
                      id={`explore-btn-${cat.id}`}
                    >
                      VIEW ›
                    </button>
                  </div>
                ))}
              </div>
            ) : (

              <>

                <div className="pub-filters-row">

                  <div className="pub-search-group">
                    <svg className="pub-search-icon" xmlns="http://www.w3.org/2000/svg"
                      width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      id="pub-search"
                      className="pub-search-input"
                      placeholder="Search title..."
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                  </div>

                  <div className="pub-filters-right">

                    <div className="pub-select-wrap">
                      <svg className="pub-select-icon" xmlns="http://www.w3.org/2000/svg"
                        width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <select
                        id="pub-year"
                        className="pub-select"
                        value={yearFilter}
                        onChange={(e) => { setYearFilter(e.target.value); setCurrentPage(1); }}
                      >
                        <option value="All">{t("All Years")}</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>


                    <div className="pub-select-wrap">
                      <svg className="pub-select-icon" xmlns="http://www.w3.org/2000/svg"
                        width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                      <select
                        id="pub-limit"
                        className="pub-select"
                        value={itemsPerPage}
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      >
                        <option value="5">{t("5 per page")}</option>
                        <option value="10">{t("10 per page")}</option>
                        <option value="20">{t("20 per page")}</option>
                      </select>
                    </div>
                  </div>
                </div>


                <div className="pub-table-container">
                  <table className="pub-table">
                    <thead>
                      <tr>
                        <th className="sno-col">{t("S.No")}</th>
                        <th>{t("Title")}</th>
                        <th className="date-col">{t("Published Date")}</th>
                        <th className="size-col">{t("Type/Size")}</th>
                        <th className="action-col">{t("Link to Content")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item, idx) => {
                          const targetLink = item.fileUrl
                            ? (item.fileUrl.startsWith('http') ? item.fileUrl : `http://localhost:4000${item.fileUrl}`)
                            : (item.link || `https://drdo.gov.in/drdo/sites/default/files/publications/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`);
                          const formattedDate = item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : '');
                          return (
                            <tr key={item._id || item.id}>
                              <td className="sno-col">{indexOfFirstItem + idx + 1}</td>
                              <td style={{ fontWeight: '600', color: '#045857' }}>{t(item.title)}</td>
                              <td className="date-col">{t(formattedDate)}</td>
                              <td>
                                PDF
                                <span className="file-info-text">({item.size})</span>
                              </td>
                              <td className="action-col">
                                <a
                                  href={targetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="pub-table-view-btn"
                                  id={`view-pdf-${item._id || item.id}`}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  View
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="pub-no-results">{t("No publications found matching your search.")}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>


                {totalPages > 1 && (
                  <div className="pub-pagination">
                    <div className="pub-pagination-info">
                      Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfFirstItem + itemsPerPage, totalItems)} of {totalItems} entries
                    </div>
                    <div className="pub-pagination-btns">
                      <button
                        className={`pub-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(1)}
                        disabled={safePage === 1}
                      >
                        «
                      </button>
                      <button
                        className={`pub-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                      >
                        ‹
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          className={`pub-page-btn ${safePage === p ? 'active' : ''}`}
                          onClick={() => setCurrentPage(p)}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        className={`pub-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                      >
                        ›
                      </button>
                      <button
                        className={`pub-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={safePage === totalPages}
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}


            <div className="pub-update-row">
              {t("Last Updated : 01 Jun 2026")}
            </div>


            <div className="connect-back-row">
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
