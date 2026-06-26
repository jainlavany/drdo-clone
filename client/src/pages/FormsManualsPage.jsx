import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './FormsManualsPage.css';

const initialDocs = [
  { id: 1, docNo: '—', title: 'Project Closure Form', type: 'Forms', category: 'DIA-CoEs', size: '180.45 KB', file: 'project_closure_form.pdf' },
  { id: 2, docNo: 'Form 1*', title: 'Summary of Proposal Basic Information - Form 1', type: 'Forms', category: 'DIA-CoEs', size: '240.12 KB', file: 'summary_proposal_basic_info_form1.pdf' },
  { id: 3, docNo: '—', title: 'Guidelines for DIA-CoE Research Proposals', type: 'Manuals', category: 'DIA-CoEs', size: '1.20 MB', file: 'dia_coe_proposal_guidelines.pdf' },
  { id: 4, docNo: 'ER-03', title: 'Research Grant Application Form', type: 'Forms', category: 'ER&IPR', size: '350.55 KB', file: 'er_research_grant_app.pdf' },
  { id: 5, docNo: '—', title: 'Procurement Manual 2025', type: 'Manuals', category: 'Procurement', size: '4.80 MB', file: 'procurement_manual_2025.pdf' },
  { id: 6, docNo: 'Form 5', title: 'Utilization Certificate Form', type: 'Forms', category: 'ER&IPR', size: '120.30 KB', file: 'utilization_certificate_form5.pdf' },
  { id: 7, docNo: 'Form 2', title: 'Detailed Proposal Submission Format - Form 2', type: 'Forms', category: 'DIA-CoEs', size: '290.40 KB', file: 'proposal_format_form2.pdf' },
  { id: 8, docNo: 'PM-02', title: 'Vendor Registration Form', type: 'Forms', category: 'Procurement', size: '185.00 KB', file: 'vendor_reg_form.pdf' },
  { id: 9, docNo: '—', title: 'Financial Powers of DRDO Directors (DFPR-2024)', type: 'Manuals', category: 'Admin', size: '2.50 MB', file: 'delegation_financial_powers.pdf' },
  { id: 10, docNo: 'Form 4', title: 'Quarterly Progress Report Format', type: 'Forms', category: 'ER&IPR', size: '145.22 KB', file: 'quarterly_progress_report_form4.pdf' },
  { id: 11, docNo: 'Form 5F', title: 'Prototype or Hardware Engineering Model Construction Cost - Form 5F', type: 'Forms', category: 'DIA-CoEs', size: '150.32 KB', file: 'form_5f.pdf' },
  { id: 12, docNo: 'Form 5G', title: 'Lab Infrastructure Upgrade - Form 5G', type: 'Forms', category: 'DIA-CoEs', size: '210.15 KB', file: 'form_5g.pdf' },
  { id: 13, docNo: 'Form 5H', title: 'Details of Procured Services - Form 5H', type: 'Forms', category: 'DIA-CoEs', size: '180.20 KB', file: 'form_5h.pdf' },
  { id: 14, docNo: 'Form 5i', title: 'Workshop/ Conference - Form 5i', type: 'Forms', category: 'DIA-CoEs', size: '125.40 KB', file: 'form_5i.pdf' },
  { id: 15, docNo: 'Form 5J', title: 'Cost Estimation for Research Staff - Form 5J', type: 'Forms', category: 'DIA-CoEs', size: '145.00 KB', file: 'form_5j.pdf' }
];

export default function FormsManualsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const filteredDocs = useMemo(() => {
    return initialDocs.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.docNo.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [search, typeFilter, categoryFilter]);


  const totalItems = filteredDocs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const indexOfFirstItem = (safePage - 1) * itemsPerPage;
  const paginatedDocs = filteredDocs.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

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
            <h1>{t("Forms and Manuals")}</h1>
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
          <Link to="/documents/form-and-manual" className="connect-subnav-link active">{t("Forms and Manuals")}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link">{t("Press Release")}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t("Acts and Policies")}</Link>
          <Link to="/resources/onos" className="connect-subnav-link">{t("ONOS")}</Link>
        </div>


        <div className="fm-toolbar-border">
          <div className="fm-toolbar">

            <div className="fm-search-wrap">
              <svg
                className="fm-search-icon"
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
                className="fm-search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                id="form-search"
              />
            </div>


            <div className="fm-toolbar-right">

              <div className="fm-select-wrap">
                <svg
                  className="fm-select-icon"
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
                  className="fm-select"
                  value={typeFilter}
                  onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                  id="form-type"
                >
                  <option value="All">{t("Type")}</option>
                  <option value="Forms">{t("Forms")}</option>
                  <option value="Manuals">{t("Manuals")}</option>
                </select>
              </div>


              <div className="fm-select-wrap">
                <svg
                  className="fm-select-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#555" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <select
                  className="fm-select"
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                  id="form-category"
                >
                  <option value="All">{t("Category")}</option>
                  <option value="DIA-CoEs">{t("DIA-CoEs")}</option>
                  <option value="ER&IPR">{t("ER & IPR")}</option>
                  <option value="Procurement">{t("Procurement")}</option>
                  <option value="Admin">{t("Admin")}</option>
                </select>
              </div>


              <div className="fm-select-wrap">
                <svg
                  className="fm-select-icon"
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
                  className="fm-select"
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  id="form-limit"
                >
                  <option value={5}>{t("5 per page")}</option>
                  <option value={10}>{t("10 per page")}</option>
                  <option value={20}>{t("20 per page")}</option>
                </select>
              </div>
            </div>
          </div>
        </div>


        <div className="fm-layout">

          <div className="fm-table-wrapper">
            <table className="fm-table">
              <thead>
                <tr>
                  <th className="fm-col-sno">{t("S.NO")}</th>
                  <th className="fm-col-docno">{t("DOC NO")}</th>
                  <th className="fm-col-title">TITLE</th>
                  <th className="fm-col-type">TYPE</th>
                  <th className="fm-col-category">CATEGORY</th>
                  <th className="fm-col-view">{t("LINK TO CONTENT")}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDocs.length > 0 ? (
                  paginatedDocs.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td className="fm-docno-cell">{item.docNo}</td>
                      <td className="fm-table-title">{t(item.title)}</td>
                      <td>{t(item.type)}</td>
                      <td>{t(item.category)}</td>
                      <td>
                        <div className="fm-view-btn-wrap">
                          <a
                            href={`https://drdo.gov.in/drdo/sites/default/files/forms_manuals/${item.file}`}
                            target="_blank"
                            rel="noreferrer"
                            className="fm-view-btn"
                            id={`view-form-${item.id}`}
                          >
                            {t("👁 View")}
                          </a>
                          <span className="fm-file-info">PDF ({item.size})</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="fm-no-results">{t("No records found matching your filters.")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {totalPages > 1 && (
            <div className="fm-pagination">
              <div className="fm-pagination-info">
                Showing {filteredDocs.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfFirstItem + itemsPerPage, totalItems)} of {totalItems} entries
              </div>
              <div className="fm-pagination-btns">
                <button
                  className={`fm-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={safePage === 1}
                >
                  «
                </button>
                <button
                  className={`fm-page-btn ${safePage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`fm-page-btn ${safePage === p ? 'active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className={`fm-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                >
                  ›
                </button>
                <button
                  className={`fm-page-btn ${safePage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={safePage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}


          <div className="fm-bottom-row">
            <div className="fm-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              Last Updated: 05 Jun 2026
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
