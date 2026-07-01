import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './ConnectPage.css';

function FAQItem({ faq, index }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-accordion-item">
      <button
        className={`contact-accordion-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="contact-accordion-trigger-label">
          {index + 1}) {t(faq.question)}
        </span>

        <span className="contact-accordion-arrow">
          {open ? '−' : '⌄'}
        </span>
      </button>

      {open && (
        <div className="contact-accordion-body">
          <p>{t(faq.answer)}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/faqs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out inactive FAQs if active flag is present
          const activeFaqs = data.filter(faq => faq.active !== false);
          const sorted = activeFaqs.sort((a, b) => (a.order || 0) - (b.order || 0));
          setFaqs(sorted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching FAQs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link
                to="/"
                className="hero-link"
              >
                {t("Home")}
              </Link>
              <span> / </span>
              <Link
                to="/connect/contact-us"
                className="hero-link"
              >
                {t("Connect")}
              </Link>
              <span> / </span>
            </div>
            <h1>{t("FAQ")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <NavLink
            to="/connect/contact-us"
            className={({ isActive }) =>
              isActive
                ? 'connect-subnav-link active'
                : 'connect-subnav-link'
            }
          >
            {t("Contact Us")}
          </NavLink>

          <NavLink
            to="/connect/rti"
            className={({ isActive }) =>
              isActive
                ? 'connect-subnav-link active'
                : 'connect-subnav-link'
            }
          >
            {t("RTI")}
          </NavLink>

          <NavLink
            to="/connect/faqs"
            className={({ isActive }) =>
              isActive
                ? 'connect-subnav-link active'
                : 'connect-subnav-link'
            }
          >
            {t("FAQs")}
          </NavLink>
        </div>

        <div className="connect-layout">
          <main className="connect-main-content">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {t("Loading FAQs...")}
              </div>
            ) : (
              <div className="contact-accordion-list">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={faq._id || idx}
                    faq={faq}
                    index={idx}
                  />
                ))}
              </div>
            )}

            <div className="connect-bottom-actions">
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