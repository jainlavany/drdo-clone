import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { FaSearch, FaThLarge } from "react-icons/fa";
import Footer from "../components/Footer";
import "./TechClustersPage.css";

import drdoLogo from "../assets/logo.png";

export const techClusters = [
  {
    id: 'aeronautical-systems',
    name: 'Aeronautical Systems (Aero)',
    shortName: 'Aero',
    icon: '✈️',
    color: '#003a70',
    description:
      'Aeronautical Systems cluster is engaged in the development of state-of-the-art unmanned Air Vehicles, Aero Gas Turbine Engine Technology, Airborne Surveillance Systems, Parachutes, Decelerators and various other airborne systems.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/aeronautical-systems',
    labs: ['ADE', 'CABS', 'CEMILAC', 'GTRE', 'NAL-DRDO'],
    focus: [
      'Unmanned Air Vehicles (UAVs)',
      'Aero Gas Turbine Engine Technology',
      'Airborne Surveillance Systems',
      'Parachutes & Decelerators',
      'Aeronautics Research & Development',
    ],
  },
  {
    id: 'armament-combat-engineering',
    name: 'Armament & Combat Engineering Systems (ACE)',
    shortName: 'ACE',
    icon: '🛡️',
    color: '#1a3a5c',
    description:
      'Armament & Combat Engineering Systems (ACE) Cluster focuses on research & development of armaments, explosives, land based combat vehicles & engineering equipment. Labs under this cluster are engaged in development of weapons, explosives, vehicle systems and combat engineering solutions.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/armament-combat-engineering-systems',
    labs: ['ARDE', 'CFEES', 'CVRDE', 'HEMRL', 'TBR&L'],
    focus: [
      'Armaments & Weapons Systems',
      'Explosives & Propellants',
      'Land-based Combat Vehicles',
      'Engineering Equipment',
      'Fire Safety & Survivability',
    ],
  },
  {
    id: 'electronics-communication-systems',
    name: 'Electronics and Communication Systems (ECS)',
    shortName: 'ECS',
    icon: '📡',
    color: '#0d5c75',
    description:
      'ECS Cluster has a mandate to design and develop electronic, electro-optical and laser based sensors and systems. The Cluster consists of laboratories DARE, DEAL, DLRL, IRDE, LASTEC, LRDE and others engaged in cutting-edge electronics and communication research.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/electronics-and-communication-systems',
    labs: ['DARE', 'DEAL', 'DLRL', 'IRDE', 'LASTEC', 'LRDE'],
    focus: [
      'Electronic Warfare Systems',
      'Electro-optical Sensors',
      'Laser-based Systems',
      'Radar Development',
      'Communication Systems',
    ],
  },
  {
    id: 'micro-electronic-devices',
    name: 'Micro Electronic Devices, Computational Systems & Cyber Security (MCC)',
    shortName: 'MCC',
    icon: '💻',
    color: '#114b5f',
    description:
      'The MCC Cluster encompasses two areas viz. Micro Electronic Devices (MED) and Computational Systems & Cyber Security. The Micro Electronic Devices (MED) sub-cluster focuses on thrust areas of semiconductor devices, microelectronics, and cyber security.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/electronics-and-communication-systems',
    labs: ['CAIR', 'CEERI', 'CHESS', 'DYSL-QT', 'SAG'],
    focus: [
      'Micro Electronic Devices',
      'Semiconductor Technologies',
      'Computational Systems',
      'Cyber Security',
      'Artificial Intelligence & Robotics',
    ],
  },
  {
    id: 'missiles-strategic-systems',
    name: 'Missiles and Strategic Systems (MSS)',
    shortName: 'MSS',
    icon: '🚀',
    color: '#1a5276',
    description:
      'MSS Cluster is responsible for the design and development of state-of-the-art Missiles and Strategic Systems required for the deterrence and defence of the country. The Cluster comprises of five premier laboratories developing missiles, strategic systems and associated technologies.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/missiles-and-strategic-systems',
    labs: ['ADRDE', 'ASL', 'DRDL', 'RCI', 'SSPD'],
    focus: [
      'Ballistic Missiles (Agni, Prithvi)',
      'Cruise Missiles',
      'Anti-tank Missiles',
      'Hypersonic Technologies',
      'Strategic Defence Systems',
    ],
  },
  {
    id: 'naval-systems-materials',
    name: 'Naval Systems and Materials (NS & M)',
    shortName: 'NS&M',
    icon: '⚓',
    color: '#1a4a6b',
    description:
      'The Naval Systems & Materials (NS & M) Cluster comprises of six laboratories - Naval Physical & Oceanographic Laboratory (NPOL) at Kochi, Naval Science & Technological Laboratory (NSTL) at Visakhapatnam and others developing advanced naval warfare technologies.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/naval-systems-and-materials',
    labs: ['NMRL', 'NPOL', 'NSTL', 'DMSRDE', 'DTRL'],
    focus: [
      'Naval Warfare Systems',
      'Underwater Sensors & Acoustics',
      'Torpedoes & Mines',
      'Advanced Materials',
      'Oceanographic Systems',
    ],
  },
  {
    id: 'soldier-support-system',
    name: 'Soldier Support System (SSS)',
    shortName: 'SSS',
    icon: '🧬',
    color: '#1d6a4a',
    description:
      'Equipping the Services with the best, cutting-edge weapon systems and platforms do not really achieve their intended purpose until the integral human component of the war machine is also optimized. The SSS Cluster focuses on life sciences, food, environment and medicine for defence personnel.',
    href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/life-sciences',
    labs: ['DFRL', 'DIBER', 'DIPAS', 'DIPR', 'DRDE', 'INMAS'],
    focus: [
      'Defence Food Research',
      'Bio-medical Sciences',
      'High Altitude Medicine',
      'Human Performance Optimisation',
      'NBC Protection',
    ],
  },
];

export default function TechClustersPage() {
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
            <h1>{t("Technology Clusters")}</h1>
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
            className="connect-subnav-link active"
          >
            {t("Technology Clusters")}
          </Link>

          <Link
            to="/organisation/corporate-clusters"
            className="connect-subnav-link"
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

            {techClusters.map((cluster, index) => (
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
          <Link to="/organisation/our-team" className="tc-back-home-btn">
            {t("← Back to Previous Page")}
          </Link>
        </div>

      </div>

      <Footer />
    </>
  );
}
