import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import AISummarizer from '../components/AISummarizer';
import './ActsPoliciesPage.css';

const initialPolicies = [
  { id: 1, title: 'DRDO Policy for Transfer of Technology 2025', date: '13/01/2026', timestamp: 1768262400, type: 'Transfer of Technology', size: '3.40 MB', file: 'drdo_tot_policy_2025.pdf' },
  { id: 2, title: 'DRDO Policy for Use of Patents by Indian Industry', date: '13/01/2026', timestamp: 1768262400, type: 'Patents', size: '211.68 KB', file: 'drdo_patents_use_policy.pdf' },
  { id: 3, title: 'Guidelines for Transfer of Technology (ToT) to Industry Partners', date: '12/12/2025', timestamp: 1765497600, type: 'Guidelines', size: '1.25 MB', file: 'tot_guidelines_industry.pdf' },
  { id: 4, title: 'DRDO Patent Application Guidelines for Academia', date: '05/11/2025', timestamp: 1762387200, type: 'Patents', size: '890.50 KB', file: 'patent_academia_guidelines.pdf' },
  { id: 5, title: 'Policy on Intellectual Property Rights (IPR) 2024', date: '24/09/2024', timestamp: 1727136000, type: 'Policies', size: '2.10 MB', file: 'ipr_policy_2024.pdf' },
  { id: 6, title: 'Public Procurement (Preference to Make in India) Order - DRDO Guidelines', date: '10/05/2024', timestamp: 1715299200, type: 'Guidelines', size: '1.80 MB', file: 'public_procurement_make_in_india.pdf' },
  { id: 7, title: 'DRDO IPR Policy for Research Organizations', date: '20/03/2024', timestamp: 1710892800, type: 'Patents', size: '1.45 MB', file: 'drdo_research_ipr.pdf' },
  { id: 8, title: 'Guidelines for Collaborative Defence Research (CDR) with Indian Academia', date: '10/02/2024', timestamp: 1707523200, type: 'Guidelines', size: '2.30 MB', file: 'collaborative_research_academia.pdf' },
  { id: 9, title: 'DRDO Technology Acquisition and Development Fund (TADF) Guidelines', date: '15/12/2023', timestamp: 1702598400, type: 'Guidelines', size: '3.12 MB', file: 'tadf_guidelines.pdf' },
  { id: 10, title: 'DRDO Policy for Funding Academic Research (DIA-CoE Scheme)', date: '08/11/2023', timestamp: 1699401600, type: 'Policies', size: '2.75 MB', file: 'dia_coe_funding_policy.pdf' },
  { id: 11, title: 'Policy on Commercialization of DRDO Technologies by Industry Partners', date: '12/09/2023', timestamp: 1694476800, type: 'Transfer of Technology', size: '1.85 MB', file: 'tot_commercialization_policy.pdf' },
  { id: 12, title: 'Guidelines for Security Classification and Clearence in DRDO Research', date: '04/07/2023', timestamp: 1688428800, type: 'Guidelines', size: '940.10 KB', file: 'security_clearance_guidelines.pdf' }
];

export default function ActsPoliciesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');


  const filteredPolicies = useMemo(() => {
    return initialPolicies.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);


  const sortedPolicies = useMemo(() => {
    return [...filteredPolicies].sort((a, b) => {
      if (sortOrder === 'latest') {
        return b.timestamp - a.timestamp;
      } else {
        return a.timestamp - b.timestamp;
      }
    });
  }, [filteredPolicies, sortOrder]);


  const displayedPolicies = useMemo(() => {
    return sortedPolicies.slice(0, 9);
  }, [sortedPolicies]);

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
            <h1>{t("Acts and Policies")}</h1>
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
          <Link to="/documents/press-release" className="connect-subnav-link">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link active">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="ap-toolbar-border">
          <div className="ap-toolbar">

            <div className="ap-search-wrap">
              <svg
                className="ap-search-icon"
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
                className="ap-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="policy-search"
              />
            </div>


            <div className="ap-toolbar-right">

              <div className="ap-select-wrap">
                <svg
                  className="ap-select-icon"
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
                  className="ap-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  id="policy-type"
                >
                  <option value="All">{t("Type")}</option>
                  <option value="Transfer of Technology">{t("Transfer of Technology")}</option>
                  <option value="Patents">{t("Patents")}</option>
                  <option value="Guidelines">{t("Guidelines")}</option>
                  <option value="Policies">{t("Policies")}</option>
                </select>
              </div>


              <div className="ap-select-wrap">
                <svg
                  className="ap-select-icon"
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
                  className="ap-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  id="policy-sort"
                >
                  <option value="latest">{t("Latest first")}</option>
                  <option value="oldest">{t("Oldest first")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="ap-layout">

          <div className="ap-table-wrapper">
            <table className="ap-table">
              <thead>
                <tr>
                  <th className="ap-col-sno">{t("S.NO")}</th>
                  <th className="ap-col-title">TITLE</th>
                  <th className="ap-col-date">{t("PUBLISHED DATE")}</th>
                  <th className="ap-col-size">{t("TYPE/SIZE")}</th>
                  <th className="ap-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {displayedPolicies.length > 0 ? (
                  displayedPolicies.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="ap-table-title">{t(item.title)}</td>
                      <td className="ap-date-cell">{t(item.date)}</td>
                      <td>
                        PDF
                        <span className="ap-file-info">({item.size})</span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="ais-table-cell-actions">
                          <a
                            href={`https://drdo.gov.in/drdo/sites/default/files/acts_policies/${item.file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="ap-view-btn"
                            id={`view-policy-${item.id}`}
                          >
                            {t("👁 View")}
                          </a>
                          <AISummarizer
                            item={item}
                            itemId={item.id || `ap-${index}`}
                            docLink={`https://drdo.gov.in/drdo/sites/default/files/acts_policies/${item.file}`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="ap-no-results">{t("No records found matching your filters.")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          <div className="ap-archive-row">
            <a
              href="https://drdo.gov.in/drdo/en/documents/acts-and-policies/archive"
              target="_blank"
              rel="noreferrer"
              className="ap-archive-btn"
              id="view-archive-btn"
            >
              <span className="ap-archive-icon">📁</span>
              View Archive
            </a>
          </div>


          <div className="ap-bottom-row">
            <div className="ap-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 13 Jan 2026
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
