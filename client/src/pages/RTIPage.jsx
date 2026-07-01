import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import './RTIcss.css';

export default function RTIPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = window.SERVER_BASE_URL || 'http://localhost:4000';
    Promise.all([
      fetch(`${base}/api/rti-stats`).then(res => res.json()),
      fetch(`${base}/api/rti-documents`).then(res => res.json())
    ])
      .then(([statsData, docsData]) => {
        if (Array.isArray(statsData)) {
          setStats(statsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
        if (Array.isArray(docsData)) {
          setDocs(docsData.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching RTI data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t('Home')}</Link>
              <span> / </span>
              <Link to="/connect/contact-us" className="hero-link">{t('Connect')}</Link>
              <span> / </span>
            </div>
            <h1>{t('RTI')}</h1>
          </div>

          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/connect/contact-us" className="connect-subnav-link">
            {t('Contact Us')}
          </Link>
          <Link to="/connect/rti" className="connect-subnav-link active">
            {t('RTI')}
          </Link>
          <Link to="/connect/faqs" className="connect-subnav-link">
            {t('FAQs')}
          </Link>
        </div>

        <div className="connect-layout">
          <main className="connect-main-content">
            <div className="rti-disclaimer-box">
              <h2 className="rti-disclaimer-title">
                {t('RTI Status – DRDO')}
              </h2>
              <p>
                DRDO is placed in the <strong>{t("Second Schedule")}</strong> of the
                RTI Act, 2005 and is exempted from disclosure of information
                under Section 24(1), except for information pertaining to
                allegations of corruption and human rights violations.
              </p>
              <p>
                DRDO does not accept RTI applications or appeals through email
                or any electronic media.
                <strong> {t("A hard copy submission is mandatory.")}</strong>
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {t("Loading RTI information...")}
              </div>
            ) : (
              <>
                {stats.length > 0 && (
                  <section className="rti-section">
                    <h2 className="rti-section-title">
                      {t('RTI Statistics for 2025–2026')}
                    </h2>

                    <div className="rti-stats-grid">
                      {stats.map((stat) => (
                        <div key={stat._id} className="rti-stat-card">
                          <h3 className="rti-stat-label">
                            {t(stat.title)}
                          </h3>
                          <div className="rti-stat-row">
                            <span>{t(stat.label1)}</span>
                            <span className="stat-num">{stat.value1}</span>
                          </div>
                          <div className="rti-stat-row">
                            <span>{t(stat.label2)}</span>
                            <span className="stat-num">{stat.value2}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="rti-section">
                  <h2 className="rti-section-title">
                    {t('Third Party Audit (TPA)')}
                  </h2>
                  <div className="rti-tpa-box">
                    <h3 className="rti-tpa-title">
                      {t('Third Party Audit – 2024–2025')}
                    </h3>
                    <p>
                      Third Party Audit for the year 2024–2025 was
                      conducted by <strong>{t("DIAT, Pune")}</strong> in
                      June 2025. Total marks obtained:
                      <strong> {t("97%")}</strong>.
                    </p>
                  </div>
                </section>

                {docs.length > 0 && (
                  <section className="rti-section">
                    <h2 className="rti-section-title">
                      {t('RTI Documents')}
                    </h2>

                    <table className="rti-documents-table">
                      <thead>
                        <tr>
                          <th>{t('S.No')}</th>
                          <th>{t('Document Title')}</th>
                          <th>{t('Description')}</th>
                          <th>{t('View')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs.map((doc, index) => (
                          <tr key={doc._id}>
                            <td>{index + 1}</td>
                            <td>{t(doc.title)}</td>
                            <td>{t(doc.description)}</td>
                            <td>
                              <a
                                href={doc.fileUrl || doc.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rti-doc-link"
                              >
                                {t('View')}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}
              </>
            )}

            <div className="connect-bottom-actions">
              <button onClick={() => navigate(-1)} className="connect-back-btn" id="rti-back-btn">
                ← {t('BACK TO PREVIOUS PAGE')}
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}