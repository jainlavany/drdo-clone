import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Breadcrumb.css';

export default function Breadcrumb({ crumbs }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="breadcrumb-bar">
      <div className="container breadcrumb-inner">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          id="back-to-previous-btn"
          aria-label={t("BACK TO PREVIOUS PAGE")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          {t("BACK TO PREVIOUS PAGE")}
        </button>

        <nav aria-label="Breadcrumb" className="breadcrumb-trail">
          <ol className="breadcrumb-list">
            {crumbs.map((crumb, i) => (
              <li key={i} className="breadcrumb-item">
                {i < crumbs.length - 1 ? (
                  <>
                    <Link to={crumb.href} className="breadcrumb-link">{t(crumb.label)}</Link>
                    <span className="breadcrumb-sep" aria-hidden="true">›</span>
                  </>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">{t(crumb.label)}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
