import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './ConnectPage.css';

function FAQItem({ faq }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="contact-accordion-item">
      <button
        className={`contact-accordion-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="contact-accordion-trigger-label">
          {faq.id}) {t(faq.question)}
        </span>

        <span className="contact-accordion-arrow">
          {open ? '−' : '⌄'}
        </span>
      </button>

      {open && (
        <div className="contact-accordion-body">
          {typeof faq.answer === 'string' ? (
            <p>{t(faq.answer)}</p>
          ) : (
            faq.answer
          )}
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const faqs = [
    {
      id: 1,
      question: 'What is the full form of DRDO?',
      answer: 'Defence Research and Development Organisation.',
    },
    {
      id: 2,
      question: 'When was DRDO formed?',
      answer:
        'DRDO was formed in 1958 from the amalgamation of the Technical Development Establishment (TDEs), Directorate of Technical Development & Production (DTDP) and Defence Science Organisation (DSO).',
    },
    {
      id: 3,
      question: 'How can I join DRDO?',
      answer: (
        <>
          <p>{t("There are two primary modes of joining DRDO:")}</p>

          <ul>
            <li>
              <strong>{t("RAC:")}</strong> {t("Recruitment to Scientific cadre.")}
            </li>

            <li>
              <strong>{t("CEPTAM:")}</strong> {t("Recruitment to Technical cadre posts.")}
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 4,
      question:
        'What are the pay scales of scientists/technical cadre staff at various levels?',
      answer:
        'For updated pay scales please visit the RAC website.',
    },
    {
      id: 5,
      question:
        'How can I apply for JRF/SRF/RA/Apprentice Schemes in DRDO?',
      answer:
        'Individual DRDO laboratories publish openings for JRF/SRF/RA/Apprentices from time to time.',
    },
    {
      id: 6,
      question:
        'What are various modes of induction of scientists into DRDO system?',
      answer: (
        <ul>
          <li>{t("Direct Recruitment")}</li>
          <li>{t("Lateral Recruitment")}</li>
          <li>{t("Talent Search Scheme")}</li>
          <li>{t("Deputation & Absorption")}</li>
        </ul>
      ),
    },
    {
      id: 7,
      question:
        'Can I join DRDO at a higher post with significant experience?',
      answer:
        'Yes. Experienced candidates can join through lateral recruitment at higher grades.',
    },
    {
      id: 8,
      question:
        'Whom should I contact for recruitment-related queries?',
      answer:
        'Recruitment related queries may be addressed through RAC.',
    },
    {
      id: 9,
      question:
        'Where are DRDO laboratories situated?',
      answer:
        'DRDO laboratories are located across India including Delhi, Hyderabad, Bengaluru, Pune, Chennai, Kochi and other cities.',
    },
    {
      id: 10,
      question:
        'What is the procedure for summer training in DRDO laboratories?',
      answer:
        'Students should directly apply to the Director of the concerned DRDO laboratory.',
    },
  ];

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

            <div className="contact-accordion-list">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                />
              ))}
            </div>

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