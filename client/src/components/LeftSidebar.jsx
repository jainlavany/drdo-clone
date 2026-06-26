import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LeftSidebar.css';

export default function LeftSidebar({ items, section = 'Organisation' }) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside className="left-sidebar" aria-label="Section Navigation">
      <div className="sidebar-section-title">{t(section)}</div>
      <ul className="sidebar-nav-list">
        {items.map((item, i) => {
          const isActive = location.pathname === item.href;
          return (
            <li key={i} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
              <Link
                to={item.href}
                className="sidebar-nav-link"
                id={`sidebar-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="sidebar-arrow" aria-hidden="true">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                </svg>
                {t(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
