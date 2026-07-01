import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import './ONOSPage.css';

const publishers = [
  { name: 'AAAS-Science', url: 'https://www.science.org/journal/science' },
  { name: 'ACM Digital Library', url: 'http://dl.acm.org/' },
  { name: 'American Chemical Society Journals', url: 'http://pubs.acs.org/' },
  { name: 'American Institute of Aeronautics and Astronautics (AIAA) Journals', url: 'https://aiaa.org/publications/journals/' },
  { name: 'American Institute of Physics Journals', url: 'https://pubs.aip.org/' },
  { name: 'American Mathematical Society Journals', url: 'http://www.ams.org/journals' },
  { name: 'American Physical Society – ALL', url: 'http://publish.aps.org/browse.html' },
  { name: 'American Society for Microbiology Journals', url: 'https://journals.asm.org/' },
  { name: 'Annual Reviews Journals', url: 'http://arjournals.annualreviews.org' },
  { name: 'ASCE Library Journals', url: 'http://ascelibrary.org/' },
  { name: 'ASME Journals Online', url: 'http://asmedigitalcollection.asme.org/' },
  { name: 'Bentham Science Journals', url: 'http://benthamscience.com/' },
  { name: 'BMJ Journals', url: 'https://journals.bmj.com/home' },
  { name: 'Cambridge University Press Journals', url: 'https://www.cambridge.org/core' },
  { name: 'Cold Spring Harbor Laboratory Press Journals', url: 'https://www.cshlpress.com/' },
  { name: 'Elsevier ScienceDirect Journals', url: 'http://www.sciencedirect.com/' },
  { name: 'Emerald Publishing Journals', url: 'https://www.emerald.com/insight/' },
  { name: 'ICE Publishing Journals', url: 'http://www.icevirtuallibrary.com' },
  { name: 'IEEE Journals', url: 'http://ieeexplore.ieee.org/' },
  { name: 'IndianJournals.com', url: 'http://indianjournals.com/' },
  { name: 'Institute of Physics Journals', url: 'http://iopscience.iop.org/journals' },
  { name: 'Lippincott Williams & Wilkins (Wolters Kluwer) Journals', url: 'https://oce.ovid.com/' },
  { name: 'Oxford University Press Journals', url: 'https://academic.oup.com/journals/' },
  { name: 'Project Muse', url: 'http://muse.jhu.edu/' },
  { name: 'Sage Publishing Journals', url: 'http://journals.sagepub.com/' },
  { name: 'SPIE Digital Library', url: 'https://www.spiedigitallibrary.org/' },
  { name: 'Springer Nature Journals', url: 'https://link.springer.com/' },
  { name: 'Taylor and Francis Journals', url: 'https://www.tandfonline.com/' },
  { name: 'Thieme Journals', url: 'https://www.thieme-connect.com/products/all/home.html' },
  { name: 'Wiley Journals', url: 'https://onlinelibrary.wiley.com/' },
  { name: 'Janes', url: 'https://customer.janes.com' },
  { name: 'Shaastra Enterprise Digital magazine', url: 'https://shaastramag.iitm.ac.in/' },
  { name: 'Indian Open Access Society Journals – CSIR-NIScPR', url: 'https://nopr.niscpr.res.in' },
  { name: 'World Scientific Publishing Journals', url: 'https://www.worldscientific.com/page/wsjournals' },
  { name: 'Royal Society of Chemistry (RSC) Journals', url: 'https://pubs.rsc.org/en/journals?key=title&value=current' },
  { name: 'DRDO Research Journals', url: 'https://publicationsdrdo.in/' },
  { name: 'Aakashganga Open', url: 'http://www.aakashgangaopen.in/' }
];

const TABS = [
  'Home',
  'ONOS Journals',
  'ONOS Remote Access Portal',
  'List of Publishers',
  'SOP for Fair Use',
  'Contact Us'
];

