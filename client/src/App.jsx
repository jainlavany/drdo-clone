import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProtectedRoute from './admin/AdminProtectedRoute';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutDRDOPage from './pages/AboutDRDOPage';
import OurTeamPage from './pages/OurTeamPage';
import TechClustersPage from './pages/TechClustersPage';
import TechClusterDetailPage from './pages/TechClusterDetailPage';
import CorporateClustersPage from './pages/CorporateClustersPage';
import CorporateClusterDetailPage from './pages/CorporateClusterDetailPage';
import ContactUsPage from './pages/ContactUsPage';
import RTIPage from './pages/RTIPage';
import FAQsPage from './pages/FAQsPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import ConferencePage from './pages/ConferencePage';
import ONOSPage from './pages/ONOSPage';
import PublicationsPage from './pages/PublicationsPage';
import AvalancheWarningPage from './pages/AvalancheWarningPage';
import DRDOInNewsPage from './pages/DRDOInNewsPage';
import FormsManualsPage from './pages/FormsManualsPage';
import PressReleasePage from './pages/PressReleasePage';
import ActsPoliciesPage from './pages/ActsPoliciesPage';
import SchemesServicesPage from './pages/SchemesServicesPage';
import IndustrySupportPage from './pages/IndustrySupportPage';
import VacanciesPage from './pages/VacanciesPage';
import CompetitionsAwardsPage from './pages/CompetitionsAwardsPage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import DivaChat from './components/DivaChat';

// Inner layout: hides the public Header on /admin routes
function AppInner() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Intercept all clicks on back buttons site-wide and trigger history back
  useEffect(() => {
    const handleBackClick = (e) => {
      const btn = e.target.closest('button, a');
      if (btn) {
        const classes = Array.from(btn.classList || []);
        const hasBackClass = classes.some(cls => cls.includes('back-btn'));
        const hasBackId = btn.id && btn.id.includes('back-btn');
        const hasBackText = btn.textContent && btn.textContent.toLowerCase().includes('back to previous');
        
        if (hasBackClass || hasBackId || hasBackText) {
          e.preventDefault();
          e.stopPropagation();
          window.history.back();
        }
      }
    };
    document.addEventListener('click', handleBackClick, true);
    return () => document.removeEventListener('click', handleBackClick, true);
  }, []);

  return (
    <>
      {!isAdmin && <Header />}
      <main id={isAdmin ? undefined : 'main-content'}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Organisation */}
          <Route path="/organisation/about-drdo"                  element={<AboutDRDOPage />} />
          <Route path="/organisation/our-team"                    element={<OurTeamPage />} />
          <Route path="/organisation/technology-clusters"         element={<TechClustersPage />} />
          <Route path="/organisation/technology-clusters/:clusterId" element={<TechClusterDetailPage />} />
          <Route path="/organisation/corporate-clusters"          element={<CorporateClustersPage />} />
          <Route path="/organisation/corporate-clusters/:clusterId"  element={<CorporateClusterDetailPage />} />

          {/* Offerings */}
          <Route path="/offerings/schemes-and-services"      element={<SchemesServicesPage />} />
          <Route path="/offerings/industry-support"          element={<IndustrySupportPage />} />
          <Route path="/offerings/vacancies"                 element={<VacanciesPage />} />
          <Route path="/offerings/competitions-and-awards"   element={<CompetitionsAwardsPage />} />
          <Route path="/offerings/products"                  element={<ProductsPage />} />

          {/* Resources */}
          <Route path="/resources/photo-gallery"  element={<PhotoGalleryPage />} />
          <Route path="/resources/video-gallery"  element={<VideoGalleryPage />} />
          <Route path="/resources/conference"     element={<ConferencePage />} />
          <Route path="/resources/onos"           element={<ONOSPage />} />

          {/* Documents */}
          <Route path="/documents/publications"              element={<PublicationsPage />} />
          <Route path="/documents/avalanche-warning-bulletin" element={<AvalancheWarningPage />} />
          <Route path="/documents/drdo-in-news"              element={<DRDOInNewsPage />} />
          <Route path="/documents/form-and-manual"           element={<FormsManualsPage />} />
          <Route path="/documents/press-release"             element={<PressReleasePage />} />
          <Route path="/documents/acts-and-policies"         element={<ActsPoliciesPage />} />

          {/* Connect */}
          <Route path="/connect/contact-us" element={<ContactUsPage />} />
          <Route path="/connect/rti"         element={<RTIPage />} />
          <Route path="/connect/faqs"        element={<FAQsPage />} />

          {/* Search Results */}
          <Route path="/search"              element={<SearchPage />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <DivaChat />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
