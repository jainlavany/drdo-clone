import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiLogIn, FiSearch, FiX, FiLink } from 'react-icons/fi';
import { TbAccessible, TbLanguage, TbColorFilter, TbContrast, TbPhotoOff, TbLetterSpacing, TbLineHeight } from 'react-icons/tb';
import { MdOutlineDarkMode, MdInvertColors } from 'react-icons/md';
import './Header.css';

import drdoLogo from '../assets/logo.png';
import emblemImg from '../assets/emblem.svg';

const navItems = [
  {
    label: 'Home',
    href: '/',
    children: [],
  },
  {
    label: 'Organisation',
    href: '/organisation/about-drdo',
    children: [
      { label: 'About DRDO', href: '/organisation/about-drdo' },
      { label: 'Our Team', href: '/organisation/our-team' },
      { label: 'Technology Clusters', href: '/organisation/technology-clusters' },
      { label: 'Corporate Clusters', href: '/organisation/corporate-clusters' },
    ],
  },
  {
    label: 'Offerings',
    href: '#',
    children: [
      { label: 'Schemes and Services', href: '/offerings/schemes-and-services' },
      { label: 'Industry Support', href: '/offerings/industry-support' },
      { label: 'Vacancies', href: '/offerings/vacancies' },
      { label: 'Competitions and Awards', href: '/offerings/competitions-and-awards' },
      { label: 'Products', href: '/offerings/products' },
    ],
  },
  {
    label: 'Documents',
    href: '/documents/publications',
    children: [
      { label: 'Publications', href: '/documents/publications' },
      { label: 'Avalanche Warning Bulletin', href: '/documents/avalanche-warning-bulletin' },
      { label: 'DRDO in News', href: '/documents/drdo-in-news' },
      { label: 'Forms and Manuals', href: '/documents/form-and-manual' },
      { label: 'Press Release', href: '/documents/press-release' },
      { label: 'Acts and Policies', href: '/documents/acts-and-policies' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/photo-gallery',
    children: [
      { label: 'Photos', href: '/resources/photo-gallery' },
      { label: 'Videos', href: '/resources/video-gallery' },
      { label: 'Conference', href: '/resources/conference' },
      { label: 'ONOS', href: '/resources/onos' },
    ],
  },
  {
    label: 'Connect',
    href: '/connect/contact-us',
    children: [
      { label: 'Contact Us', href: '/connect/contact-us' },
      { label: 'RTI', href: '/connect/rti' },
      { label: 'FAQs', href: '/connect/faqs' },
    ],
  },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Accessibility State with localStorage persistence
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const saved = localStorage.getItem('drdo_accessibility');
      return saved ? JSON.parse(saved) : {
        saturation: false,
        lightContrast: false,
        darkMode: false,
        invert: false,
        decreaseText: false,
        increaseText: false,
        highlightLinks: false,
        hideImages: false,
        textSpacing: false,
        lineHeight: false
      };
    } catch {
      return {
        saturation: false,
        lightContrast: false,
        darkMode: false,
        invert: false,
        decreaseText: false,
        increaseText: false,
        highlightLinks: false,
        hideImages: false,
        textSpacing: false,
        lineHeight: false
      };
    }
  });

  // Apply accessibility classes to document body
  useEffect(() => {
    localStorage.setItem('drdo_accessibility', JSON.stringify(accessibility));

    const body = document.body;
    body.classList.toggle('accessibility-grayscale', accessibility.saturation);
    body.classList.toggle('accessibility-light-contrast', accessibility.lightContrast);
    body.classList.toggle('accessibility-dark-mode', accessibility.darkMode);
    body.classList.toggle('accessibility-invert', accessibility.invert);
    body.classList.toggle('accessibility-font-small', accessibility.decreaseText);
    body.classList.toggle('accessibility-font-large', accessibility.increaseText);
    body.classList.toggle('accessibility-highlight-links', accessibility.highlightLinks);
    body.classList.toggle('accessibility-hide-images', accessibility.hideImages);
    body.classList.toggle('accessibility-text-spacing', accessibility.textSpacing);
    body.classList.toggle('accessibility-line-height', accessibility.lineHeight);
  }, [accessibility]);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleOption = (option) => {
    setAccessibility((prev) => {
      const next = { ...prev, [option]: !prev[option] };

      // Mutual exclusions
      if (option === 'darkMode' && next.darkMode) {
        next.lightContrast = false;
      }
      if (option === 'lightContrast' && next.lightContrast) {
        next.darkMode = false;
      }
      if (option === 'decreaseText' && next.decreaseText) {
        next.increaseText = false;
      }
      if (option === 'increaseText' && next.increaseText) {
        next.decreaseText = false;
      }

      return next;
    });
  };

  const handleReset = () => {
    setAccessibility({
      saturation: false,
      lightContrast: false,
      darkMode: false,
      invert: false,
      decreaseText: false,
      increaseText: false,
      highlightLinks: false,
      hideImages: false,
      textSpacing: false,
      lineHeight: false
    });
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="site-header">
      <div className="header-logo-row">
        <div className="header-logo-inner">
          <Link to="/" className="site-logo">
            <img
              src={emblemImg}
              alt="State Emblem of India"
              className="emblem-img"
            />
            <div className="logo-text">
              <span className="logo-gov">
                {t('Government of India')}
              </span>
              <span className="logo-org">
                {t('Defence Research and Development Organisation')}
              </span>
            </div>
          </Link>

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder={t('Search...')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label={t('Search DRDO website')}
            />
            <button type="submit" aria-label={t('Search')}>
              <FiSearch />
            </button>
          </form>

          <div className="header-right">
            <img
              src={drdoLogo}
              alt="DRDO Logo"
              className="drdo-logo-img"
            />
            <div className="header-actions">
              <button
                className="action-btn"
                title={t('Skip to main content')}
                onClick={() =>
                  document
                    .getElementById('main-content')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    })
                }
              >
                <FiLogIn />
              </button>

              <button
                className="action-btn lang-btn"
                title={i18n.language === 'en' ? t('Hindi version') : t('English version')}
                onClick={toggleLanguage}
              >
                <TbLanguage />
                <span className="lang-btn-text">
                  {i18n.language === 'en' ? 'हिन्दी' : 'English'}
                </span>
              </button>

              <button
                className="action-btn"
                title={t('Accessibility controls')}
                onClick={() => setAccessibilityOpen(true)}
                aria-expanded={accessibilityOpen}
              >
                <TbAccessible />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Drawer */}
      <div className={`accessibility-drawer ${accessibilityOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>
            <TbAccessible className="drawer-header-icon" />
            {t('Accessibility Controls')}
          </h3>
          <button
            type="button"
            className="close-drawer-btn"
            onClick={() => setAccessibilityOpen(false)}
            aria-label="Close accessibility controls"
          >
            <FiX />
          </button>
        </div>

        <div className="drawer-subheader">
          <span>{t('Accessibility Options')}</span>
          <button type="button" className="reset-btn" onClick={handleReset}>
            {t('Reset')}
          </button>
        </div>

        <div className="drawer-grid">
          {/* Card 1: SATURATION */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.saturation ? 'active' : ''}`}
            onClick={() => toggleOption('saturation')}
          >
            <TbColorFilter className="card-icon" />
            <span className="card-label">{t('Saturation')}</span>
          </button>

          {/* Card 2: LIGHT CONTRAST */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.lightContrast ? 'active' : ''}`}
            onClick={() => toggleOption('lightContrast')}
          >
            <TbContrast className="card-icon" />
            <span className="card-label">{t('Light Contrast')}</span>
          </button>

          {/* Card 3: DARK MODE */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.darkMode ? 'active' : ''}`}
            onClick={() => toggleOption('darkMode')}
          >
            <MdOutlineDarkMode className="card-icon" />
            <span className="card-label">{t('Dark Mode')}</span>
          </button>

          {/* Card 4: INVERT */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.invert ? 'active' : ''}`}
            onClick={() => toggleOption('invert')}
          >
            <MdInvertColors className="card-icon" />
            <span className="card-label">{t('Invert')}</span>
          </button>

          {/* Card 5: DECREASE TEXT */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.decreaseText ? 'active' : ''}`}
            onClick={() => toggleOption('decreaseText')}
          >
            <span className="card-text-icon">A-</span>
            <span className="card-label">{t('Decrease Text')}</span>
          </button>

          {/* Card 6: INCREASE TEXT */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.increaseText ? 'active' : ''}`}
            onClick={() => toggleOption('increaseText')}
          >
            <span className="card-text-icon">A+</span>
            <span className="card-label">{t('Increase Text')}</span>
          </button>

          {/* Card 7: HIGHLIGHT LINKS */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.highlightLinks ? 'active' : ''}`}
            onClick={() => toggleOption('highlightLinks')}
          >
            <FiLink className="card-icon" />
            <span className="card-label">{t('Highlight Links')}</span>
          </button>

          {/* Card 8: HIDE IMAGES */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.hideImages ? 'active' : ''}`}
            onClick={() => toggleOption('hideImages')}
          >
            <TbPhotoOff className="card-icon" />
            <span className="card-label">{t('Hide Images')}</span>
          </button>

          {/* Card 9: TEXT SPACING */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.textSpacing ? 'active' : ''}`}
            onClick={() => toggleOption('textSpacing')}
          >
            <TbLetterSpacing className="card-icon" />
            <span className="card-label">{t('Text Spacing')}</span>
          </button>

          {/* Card 10: LINE HEIGHT */}
          <button
            type="button"
            className={`accessibility-card ${accessibility.lineHeight ? 'active' : ''}`}
            onClick={() => toggleOption('lineHeight')}
          >
            <TbLineHeight className="card-icon" />
            <span className="card-label">{t('Line Height')}</span>
          </button>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {accessibilityOpen && (
        <div
          className="accessibility-overlay"
          onClick={() => setAccessibilityOpen(false)}
        />
      )}

      <nav className="main-nav">
        <div className="nav-inner">
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav-list ${mobileOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item) => (
              <li
                key={t(item.label)}
                className={`nav-item ${item.children.length ? 'has-dropdown' : ''
                  } ${openMenu === item.label ? 'open' : ''
                  }`}
                onMouseEnter={() =>
                  item.children.length &&
                  setOpenMenu(item.label)
                }
                onMouseLeave={() => setOpenMenu(null)}
              >
                {item.children.length > 0 ? (
                  <button
                    type="button"
                    className="nav-link nav-button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === item.label
                          ? null
                          : item.label
                      )
                    }
                    aria-expanded={openMenu === item.label}
                  >
                    {t(item.label)}
                    <FiChevronDown className="nav-arrow" />
                  </button>
                ) : (
                  <Link to={item.href} className="nav-link">
                    {t(item.label)}
                  </Link>
                )}

                {item.children.length > 0 && (
                  <ul className="dropdown-menu">
                    {item.children.map((child) => (
                      <li key={t(child.label)}>
                        <Link
                          to={child.href}
                          onClick={() => {
                            setOpenMenu(null);
                            setMobileOpen(false);
                          }}
                        >
                          {t(child.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
