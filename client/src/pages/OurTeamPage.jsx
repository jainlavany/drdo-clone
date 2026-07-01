import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './AboutDRDOPage.css';
import './OurTeamPage.css';

export default function OurTeamPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/team-members`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setTeam(sorted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team members:', err);
        setLoading(false);
      });
  }, []);

  const technical = team.filter(m => m.category === 'Technical');
  const corporate = team.filter(m => m.category === 'Corporate');
  const nodal     = team.filter(m => m.category === 'Nodal');

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
          {/* Secretary Additional Charge Banner */}
          <div className="additional-charge-banner">
            <div className="banner-header">
              {t("SECRETARY DDR&D AND CHAIRMAN DRDO")}
            </div>
            <div className="banner-content">
              {t("SHRI RAJESH KUMAR SINGH, IAS, SECRETARY, DEPARTMENT OF DEFENCE HAS ASSUMED THE ADDITIONAL CHARGE OF SECRETARY, DDR&D AND CHAIRMAN, DRDO")}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              {t("Loading team members...")}
            </div>
          ) : (
            <>
              {/* Technical Directors General Table */}
              {technical.length > 0 && (
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
                        {technical.map((m) => (
                          <tr key={m._id}>
                            <td className="name-cell">{t(m.name)}</td>
                            <td>{t(m.cluster)}</td>
                            <td>{t(m.designation)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Corporate Directors General Table */}
              {corporate.length > 0 && (
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
                        {corporate.map((m) => (
                          <tr key={m._id}>
                            <td className="name-cell">{t(m.name)}</td>
                            <td>{t(m.cluster)}</td>
                            <td>{t(m.designation)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Nodal Officer Table */}
              {nodal.length > 0 && (
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
                        {nodal.map((m) => (
                          <tr key={m._id}>
                            <td className="name-cell">{t(m.name)}</td>
                            <td>{t(m.cluster)}</td>
                            <td>{t(m.designation)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

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