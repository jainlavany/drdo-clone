import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Footer from "../components/Footer";
import "./TechClustersPage.css";

import drdoLogo from "../assets/logo.png";

export const corporateClusters = [
  {
    id: 'technology-management',
    name: 'Technology Management (TM)',
    shortName: 'TM',
    icon: '🔬',
    color: '#003a70',
    description:
      'The cluster has a mandate to create a research ecosystem in the academia, research institutions and industry for meeting the science and technology needs of defence and security of the nation.',
    href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/technology-management',
    directorGeneral: {
      title: 'Director General',
      name: 'Technology Management',
      address: 'Room No. 301, 3rd Floor, DRDO Bhawan,\nRajaji Marg, New Delhi- 110 011',
      phone: '011 - 23013476',
      fax: '011 - 23013472',
      email: 'dgtm.hqr@gov.in',
    },
    directorates: [
      {
        name: 'Directorate of Extramural Research & Intellectual Property Rights (ER&IPR)',
        address: 'Room No. 510, DRDO HQ Annexe,\nMetcalfe House, Civil Lines, Delhi-110054',
        fax: '011 - 23902719',
        email: 'erip-er.hqr@gov.in (Extramural Projects) / erip-ipr.hqr@gov.in (IPR)',
      },
      {
        name: 'Directorate of Futuristic Technology Management (DFTM)',
        address: 'Room No. 309, 3rd Floor, DRDO HQ Annexe (Old Lastec Building)\nMetcalfe House, Civil Lines, Delhi 110054',
        phone: '011 - 23902792',
        fax: '011 - 23902797, 23792946',
        email: 'directorftm.hqr@gov.in',
      },
      {
        name: 'Directorate of Technology Development Fund (DTDF)',
        address: 'DRDO Bhawan\nRajaji Marg, New Delhi - 110011',
        phone: '011 - 23007794',
        email: 'director.tdf.hqr@gov.in',
      },
    ],
    focus: [
      'Extramural Research Funding',
      'Intellectual Property Rights (IPR)',
      'Technology Development Fund (TDF)',
      'Futuristic Technology Management',
      'Academia–Defence Interface',
    ],
  },
  {
    id: 'production-coordination',
    name: 'Production Coordination & Services Interaction (PC&SI)',
    shortName: 'PC&SI',
    icon: '🏭',
    color: '#1a3a5c',
    description:
      'The Cluster of Production Coordination & Services Interaction (PC&SI) formulates policies for facilitating faster induction of DRDO developed systems by Armed Forces; advocating DRDO products to Services and MoD.',
    href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/production-coordination-services-interaction',
    directorGeneral: {
      title: 'Director General',
      name: 'Production Coordination & Services Interaction (PC&SI)',
      address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
      phone: '011 - 23016132',
      fax: '011 - 23016127',
      email: 'dgpcsi.hqr@gov.in',
    },
    directorates: [
      {
        name: 'Directorate of Industry Interface & Quality Management (DIIQM)',
        address: 'Room No 447, DRDO Bhawan, DRDO HQrs,\nRajaji Marg, New Delhi-110011',
        phone: '011 - 23013209, 23015291',
        fax: '011 - 23793008',
        email: 'director-diiqm-hqr@gov.in',
      },
      {
        name: 'Directorate of Technology Development & Transfer (DTDT)',
        address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
        phone: '011 - 23007325',
        fax: '011 - 23013462',
        email: 'dtdt.hqr@gov.in',
      },
    ],
    focus: [
      'Induction of DRDO Systems by Armed Forces',
      'Industry Coordination & Production',
      'Technology Export Facilitation',
      'Coordination with MoD, DDP, OFB',
      'Quality Management',
    ],
  },
  {
    id: 'resource-management',
    name: 'Resource & Management (R&M)',
    shortName: 'R&M',
    icon: '📊',
    color: '#0d5c75',
    description:
      'R&M is the nodal cluster for the resource management of DRDO and deals in the planning and execution of projects and programmes taken up by the organization. It is responsible for financial planning, resource allocation and project monitoring.',
    href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/resource-management',
    directorGeneral: {
      title: 'Director General',
      name: 'Resource & Management (R&M)',
      address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
      phone: '011 - 23019134',
      fax: '011 - 23015637',
      email: 'dgrm.hqr@gov.in',
    },
    directorates: [
      {
        name: 'Directorate of Finance',
        address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
        phone: '011 - 23013200',
        fax: '011 - 23015220',
        email: 'findir.hqr@gov.in',
      },
      {
        name: 'Directorate of Works & Estates',
        address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
        phone: '011 - 23013400',
        fax: '011 - 23015414',
        email: 'dwe.hqr@gov.in',
      },
    ],
    focus: [
      'Financial Planning & Resource Allocation',
      'Project Monitoring & Management',
      'Infrastructure Development',
      'Works & Estates Management',
      'Budget & Accounts Management',
    ],
  },
  {
    id: 'human-resources',
    name: 'Human Resources (HR)',
    shortName: 'HR',
    icon: '👥',
    color: '#114b5f',
    description:
      'HR cluster is responsible for HR planning, organization in recruitment, selection, compensations, performance assessment, training and development of DRDO\'s human capital. The HR corporate addresses various aspects of acquisition, nurturing and retention of best available talent.',
    href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/human-resources',
    directorGeneral: {
      title: 'Director General',
      name: 'Human Resources (HR)',
      address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
      phone: '011 - 23016132, 23016163',
      fax: '011 - 23016127',
      email: 'dghr.hqr@gov.in',
    },
    focus: [
      'HR Planning & Recruitment',
      'Compensation & Performance Assessment',
      'Training & Development',
      'Establishment Policies',
      'Talent Acquisition & Retention',
    ],
  },
  {
    id: 'brahmos',
    name: 'BrahMos (BM)',
    shortName: 'BM',
    icon: '🚀',
    color: '#1a5276',
    description:
      'BrahMos Aerospace is a joint venture between India\'s Defence Research and Development Organisation (DRDO) and Russia\'s NPO Mashinostroyenia. It produces the BrahMos supersonic cruise missile, the world\'s fastest operational supersonic cruise missile.',
    href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/brahmos-aerospace',
    externalLink: 'https://www.brahmos.com/',
    focus: [
      'BrahMos Supersonic Cruise Missile',
      'Multi-platform Launch Capability',
      'India–Russia Joint Venture',
      'Export of Defence Systems',
      'Next-generation Hypersonic Missile (BrahMos-II)',
    ],
  },
];

