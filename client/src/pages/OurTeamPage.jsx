import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import rajnathsingh from '../assets/rajnathsingh.png';
import raksharm from '../assets/raksharm.jpg';
import './AboutDRDOPage.css';
import './OurTeamPage.css';

export default function OurTeamPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">
                {t("Home")}
              </Link>
              <span> / </span>
              <Link to="/organisation/about-drdo" className="hero-link">
                {t("Organisation")}
              </Link>
              <span> / </span>
            </div>
            <h1>{t("Our Team")}</h1>
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
            className="connect-subnav-link active"
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
            className="connect-subnav-link"
          >
            {t("Corporate Clusters")}
          </Link>
        </div>

        <div className="about-content-container">
          {/* Organizational Chart Graph */}
          <div className="drdo-org-wrapper">
            {/* Raksha Mantri */}
            <div className="org-person-card">
              <div className="org-avatar">
                <img src={rajnathsingh} alt="Shri Rajnath Singh" className="org-photo" />
              </div>
              <h4>{t("HON'BLE RAKSHA MANTRI")}</h4>
              <p>{t("Shri Rajnath Singh")}</p>
            </div>

            <div className="org-line"></div>

            {/* Raksha Rajya Mantri */}
            <div className="org-person-card">
              <div className="org-avatar">
                <img src={raksharm} alt="Shri Sanjay Seth" className="org-photo" />
              </div>
              <h4>{t("HON'BLE RAKSHA RAJYA MANTRI")}</h4>
              <p>{t("Shri Sanjay Seth")}</p>
            </div>

            <div className="org-line"></div>

            {/* Secretary DDR&D & Chairman DRDO */}
            <div className="org-person-card secretary-card">
              <h4>
                {t("SECRETARY DDR&D & CHAIRMAN DRDO")}
              </h4>
            </div>

            <div className="connector-2"></div>

            {/* Branch Level 1 */}
            <div className="org-double-row">
              <div className="org-small-box">
                {t("DRDO")}
              </div>
              <div className="org-small-box">
                {t("IFA (R&D)")}
              </div>
            </div>

            <div className="connector-3"></div>

            {/* Branch Level 2 */}
            <div className="org-triple-row">
              <div className="org-small-box">
                {t("CORPORATE CLUSTERS")}
              </div>
              <div className="org-small-box">
                {t("TECHNICAL CLUSTERS")}
              </div>
              <div className="org-small-box">
                {t("CEMILAC")}
              </div>
            </div>

            <div className="connector-4"></div>

            {/* Branch Level 3 */}
            <div className="org-double-row sub-row">
              <div className="org-small-box">
                {t("LABS")}
              </div>
              <div className="org-small-box">
                {t("DYSLs")}
              </div>
            </div>
          </div>

          {/* Secretary Additional Charge Banner */}
          <div className="additional-charge-banner">
            <div className="banner-header">
              {t("SECRETARY DDR&D AND CHAIRMAN DRDO")}
            </div>
            <div className="banner-content">
              {t("SHRI RAJESH KUMAR SINGH, IAS, SECRETARY, DEPARTMENT OF DEFENCE HAS ASSUMED THE ADDITIONAL CHARGE OF SECRETARY, DDR&D AND CHAIRMAN, DRDO")}
            </div>
          </div>

          {/* Technical Directors General Table */}
          <div className="team-table-section">
            <div className="team-table-header">
              {t("DIRECTORS GENERAL (TECHNICAL)")}
            </div>
            <div className="team-table-responsive">
              <table className="team-table">
                <thead>
                  <tr>
                    <th>{t("NAME")}</th>
                    <th>{t("CLUSTER")}</th>
                    <th>{t("DESIGNATION")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="name-cell">{t("Dr. B K Das")}</td>
                    <td>{t("Electronics and Communication Systems")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Sh. Ummalaneni Raja Babu")}</td>
                    <td>{t("Missiles and Strategic Systems")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. Upendra Kumar Singh")}</td>
                    <td>{t("Soldier Support System")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. K Rajalakshmi Menon")}</td>
                    <td>{t("Aeronautical Systems")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Sh. RVH Prasad")}</td>
                    <td>{t("Naval Systems and Materials")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Sh. Prateek Kishore")}</td>
                    <td>{t("Armament & Combat Engineering Systems")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Ms Sheena Rani R")}</td>
                    <td>{t("Micro Electronic Devices, Computational Systems & Cyber Security")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Corporate Directors General Table */}
          <div className="team-table-section">
            <div className="team-table-header">
              {t("DIRECTORS GENERAL (CORPORATE)")}
            </div>
            <div className="team-table-responsive">
              <table className="team-table">
                <thead>
                  <tr>
                    <th>{t("NAME")}</th>
                    <th>{t("CLUSTER")}</th>
                    <th>{t("DESIGNATION")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="name-cell">{t("Sh. Mangal Lal Chand")}</td>
                    <td>{t("Technology Management")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. (Smt) Chandrika Kaushik")}</td>
                    <td>{t("Production Coordination & Services Interaction")}</td>
                    <td>{t("Distinguished Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. Mayank Dwivedi")}</td>
                    <td>{t("Human Resources")}</td>
                    <td>{t("Outstanding Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. Jaiteerth R. Joshi")}</td>
                    <td>{t("BrahMos")}</td>
                    <td>{t("Outstanding Scientist & Director General")}</td>
                  </tr>
                  <tr>
                    <td className="name-cell">{t("Dr. Ravindra Singh")}</td>
                    <td>{t("Resource & Management")}</td>
                    <td>{t("Outstanding Scientist & Director General")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Nodal Officer Table */}
          <div className="team-table-section">
            <div className="team-table-header">
              {t("NODAL OFFICER OF DRDO")}
            </div>
            <div className="team-table-responsive">
              <table className="team-table">
                <thead>
                  <tr>
                    <th>{t("NAME")}</th>
                    <th>{t("DIRECTORATE")}</th>
                    <th>{t("DESIGNATION")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="name-cell">{t("Dr. Sanjai K Dwivedi")}</td>
                    <td>-</td>
                    <td>{t("Scientist 'G' & Director")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="about-update-date">
            {t("Last Update: 03 Jun 2026")}
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