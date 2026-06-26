import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './ConnectPage.css';

const contactItems = [
  {
    id: 'diiqm',
    label:
      '1. DIIQM : For Queries Pertaining - Transfer of Technology (ToT), Product for Industry, Products for Export, Industry Interaction Group, Test facilities and Industry Support',
    org: 'Directorate of Industry Interface & Quality Management (DIIQM)',
    phone: '011 - 23013209, 23015291',
    email: 'director-diiqm-hqr@gov.in',
  },
  {
    id: 'dftm',
    label:
      '2. DFTM : For Queries Pertaining - Advanced Technology Centres',
    org: 'Directorate of Futuristic Technology Management (DFTM)',
    phone: '011 - 23007794',
  },
  {
    id: 'eripr',
    label:
      '3. ER&IPR : For Queries Pertaining - Academia',
    org: 'Directorate of Extramural Research & Intellectual Property Rights',
    phone: '011 - 23017661',
    email: 'erip_er.hqr@gov.in',
  },
  {
    id: 'tdf',
    label:
      '4. TDF : For Queries Pertaining - Technology Development Fund',
    org: 'Technology Development Fund',
    phone: '011 - 23007325',
  },
  {
    id: 'rti',
    label:
      '5. RTI Cell : For Queries Pertaining - Right to Information Act',
    org: 'RTI Cell, DRDO HQ',
    phone: '011 - 23015433',
  },
  {
    id: 'ceptam',
    label:
      '6. CEPTAM : For Queries Pertaining - Recruitment & Assessment of Technical Cadre',
    org: 'Centre for Personnel Talent Management',
    phone: '011 - 23882323',
  },
  {
    id: 'rac',
    label:
      '7. RAC : For Queries Pertaining - Recruitment & Assessment of Scientific Cadre',
    org: 'Recruitment and Assessment Centre',
    phone: '011 - 23817833',
    email: 'director.rac@gov.in',
  },
  {
    id: 'dpi',
    label:
      '8. DPI : For Queries Pertaining - Public Relations & Social Media',
    org: 'Directorate of Public Interface',
    phone: '011 - 23011073',
    email: 'dpidrdo.hqr@gov.in',
  },
  {
    id: 'desidoc',
    label:
      '9. DESIDOC : For Queries Pertaining - DRDO Website',
    org: 'Defence Scientific Information & Documentation Centre',
    phone: '011 - 23812252',
    email: 'director.desidoc@gov.in',
  },
  {
    id: 'dttc',
    label:
      '10. DTTC : For Queries Pertaining - Testing, Consultation & Incubation',
    org: 'Defence Technology & Test Centre',
    phone: '0522-2317619',
    email: 'dttc-drdo@gov.in',
  },
  {
    id: 'drdo-hq',
    label:
      '11. DRDO HQ : Headquarters Contact Information',
    org: 'Defence Research and Development Organisation',
  },
];

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

            <div className="contact-accordion-list">
              {contactItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
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