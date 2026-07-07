import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './ProductsPage.css';

function ProductCard({ item }) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);

  // If the image is a local upload path, prepend the backend host
  const imageUrl = item.imageUrl
    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `${window.SERVER_BASE_URL || 'http://localhost:4000'}${item.imageUrl}`)
    : '';

  const renderImageContent = () => {
    if (!imageError && imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={t(item.title)}
          className="prod-img"
          onError={() => setImageError(true)}
        />
      );
    }
    return (
      <div className="prod-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
          fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  };

  return (
    <div className="prod-card" id={`product-${item._id}`}>
      <div className="prod-thumb">
        {item.link ? (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="prod-img-link">
            {renderImageContent()}
          </a>
        ) : (
          renderImageContent()
        )}
      </div>
      <div className="prod-card-body">
        <h3 className="prod-card-title">{t(item.title)}</h3>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/products`)
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(item =>
      (item.title || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <>
      <div className="connect-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <Link to="/offerings/schemes-and-services" className="hero-link">{t("Offerings")}</Link>
              <span> / </span>
            </div>
            <h1>{t("Products")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link to="/offerings/schemes-and-services" className="connect-subnav-link">
            {t("Schemes and Services")}
          </Link>
          <Link to="/offerings/industry-support" className="connect-subnav-link">
            {t("Industry Support")}
          </Link>
          <Link to="/offerings/vacancies" className="connect-subnav-link">
            {t("Vacancies")}
          </Link>
          <Link to="/offerings/competitions-and-awards" className="connect-subnav-link">
            {t("Competitions and Awards")}
          </Link>
          <Link to="/offerings/products" className="connect-subnav-link active">
            {t("Products")}
          </Link>
        </div>

        <div className="prod-page-bg">
          <div className="prod-toolbar-border">
            <div className="prod-toolbar">
              <div className="prod-search-wrap">
                <svg className="prod-search-icon" xmlns="http://www.w3.org/2000/svg"
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="prod-search-input"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  id="product-search"
                />
              </div>
            </div>
          </div>

          <div className="prod-layout">
            <div className="prod-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(item => (
                  <ProductCard key={item._id} item={item} />
                ))
              ) : (
                <div className="prod-no-results">
                  {t("No products found matching your search criteria.")}
                </div>
              )}
            </div>

            <div className="prod-back-row">
              <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
                {t('← BACK TO PREVIOUS PAGE')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
