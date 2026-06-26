// In-memory data store - acts as the "database"
// All content seeded from the existing front-end static data

let data = {
  // ── DRDO In News ──────────────────────────────────────────────
  drdo_in_news: [
    { id: 1,  title: 'DRDO News - 04 June 2026',         date: '04/06/2026', timestamp: 1780598400, size: '2.10 MB', file: 'drdo_news_04_jun_2026.pdf' },
    { id: 2,  title: 'DRDO News - 03 June 2026',         date: '03/06/2026', timestamp: 1780512000, size: '2.13 MB', file: 'drdo_news_03_jun_2026.pdf' },
    { id: 3,  title: 'DRDO News - 02 June 2026',         date: '02/06/2026', timestamp: 1780425600, size: '1.85 MB', file: 'drdo_news_02_jun_2026.pdf' },
    { id: 4,  title: 'DRDO News - 01 June 2026',         date: '01/06/2026', timestamp: 1780339200, size: '2.05 MB', file: 'drdo_news_01_jun_2026.pdf' },
    { id: 5,  title: 'DRDO News - 31 May 2026',          date: '31/05/2026', timestamp: 1780252800, size: '1.92 MB', file: 'drdo_news_31_may_2026.pdf' },
    { id: 6,  title: 'DRDO News - 30 May 2026',          date: '30/05/2026', timestamp: 1780166400, size: '2.22 MB', file: 'drdo_news_30_may_2026.pdf' },
    { id: 7,  title: 'DRDO News - 29 May 2026',          date: '29/05/2026', timestamp: 1780080000, size: '2.01 MB', file: 'drdo_news_29_may_2026.pdf' },
    { id: 8,  title: 'DRDO News - 28 May 2026',          date: '28/05/2026', timestamp: 1779993600, size: '1.96 MB', file: 'drdo_news_28_may_2026.pdf' },
    { id: 9,  title: 'DRDO News - 27 May 2026',          date: '27/05/2026', timestamp: 1779907200, size: '1.90 MB', file: 'drdo_news_27_may_2026.pdf' },
    { id: 10, title: 'DRDO News - 26 May 2026',          date: '26/05/2026', timestamp: 1779820800, size: '2.15 MB', file: 'drdo_news_26_may_2026.pdf' },
    { id: 11, title: 'DRDO News - 07 May 2026',          date: '07/05/2026', timestamp: 1778179200, size: '2.51 MB', file: 'drdo_news_07_may_2026.pdf' },
    { id: 12, title: 'DRDO News - 01 to 04 May 2026',   date: '04/05/2026', timestamp: 1777920000, size: '1.92 MB', file: 'drdo_news_01_04_may_2026.pdf' },
    { id: 13, title: 'DRDO News - 30 April 2026',        date: '30/04/2026', timestamp: 1777574400, size: '3.72 MB', file: 'drdo_news_30_april_2026.pdf' },
    { id: 14, title: 'DRDO News - 29 April 2026',        date: '29/04/2026', timestamp: 1777488000, size: '2.00 MB', file: 'drdo_news_29_april_2026.pdf' },
    { id: 15, title: 'DRDO News - 28 April 2026',        date: '28/04/2026', timestamp: 1777401600, size: '1.83 MB', file: 'drdo_news_28_april_2026.pdf' },
  ],

  // ── Press Release ─────────────────────────────────────────────
  press_release: [
    { id: 1,  title: 'Union Minister Dr Jitendra Singh presents certificates to Scientists', date: '06/05/2026', timestamp: 1778112000, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2258439' },
    { id: 2,  title: 'DRDO opens CBRN Field Training & Demonstration Centre in Delhi',       date: '06/05/2026', timestamp: 1778112000, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2258463' },
    { id: 3,  title: 'Successful flight test of Long-Range Glide Bomb (LRGB) Gaurav',       date: '12/04/2026', timestamp: 1776038400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248102' },
    { id: 4,  title: 'DRDO conducts successful flight test of Rudra-II',                     date: '08/04/2026', timestamp: 1775692800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246059' },
    { id: 5,  title: 'DRDO technology licensing agreement signed with private defence partners', date: '28/03/2026', timestamp: 1774742400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241940' },
    { id: 6,  title: 'Successful flight test of Agni-Prime missile off Odisha coast',        date: '15/03/2026', timestamp: 1773619200, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2238122' },
    { id: 7,  title: 'DRDO successfully test fires Very Short Range Air Defence System',     date: '28/02/2026', timestamp: 1772236800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2232145' },
    { id: 8,  title: 'DRDO successfully test fires Autonomous Flying Wing Technology Demonstrator', date: '15/12/2025', timestamp: 1765756800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2210103' },
    { id: 9,  title: 'DRDO successfully test fires medium range air-to-air missile Astra',   date: '10/11/2025', timestamp: 1762732800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2202021' },
    { id: 10, title: 'Successful flight test of Pinaka Multi-Barrel Rocket Launcher System', date: '28/10/2025', timestamp: 1761609600, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2198031' },
  ],

  // ── Acts and Policies ─────────────────────────────────────────
  acts_policies: [
    { id: 1,  title: 'DRDO Policy for Transfer of Technology 2025',              date: '13/01/2026', timestamp: 1768262400, type: 'Transfer of Technology', size: '3.40 MB',    file: 'drdo_tot_policy_2025.pdf' },
    { id: 2,  title: 'DRDO Policy for Use of Patents by Indian Industry',         date: '13/01/2026', timestamp: 1768262400, type: 'Patents',                size: '211.68 KB', file: 'drdo_patents_use_policy.pdf' },
    { id: 3,  title: 'Guidelines for Transfer of Technology (ToT) to Industry',  date: '12/12/2025', timestamp: 1765497600, type: 'Guidelines',             size: '1.25 MB',    file: 'tot_guidelines_industry.pdf' },
    { id: 4,  title: 'DRDO Patent Application Guidelines for Academia',           date: '05/11/2025', timestamp: 1762387200, type: 'Patents',                size: '890.50 KB', file: 'patent_academia_guidelines.pdf' },
    { id: 5,  title: 'Policy on Intellectual Property Rights (IPR) 2024',        date: '24/09/2024', timestamp: 1727136000, type: 'Policies',               size: '2.10 MB',    file: 'ipr_policy_2024.pdf' },
    { id: 6,  title: 'Public Procurement (Preference to Make in India) Order',   date: '10/05/2024', timestamp: 1715299200, type: 'Guidelines',             size: '1.80 MB',    file: 'public_procurement_make_in_india.pdf' },
    { id: 7,  title: 'DRDO IPR Policy for Research Organizations',               date: '20/03/2024', timestamp: 1710892800, type: 'Patents',                size: '1.45 MB',    file: 'drdo_research_ipr.pdf' },
    { id: 8,  title: 'Guidelines for Collaborative Defence Research with Academia', date: '10/02/2024', timestamp: 1707523200, type: 'Guidelines',           size: '2.30 MB',    file: 'collaborative_research_academia.pdf' },
    { id: 9,  title: 'DRDO Technology Acquisition and Development Fund Guidelines', date: '15/12/2023', timestamp: 1702598400, type: 'Guidelines',           size: '3.12 MB',    file: 'tadf_guidelines.pdf' },
    { id: 10, title: 'DRDO Policy for Funding Academic Research (DIA-CoE Scheme)', date: '08/11/2023', timestamp: 1699401600, type: 'Policies',             size: '2.75 MB',    file: 'dia_coe_funding_policy.pdf' },
    { id: 11, title: 'Policy on Commercialization of DRDO Technologies',          date: '12/09/2023', timestamp: 1694476800, type: 'Transfer of Technology', size: '1.85 MB',   file: 'tot_commercialization_policy.pdf' },
    { id: 12, title: 'Guidelines for Security Classification in DRDO Research',   date: '04/07/2023', timestamp: 1688428800, type: 'Guidelines',             size: '940.10 KB', file: 'security_clearance_guidelines.pdf' },
  ],

  // ── Vacancies ─────────────────────────────────────────────────
  vacancies: [
    { id: 1,  title: 'DYSL-QT, Pune invites applications for the post of DRDO RA', publishedDate: '22/06/2026', dateVal: 20260622, advtNo: 'DYSL-QT/RA/2026/02', startDate: '22/06/2026', endDate: '15/07/2026', snippet: 'Defence Young Scientist Laboratories - Quantum Technologies invites applications from qualified candidates for selection of Research Associate.' },
    { id: 2,  title: 'List of Provisionally Selected Students: Apprenticeship Training at INMAS', publishedDate: '22/06/2026', dateVal: 20260622, advtNo: 'INMAS/APP/2026/01', startDate: '22/06/2026', endDate: '—', snippet: 'List of provisionally selected candidates for the Engagement of Apprentices under Apprenticeship Act 1961 for year 2026.' },
    { id: 3,  title: 'HEMRL, Pune invites applications for paid internships',      publishedDate: '19/06/2026', dateVal: 20260619, advtNo: 'HEMRL/INTERN/2026/03', startDate: '19/06/2026', endDate: '10/07/2026', snippet: 'High Energy Materials Research Laboratory invites application from eligible UG/PG students for Selection of Paid Internship.' },
    { id: 4,  title: 'List of selected candidates for JRF/RA 2026 in DIPR, Delhi', publishedDate: '19/06/2026', dateVal: 20260619, advtNo: 'DIPR/JRF-RA/2026', startDate: '19/06/2026', endDate: '—', snippet: 'Result declaring the list of selected candidates for Junior Research Fellowship and Research Associateship interview.' },
    { id: 5,  title: 'CABS, Bengaluru invites applications for Civilian Medical Officer', publishedDate: '19/06/2026', dateVal: 20260619, advtNo: 'CABS/CMO/2026/01', startDate: '19/06/2026', endDate: '25/07/2026', snippet: 'Centre for Airborne Systems invites applications for engagement of Civilian Medical Officers on contract basis.' },
    { id: 6,  title: 'Result for selection of DRDO paid internship 2026 at DIPAS and DIBER', publishedDate: '17/06/2026', dateVal: 20260617, advtNo: 'DIPAS-DIBER/INT/2026', startDate: '17/06/2026', endDate: '—', snippet: 'Provisional selection list for students applying for paid internships at Defence Institute of Physiology and Allied Sciences.' },
    { id: 7,  title: 'DYSL-QT, Pune invites applications for selection of JRF',   publishedDate: '16/06/2026', dateVal: 20260616, advtNo: 'DYSL-QT/JRF/2026/01', startDate: '16/06/2026', endDate: '12/07/2026', snippet: 'Applications are invited from Indian Nationals for selection of Junior Research Fellow in Quantum Technologies area.' },
    { id: 8,  title: 'LRDE, Bengaluru invites application for Paid internship',    publishedDate: '12/06/2026', dateVal: 20260612, advtNo: 'LRDE/INTERN/2026/04', startDate: '12/06/2026', endDate: '05/07/2026', snippet: 'Electronics & Radar Development Establishment invites engineering students for Paid Internship in Radar Systems.' },
    { id: 9,  title: 'DESIDOC, Delhi invites applications for Apprentices',        publishedDate: '10/06/2026', dateVal: 20260610, advtNo: 'DESIDOC/APP/2026/02', startDate: '10/06/2026', endDate: '30/06/2026', snippet: 'Defence Scientific Information and Documentation Centre invites ITI, Diploma and Degree holders for one year apprentice training.' },
    { id: 10, title: 'ARDE, Pune invites applications from UG/PG Engineering students', publishedDate: '10/06/2026', dateVal: 20260610, advtNo: 'ARDE/INTERN/2026', startDate: '10/06/2026', endDate: '08/07/2026', snippet: 'Armament Research and Development Establishment invites applications from undergraduate and postgraduate students for engineering internships.' },
    { id: 11, title: 'RAC invites applications for Scientist posts in DRDS cadre', publishedDate: '04/06/2026', dateVal: 20260604, advtNo: 'RAC/SCIENTIST/147/2026', startDate: '04/06/2026', endDate: '10/07/2026', snippet: 'Recruitment and Assessment Centre invites online applications for direct recruitment of Scientist B, C, D, E and F in DRDO.' },
    { id: 12, title: 'INMAS, Delhi calls for Interviews for JRF/RA',              publishedDate: '03/06/2026', dateVal: 20260603, advtNo: 'INMAS/JRF-RA/2026', startDate: '03/06/2026', endDate: '20/06/2026', snippet: 'Institute of Nuclear Medicine and Allied Sciences announces schedule of interview for selection of JRF and RA.' },
    { id: 13, title: 'CAIR, Bengaluru invites for walk-in interview for JRF',     publishedDate: '27/05/2026', dateVal: 20260527, advtNo: 'CAIR/JRF/2026/01', startDate: '27/05/2026', endDate: '18/06/2026', snippet: 'Centre for Artificial Intelligence and Robotics will conduct walk-in interviews for Junior Research Fellow positions.' },
    { id: 17, title: 'CEPTAM-11 Advertisement for STA-B and Technician-A',       publishedDate: '11/12/2025', dateVal: 20251211, advtNo: 'CEPTAM-11/DR/2025', startDate: '15/12/2025', endDate: '15/01/2026', snippet: 'Centre for Personnel Talent Management invites applications for recruitment to the posts of Senior Technical Assistant-B and Technician-A.' },
  ],

  // ── Hero Slider (Home page banners) ──────────────────────────
  hero_slides: [
    { id: 1, title: 'Advanced Defence Technologies', subtitle: 'Empowering the Nation through Science & Technology', image: '/assets/slider1.jpg', link: '#' },
    { id: 2, title: 'Missile Systems & Aerospace',   subtitle: 'Cutting-edge research for national security', image: '/assets/slider2.jpg', link: '#' },
    { id: 3, title: 'Naval & Electronic Warfare',    subtitle: 'Innovation at the frontier of defence', image: '/assets/slider3.jpg', link: '#' },
  ],

  // ── News Ticker ───────────────────────────────────────────────
  news_ticker: [
    { id: 1, text: 'DRDO successfully tests VSHORAD missile system', link: '#' },
    { id: 2, text: 'New MOU signed with IIT Delhi for defence R&D collaboration', link: '#' },
    { id: 3, text: 'DRDO opens new research facility in Hyderabad', link: '#' },
    { id: 4, text: 'DRDO achieves breakthrough in quantum communication', link: '#' },
    { id: 5, text: 'Annual Technology Conclave 2026 registrations now open', link: '#' },
  ],

  // ── Counters used in _nextId helper ──────────────────────────
  _counters: {
    drdo_in_news: 16,
    press_release: 11,
    acts_policies: 13,
    vacancies: 18,
    hero_slides: 4,
    news_ticker: 6,
  },
};

// Helper: generate next id for a section
function nextId(section) {
  data._counters[section] = (data._counters[section] || 0) + 1;
  return data._counters[section];
}

module.exports = { data, nextId };
