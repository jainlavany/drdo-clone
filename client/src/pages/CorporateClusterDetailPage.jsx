import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import { corporateClusters } from './CorporateClustersPage';
import './TechClustersPage.css';
import './CorporateClustersPage.css';

const sidebarItems = [
  { label: 'About DRDO', href: '/organisation/about-drdo' },
  { label: 'Our Team', href: '/organisation/our-team' },
  { label: 'Technology Clusters', href: '/organisation/technology-clusters' },
  { label: 'Corporate Clusters', href: '/organisation/corporate-clusters' },
];

function ContactRow({ label, value, isEmail, isPhone }) {
  if (!value) return null;
  return (
    <div className="cc-contact-row">
      <span className="label">{label}:</span>
      <span className="value">
        {isEmail ? <a href={`mailto:${value}`}>{value}</a> : value}
      </span>
    </div>
  );
}

function DirectorateCard({ d }) {
  const { t } = useTranslation();
  return (
    <div className="cc-directorate-card">
      <div className="cc-directorate-name">{t(d.name)}</div>
      {d.address && (
        <div className="cc-contact-row">
          <span className="label">{t("Address:")}</span>
          <span className="value">
            {d.address.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        </div>
      )}
      {d.phone && <div className="cc-contact-row"><span className="label">{t("Phone:")}</span><span className="value">{t(d.phone)}</span></div>}
      {d.fax && <div className="cc-contact-row"><span className="label">{t("Fax:")}</span><span className="value">{d.fax}</span></div>}
      {d.email && (
        <div className="cc-contact-row">
          <span className="label">{t("Email:")}</span>
          <span className="value">{d.email.includes('/') ? d.email : <a href={`mailto:${d.email}`}>{d.email}</a>}</span>
        </div>
      )}
    </div>
  );
}

function CenterCard({ c }) {
  const { t } = useTranslation();
  return (
    <div className="cc-center-card">
      {c.role && <div className="cc-center-role">{c.role}</div>}
      <div className="cc-center-name">{t(c.name)}</div>
      {c.address && (
        <div className="cc-contact-row" style={{ marginTop: 8 }}>
          <span className="label">{t("Address:")}</span>
          <span className="value">
            {c.address.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        </div>
      )}
      {c.phone && <div className="cc-contact-row"><span className="label">{t("Phone:")}</span><span className="value">{t(c.phone)}</span></div>}
      {c.fax && <div className="cc-contact-row"><span className="label">{t("Fax:")}</span><span className="value">{c.fax}</span></div>}
      {c.email && (
        <div className="cc-contact-row">
          <span className="label">{t("Email:")}</span>
          <span className="value"><a href={`mailto:${c.email}`}>{c.email}</a></span>
        </div>
      )}
    </div>
  );
}

export default function CorporateClusterDetailPage() {
  const { t } = useTranslation();
  const { clusterId } = useParams();
  const navigate = useNavigate();
  const [cluster, setCluster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/corporate-clusters')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === clusterId);
        if (found) {
          setCluster(found);
        } else {
          setCluster(corporateClusters.find((c) => c.id === clusterId));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching corporate cluster detail:', err);
        setCluster(corporateClusters.find((c) => c.id === clusterId));
        setLoading(false);
      });
  }, [clusterId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#666' }}>
        Loading corporate cluster details...
      </div>
    );
  }

  if (!cluster) {
    return (
      <>
        <div className="page-wrapper">
          <div className="container page-layout" style={{ paddingTop: 40 }}>
            <div style={{ textAlign: 'center', color: '#555', fontSize: 15 }}>
              <p>{t("Cluster not found.")}</p>
              <Link to="/organisation/corporate-clusters" style={{ color: '#0d5c75' }}>
                {t("← Back to Corporate Clusters")}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Organisation', href: '/organisation/about-drdo' },
    { label: 'Corporate Clusters', href: '/organisation/corporate-clusters' },
    { label: cluster.name, href: cluster.href },
  ];

  const dg = cluster.directorGeneral;

  return (
    <>
      <div className="page-wrapper" id="main_content">
        <Breadcrumb crumbs={breadcrumbs} />
        <div className="container page-layout">
          <LeftSidebar items={sidebarItems} />
          <main className="page-main-content" role="main">

            <div className="cluster-detail-header" style={{ background: cluster.color }}>
              <span className="cluster-detail-icon" aria-hidden="true">{cluster.icon}</span>
              <div>
                <h1 className="cluster-detail-title">{t(cluster.name)}</h1>
                <p className="cluster-detail-subtitle">{t("Corporate Cluster · DRDO")}</p>
              </div>
            </div>

            <div className="cluster-content-grid">

              <div className="cluster-info-box cluster-info-box--full">
                <h2 className="cluster-info-box__title">{t("About the Cluster")}</h2>
                <div className="cluster-info-box__body">
                  <p>{t(cluster.description)}</p>
                </div>
              </div>

              {cluster.focus && cluster.focus.length > 0 && (
                <div className="cluster-info-box">
                  <h2 className="cluster-info-box__title">{t("Key Focus Areas")}</h2>
                  <div className="cluster-info-box__body">
                    <ul className="focus-list">
                      {cluster.focus.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {dg && (
                <div className="cluster-info-box">
                  <h2 className="cluster-info-box__title">{t("Director General")}</h2>
                  <div className="cluster-info-box__body" style={{ padding: 0 }}>
                    <div className="cc-contact-card__body">
                      <div className="cc-contact-name">{t(dg.name)}</div>
                      <div className="cc-contact-role">{t(dg.title)}</div>
                      {dg.address && (
                        <div className="cc-contact-row">
                          <span className="label">{t("Address:")}</span>
                          <span className="value">
                            {dg.address.split('\n').map((line, i, arr) => (
                              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                            ))}
                          </span>
                        </div>
                      )}
                      {dg.phone && <div className="cc-contact-row"><span className="label">{t("Phone:")}</span><span className="value">{t(dg.phone)}</span></div>}
                      {dg.fax && <div className="cc-contact-row"><span className="label">{t("Fax:")}</span><span className="value">{dg.fax}</span></div>}
                      {dg.email && (
                        <div className="cc-contact-row">
                          <span className="label">{t("Email:")}</span>
                          <span className="value"><a href={`mailto:${dg.email}`}>{dg.email}</a></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {cluster.externalLink && (
                <div className="cluster-info-box cluster-info-box--full">
                  <h2 className="cluster-info-box__title">{t("Official Website")}</h2>
                  <div className="cluster-info-box__body">
                    <div className="cc-brahmos-notice">
                      <p>
                        BrahMos Aerospace is a joint venture between DRDO (India) and NPO Mashinostroyenia (Russia).
                        For more details about BrahMos, please visit the official website:{' '}
                        <a href={cluster.externalLink} target="_blank" rel="noopener noreferrer">
                          {cluster.externalLink}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {cluster.centers && cluster.centers.length > 0 && (
                <div className="cluster-info-box cluster-info-box--full">
                  <h2 className="cluster-info-box__title">{t("Constituent Centers")}</h2>
                  <div className="cluster-info-box__body">
                    <div className="cc-centers-list">
                      {cluster.centers.map((c, i) => <CenterCard key={i} c={c} />)}
                    </div>
                  </div>
                </div>
              )}

              {cluster.directorates && cluster.directorates.length > 0 && (
                <div className="cluster-info-box cluster-info-box--full">
                  <h2 className="cluster-info-box__title">{t("Directorates")}</h2>
                  <div className="cluster-info-box__body">
                    <div className="cc-directorates-list">
                      {cluster.directorates.map((d, i) => <DirectorateCard key={i} d={d} />)}
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="page-footer-actions">
              <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
                {t('← BACK TO PREVIOUS PAGE')}
              </button>
              <p className="last-updated" style={{ marginLeft: 20 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#888" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
                Last Updated: 01 Jun 2026
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
