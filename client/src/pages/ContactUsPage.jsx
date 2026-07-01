import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './ConnectPage.css';

function AccordionItem({ item }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-accordion-item">
      <button
        className={`contact-accordion-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="contact-accordion-trigger-label">
          {t(item.label)}
        </span>

        <span className="contact-accordion-arrow">
          {open ? '−' : '⌄'}
        </span>
      </button>

      {open && (
        <div className="contact-accordion-body">
          <div className="contact-info-name">
            {t(item.org)}
          </div>

          {item.phone && (
            <div className="contact-info-row">
              <span className="label">{t("Phone:")}</span>
              <span className="value">{t(item.phone)}</span>
            </div>
          )}

          {item.email && (
            <div className="contact-info-row">
              <span className="label">{t("Email:")}</span>
              <span className="value">
                <a href={`mailto:${item.email}`}>
                  {item.email}
                </a>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContactUsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/contacts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setContacts(sorted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching contacts:', err);
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
            <h1>{t("Contact Us")}</h1>
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
                {t("Loading contacts...")}
              </div>
            ) : (
              <div className="contact-accordion-list">
                {contacts.map((item) => (
                  <AccordionItem
                    key={item._id}
                    item={item}
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