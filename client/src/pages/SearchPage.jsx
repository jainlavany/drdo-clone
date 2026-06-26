import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import './SearchPage.css';

export default function SearchPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchText, setSearchText] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchText(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${window.SERVER_BASE_URL || 'http://localhost:4000'}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      setSearchParams({ q: searchText.trim() });
    }
  };

  return (
    <>
      <div className="search-page-wrapper">
        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">{t("Home")}</Link>
              <span> / </span>
              <span>{t("Search")}</span>
            </div>
            <h1>{t("Search Results")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="search-container">
          <form className="search-page-input-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={t("Search for pages, documents, products...")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">{t("Search")}</button>
          </form>

          <div className="search-status-bar">
            {loading && <p className="search-msg">{t("Searching...")}</p>}
            {error && <p className="search-error">{t("Error:")} {error}</p>}
            {!loading && !error && query && (
              <p className="search-msg">
                {t("Showing")} <strong>{results.length}</strong> {t("results for")} "<strong>{query}</strong>"
              </p>
            )}
          </div>

          <div className="search-results-list">
            {!loading && results.length === 0 && query && (
              <div className="no-results-card">
                <h3>{t("No Results Found")}</h3>
                <p>{t("We couldn't find anything matching your search. Please check the spelling or try different keywords.")}</p>
              </div>
            )}

            {!loading && results.map((res, index) => (
              <div key={index} className="search-result-item">
                <span className="result-badge">{res.type}</span>
                <h3 className="result-title">
                  <Link to={res.link}>{res.title}</Link>
                </h3>
                {res.snippet && <p className="result-snippet">{res.snippet}</p>}
                {res.date && <span className="result-date">📅 {res.date}</span>}
                {res.category && <span className="result-category">📁 {res.category}</span>}
                <div className="result-url">
                  <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
                    {t('← BACK TO PREVIOUS PAGE')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
