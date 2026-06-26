import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import './RTIcss.css';

const rtiStats = [
  {
    title: 'RTI Applications',
    rows: [
      { label: 'Received', value: '579' },
      { label: 'Disposed', value: '565' },
    ],
  },
  {
    title: 'RTI First Appeals',
    rows: [
      { label: 'Received', value: '54' },
      { label: 'Orders Issued', value: '54' },
    ],
  },
  {
    title: 'RTI Second Appeals',
    rows: [
      { label: 'Received', value: '66' },
      { label: 'Disposed', value: '66' },
    ],
  },
  {
    title: 'Parliament Questions',
    rows: [
      { label: 'Questions Asked', value: '242' },
      { label: 'Replies Given', value: '206' },
    ],
  },
];

const rtiDocuments = [
  {
    id: 1,
    title: 'Public Authorities under DRDO',
    description: 'List of Public Information Officers & Appellate Authorities at DRDO HQs',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Public_Authorities_under_DRDO_12_06_2026.pdf"
  },
  {
    id: 2,
    title: 'RTI Officials at DRDO HQ',
    description: 'List of PIOs & First Appellate Authorities at DRDO HQs',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/RTI_Officials_at_DRDO_HQ_12_06_2026.pdf"
  },
  {
    id: 3,
    title: 'RTI Act 2005 (English & Hindi)',
    description: 'Right to Information Act, 2005',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/RTI_Act_2005_12_06_2026.pdf"
  },
  {
    id: 4,
    title: 'How to Submit RTI Form & Fee',
    description: 'Guidelines for RTI submission and fee payment',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/How_to_Submit_RTI_Form_Fee_12_06_2026.pdf"
  },
  {
    id: 5,
    title: 'Exemption under RTI Act 2005',
    description: 'RTI exemptions applicable to DRDO',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Exemption_under_RTI_Act_2005_12_06_2026.pdf"
  },
  {
    id: 6,
    title: 'Guidelines for Information Seekers',
    description: 'Information seeker guidelines',
    link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Guidelines_for_Information_Seeders_12_06_2026.pdf"
  },
];

export default function RTIPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

            <section className="rti-section">
              <h2 className="rti-section-title">
                {t('RTI Statistics for 2025–2026')}
              </h2>

              <div className="rti-stats-grid">
                {rtiStats.map((stat, index) => (
                  <div key={index} className="rti-stat-card">
                    <h3 className="rti-stat-label">
                      {t(stat.title)}
                    </h3>

                    {stat.rows.map((row, i) => (
                      <div key={i} className="rti-stat-row">
                        <span>{t(row.label)}</span>
                        <span className="stat-num">{row.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

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
                  {rtiDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.id}</td>
                      <td>{t(doc.title)}</td>
                      <td>{t(doc.description)}</td>
                      <td>
                        <a
                          href={doc.link}
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