export default function CorporateClustersPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <Link to="/organisation/about-drdo" className="hero-link">{t("Organisation")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Corporate Clusters")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link
            to="/organisation/about-drdo"
            className="connect-subnav-link"
          >
            {t("About DRDO")}
          </Link>

          <Link
            to="/organisation/our-team"
            className="connect-subnav-link"
          >
            {t("Our Team")}
          </Link>

          <Link
            to="/organisation/technology-clusters"
            className="connect-subnav-link"
          >
            {t("Technology Clusters")}
          </Link>

          <Link
            to="/organisation/corporate-clusters"
            className="connect-subnav-link active"
          >
            {t("Corporate Clusters")}
          </Link>
        </div>


        <div className="tc-container">

          <div className="tc-topbar">

            <div className="tc-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <select className="tc-select">
              <option>{t("10 per page")}</option>
              <option>{t("20 per page")}</option>
              <option>{t("30 per page")}</option>
            </select>

          </div>

          <div className="tc-grid">

            {corporateClusters.map((cluster, index) => (
              <div
                className="tc-card"
                key={index}
              >
                <img
                  src={drdoLogo}
                  alt="DRDO"
                  className="tc-logo"
                />

                <div className="tc-content">
                  <h3>{cluster.shortName}</h3>
                  <p>{t(cluster.name)}</p>
                </div>


                <Link
                  to={cluster.href}
                  className="tc-arrow"
                >
                  →
                </Link>

              </div>
            ))}

          </div>

          <div className="tc-update">
            {t("Last Updated : 01 Jun 2026")}
          </div>

        </div>

        <div className="tc-bottom-btn">
          <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
            {t('← BACK TO PREVIOUS PAGE')}
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
}