export default function ONOSPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [pubList, setPubList] = useState(publishers);
  const [onosContacts, setOnosContacts] = useState([
    { name: 'Sh. Sudhanshu Bhusan', designation: 'Scientist F & Group Head', phone: '2390 2411' },
    { name: 'Mr Rajesh Kumar Singh', designation: 'Scientist F & Division Head', phone: '2390 2512' },
    { name: 'E-Journal Team', designation: '—', phone: '2390 2511' }
  ]);
  const [settings, setSettings] = useState({
    homeDesc: "DESIDOC (Defence Scientific Information & Documentation Centre) is the nodal agency for DRDO E-Resources Consortium, responsible for subscribing, administering and monitoring access to e-journals, e-magazines, and other digital resources on behalf of DRDO Laboratories. DRDO E-Resources Consortium provides a centralized platform for sharing subscribed electronic resources among DRDO libraries. The consortium enables efficient utilization of information resources by facilitating access to scholarly content for DRDO scientists, researchers, and technical personnel working towards common missions and objectives of DRDO.",
    homeAccessHeader: "Access of ONOS E-Journals:",
    homePhaseText: "Under the Pradhan Mantri – One Nation One Subscription (PM-ONOS) Phase-I initiative, DRDO Laboratories have access to 13,000+ e-journals from 32 leading international publishers.",
    homeOnCampusLabel: "On-Campus Access (IP-based): DRDO users can access these subscribed journals within DRDO lab/estt premises through the authorized DRDO network through the PM-ONOS portal:",
    homeOnCampusLink: "https://www.onos.gov.in/",
    homeOffCampusLabel: "Off-Campus/Remote Access (Authentication-based): To facilitate access beyond DRDO Laboratory premises, a Shibboleth-based Remote Access Service has been enabled for DRDO users. Through this service, authorized users can access the portals remotely at:",
    homeOffCampusLink: "https://ejlsonos.in/",
    journalsDesc: "Access all ONOS (One Nation One Subscription) journals available to DRDO scientists and researchers through the official ONOS portal. The portal provides seamless access to a wide range of international journals subscribed under the ONOS initiative.",
    journalsLink: "https://www.onos.gov.in/",
    remoteDesc: "Access DRDO e-journals remotely through the ONOS Remote Access Portal. This portal enables authorised DRDO users to access subscribed electronic journals from outside the DRDO network using their credentials.",
    remoteLink: "https://ejlsonos.in/",
    sopTitle: "SOP for Fair Use of E-Journals",
    sopDesc: "Download the Standard Operating Procedure (SOP) document for fair use of subscribed e-journals under the DRDO E-Journal Services consortium. (PDF, 298.01 KB)",
    sopFileUrl: "",
    sopLink: "https://drdo.gov.in/drdo/sites/default/files/form_formats/SOPforEjournals.pdf",
    contactNote: "For queries related to DRDO E-Journal Services and ONOS subscriptions, please contact DESIDOC officials listed below:",
    contactEmail: "ejournal.desidoc@gov.in",
    contactEmailLabel: "ejournal[dot]desidoc[at]gov[dot]in",
  });

  useEffect(() => {
    const baseUrl = window.SERVER_BASE_URL || 'http://localhost:4000';
    
    // Fetch ONOS Publishers
    fetch(`${baseUrl}/api/onos-publishers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setPubList(sorted);
        }
      })
      .catch(err => console.error('Error fetching publishers:', err));

    // Fetch ONOS Settings
    fetch(`${baseUrl}/api/onos-settings`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setSettings(data[0]);
        }
      })
      .catch(err => console.error('Error fetching ONOS settings:', err));

    // Fetch ONOS Contacts
    fetch(`${baseUrl}/api/onos-contacts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setOnosContacts(sorted);
        }
      })
      .catch(err => console.error('Error fetching ONOS contacts:', err));
  }, []);

  const filteredPublishers = useMemo(() => {
    return pubList.filter(pub => 
      pub.name ? pub.name.toLowerCase().includes(search.toLowerCase()) : false
    );
  }, [pubList, search]);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t('Home')}</Link>
              <span> / </span>
              <Link to="/documents/publications" className="hero-link">{t('Documents')}</Link>
              <span> / </span>
            </div>
            <h1>{t('E-Journal Services')}</h1>
          </div>

          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/documents/publications" className="connect-subnav-link">{t('Publications')}</Link>
          <Link to="/documents/avalanche-warning-bulletin" className="connect-subnav-link">{t('Avalanche Warning Bulletin')}</Link>
          <Link to="/documents/drdo-in-news" className="connect-subnav-link">{t('DRDO in News')}</Link>
          <Link to="/documents/form-and-manual" className="connect-subnav-link">{t('Forms and Manuals')}</Link>
          <Link to="/documents/press-release" className="connect-subnav-link">{t('Press Release')}</Link>
          <Link to="/documents/acts-and-policies" className="connect-subnav-link">{t('Acts and Policies')}</Link>
          <Link to="/resources/onos" className="connect-subnav-link active">{t('ONOS')}</Link>
        </div>

        <div className="onos-layout">
          <div className="onos-tab-bar-wrap">
            <div className="onos-tab-bar" role="tablist">
              {TABS.map((tab, idx) => (
                <button
                  key={tab}
                  className={`onos-tab-btn ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                  role="tab"
                  aria-selected={activeTab === idx}
                  id={`onos-tab-${idx}`}
                >
                  {t(tab)}
                </button>
              ))}
            </div>
          </div>

          <div className="onos-tab-content">
            {activeTab === 0 && (
              <div role="tabpanel" id="panel-home">
                <p className="onos-home-desc">
                  {t(settings.homeDesc)}
                </p>
                <p className="onos-home-desc" style={{ fontWeight: '600', color: '#111' }}>
                  {t(settings.homeAccessHeader)}
                </p>
                <p className="onos-home-desc">
                  {t(settings.homePhaseText)}
                </p>
                <ul className="onos-bullets">
                  <li>
                    <strong>{t("On-Campus Access (IP-based):")}</strong> {t(settings.homeOnCampusLabel)} <a href={settings.homeOnCampusLink} target="_blank" rel="noreferrer" className="onos-link-title" style={{ wordBreak: 'break-all' }}>{settings.homeOnCampusLink}</a>
                  </li>
                  <li>
                    <strong>{t("Off-Campus/Remote Access (Authentication-based):")}</strong> {t(settings.homeOffCampusLabel)} <a href={settings.homeOffCampusLink} target="_blank" rel="noreferrer" className="onos-link-title" style={{ wordBreak: 'break-all' }}>{settings.homeOffCampusLink}</a>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 1 && (
              <div role="tabpanel" id="panel-journals">
                <p className="onos-home-desc">
                  {t(settings.journalsDesc)}
                </p>
                <div style={{ marginTop: '24px' }}>
                  <a
                    href={settings.journalsLink}
                    className="onos-portal-btn"
                    target="_blank"
                    rel="noreferrer"
                    id="onos-journals-link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    </svg>
                    {t('Visit ONOS Journals Portal')}
                  </a>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div role="tabpanel" id="panel-remote">
                <p className="onos-home-desc">
                  {t(settings.remoteDesc)}
                </p>
                <div style={{ marginTop: '24px' }}>
                  <a
                    href={settings.remoteLink}
                    className="onos-portal-btn"
                    target="_blank"
                    rel="noreferrer"
                    id="onos-remote-link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    </svg>
                    {t('ONOS Remote Access Portal')}
                  </a>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div role="tabpanel" id="panel-publishers">
                <div className="onos-pub-search-row">
                  <div className="onos-pub-search-wrap">
                    <svg
                      className="onos-pub-search-icon"
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
                      className="onos-pub-search-input"
                      type="text"
                      placeholder={t('Search publisher...')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      id="publisher-search"
                    />
                  </div>
                  <div className="onos-pub-count">
                    {t('Showing')} {filteredPublishers.length} {t('of')} {pubList.length} {t('publishers')}
                  </div>
                </div>

                <div className="onos-table-wrapper">
                  <table className="onos-table">
                    <thead>
                      <tr>
                        <th className="onos-col-sno">{t('S.NO.')}</th>
                        <th>{t('PUBLISHERS')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPublishers.length > 0 ? (
                        filteredPublishers.map((pub, idx) => (
                          <tr key={pub._id || idx} id={`publisher-row-${idx + 1}`}>
                            <td>{idx + 1}</td>
                            <td>
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noreferrer"
                                className="onos-link-title"
                              >
                                {t(pub.name)}
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                            {t('No publishers found matching your search.')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div role="tabpanel" id="panel-sop">
                <div className="onos-download-box">
                  <div className="onos-dl-left">
                    <div className="onos-dl-title">{t(settings.sopTitle)}</div>
                    <div className="onos-dl-desc">
                      {t(settings.sopDesc)}
                    </div>
                  </div>
                  <a
                    href={settings.sopFileUrl || settings.sopLink}
                    target="_blank"
                    rel="noreferrer"
                    className="onos-dl-btn"
                    id="onos-sop-download"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    {t('View / Download')}
                  </a>
                </div>
              </div>
            )}

            {activeTab === 5 && (
              <div role="tabpanel" id="panel-contact">
                <div className="onos-contact-note">
                  {t(settings.contactNote)}
                </div>
                <div className="onos-table-wrapper" style={{ marginBottom: '24px' }}>
                  <table className="onos-table">
                    <thead>
                      <tr>
                        <th>{t('NAME')}</th>
                        <th>{t('DESIGNATION')}</th>
                        <th>{t('CONTACT NO')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {onosContacts.map((contact, idx) => (
                        <tr key={contact._id || idx} id={`contact-row-${idx + 1}`}>
                          <td style={{ fontWeight: '600', color: '#1a5f6a' }}>{t(contact.name)}</td>
                          <td>{t(contact.designation)}</td>
                          <td>{t(contact.phone)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="onos-email-wrap">
                  <span>{t('Email:')}</span>
                  <a href={`mailto:${settings.contactEmail}`} className="onos-email-link" id="onos-contact-email">
                    {t(settings.contactEmailLabel)}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="onos-bottom-row">
            <div className="onos-last-updated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="#888"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              {t('Last Updated')}: 12 Jun 2026
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
