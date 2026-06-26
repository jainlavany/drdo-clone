import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import LeftSidebar from '../components/LeftSidebar';
import Footer from '../components/Footer';
import { techClusters } from './TechClustersPage';
import './TechClustersPage.css';

const sidebarItems = [
  { label: 'About DRDO', href: '/organisation/about-drdo' },
  { label: 'Our Team', href: '/organisation/our-team' },
  { label: 'Technology Clusters', href: '/organisation/technology-clusters' },
  { label: 'Corporate Clusters', href: '/organisation/corporate-clusters' },
];

/* Full lab name mapping */
const labFullNames = {
  ADE: 'Aeronautical Development Establishment',
  CABS: 'Centre for Airborne Systems',
  CEMILAC: 'Centre for Military Airworthiness & Certification',
  GTRE: 'Gas Turbine Research Establishment',
  ARDE: 'Armament Research & Development Establishment',
  CFEES: 'Centre for Fire, Explosive & Environment Safety',
  CVRDE: 'Combat Vehicles Research & Development Establishment',
  HEMRL: 'High Energy Materials Research Laboratory',
  DARE: 'Defence Avionics Research Establishment',
  DEAL: 'Defence Electronics Applications Laboratory',
  DLRL: 'Defence Laboratory R&L',
  IRDE: 'Instruments Research & Development Establishment',
  LASTEC: 'Laser Science & Technology Centre',
  LRDE: 'Electronics & Radar Development Establishment',
  CAIR: 'Centre for Artificial Intelligence & Robotics',
  CEERI: 'Central Electronics Engineering Research Institute',
  CHESS: 'Centre for High Energy Systems & Sciences',
  SAG: 'Scientific Analysis Group',
  ADRDE: 'Aerial Delivery Research & Development Establishment',
  ASL: 'Advanced Systems Laboratory',
  DRDL: 'Defence Research & Development Laboratory',
  RCI: 'Research Centre Imarat',
  SSPD: 'Solid State Physics Laboratory',
  NMRL: 'Naval Materials Research Laboratory',
  NPOL: 'Naval Physical & Oceanographic Laboratory',
  NSTL: 'Naval Science & Technological Laboratory',
  DMSRDE: 'Defence Materials & Stores R&D Establishment',
  DTRL: 'Defence Terrain Research Laboratory',
  DFRL: 'Defence Food Research Laboratory',
  DIBER: 'Defence Institute of Bio-Energy Research',
  DIPAS: 'Defence Institute of Physiology & Allied Sciences',
  DIPR: 'Defence Institute of Psychological Research',
  DRDE: 'Defence Research & Development Establishment',
  INMAS: 'Institute of Nuclear Medicine & Allied Sciences',
  'DYSL-QT': 'DRDO Young Scientist Laboratory – Quantum Technologies',
  'TBR&L': 'Terminal Ballistics Research Laboratory',
  'NAL-DRDO': 'National Aerospace Laboratories (DRDO Wing)',
};

export default function TechClusterDetailPage() {
  const { clusterId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cluster, setCluster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/tech-clusters')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === clusterId);
        if (found) {
          setCluster(found);
        } else {
          setCluster(techClusters.find(c => c.id === clusterId));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tech cluster detail:', err);
        setCluster(techClusters.find(c => c.id === clusterId));
        setLoading(false);
      });
  }, [clusterId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#666' }}>
        Loading technology cluster details...
      </div>
    );
  }

  if (!cluster) {
    return (
      <>
        <div className="page-wrapper">
          <div className="container page-layout" style={{ paddingTop: 40 }}>
            <div style={{ textAlign: 'center', color: '#555', fontSize: 15 }}>
              <p>Cluster not found.</p>
              <Link to="/organisation/technology-clusters" style={{ color: '#0d5c75' }}>
                ← Back to Technology Clusters
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
    { label: 'Technology Clusters', href: '/organisation/technology-clusters' },
    { label: cluster.name, href: cluster.href },
  ];

  return (
    <>
      <div className="page-wrapper" id="main_content">
        <Breadcrumb crumbs={breadcrumbs} />
        <div className="container page-layout">
          <LeftSidebar items={sidebarItems} />
          <main className="page-main-content" role="main">

            {/* Coloured header block */}
            <div className="cluster-detail-header" style={{ background: cluster.color }}>
              <span className="cluster-detail-icon" aria-hidden="true">{cluster.icon}</span>
              <div>
                <h1 className="cluster-detail-title">{cluster.name}</h1>
                <p className="cluster-detail-subtitle">Technology Cluster · DRDO</p>
              </div>
            </div>

            <div className="cluster-content-grid">

              {/* About the Cluster */}
              <div className="cluster-info-box cluster-info-box--full">
                <h2 className="cluster-info-box__title">About the Cluster</h2>
                <div className="cluster-info-box__body">
                  <p>{cluster.description}</p>
                </div>
              </div>

              {/* Focus Areas */}
              {cluster.focus && cluster.focus.length > 0 && (
                <div className="cluster-info-box">
                  <h2 className="cluster-info-box__title">Key Focus Areas</h2>
                  <div className="cluster-info-box__body">
                    <ul className="focus-list">
                      {cluster.focus.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              {/* Labs */}
              {cluster.labs && cluster.labs.length > 0 && (
                <div className="cluster-info-box">
                  <h2 className="cluster-info-box__title">Constituent Laboratories</h2>
                  <div className="cluster-info-box__body">
                    <div className="labs-grid">
                      {cluster.labs.map(lab => (
                        <div key={lab} className="lab-card">
                          <span className="lab-card__abbr">{lab}</span>
                          <span className="lab-card__name">{labFullNames[lab] || lab}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Back to clusters */}
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
