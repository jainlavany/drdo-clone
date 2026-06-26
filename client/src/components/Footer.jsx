import './Footer.css';
import footer1 from '../assets/footer1.png';
import footer2 from '../assets/footer2.png';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';

const usefulLinks = [
  { label: 'Archives', href: 'https://drdo.gov.in/drdo/en/archive' },
  { label: 'Website Policy', href: 'https://drdo.gov.in/drdo/en/website-policy' },
  { label: 'Contact Us', href: '/connect/contact-us' },
  { label: 'Sitemap', href: 'https://drdo.gov.in/drdo/en/sitemap' },
  { label: 'Help', href: 'https://drdo.gov.in/drdo/en/help' },
  { label: 'More Useful Links', href: 'https://drdo.gov.in/drdo/en/useful-links' },
];

export default function Footer() {
  const { t } = useTranslation();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-top-inner">
          <div className="footer-links-block">
            <h3 className="footer-links-title">{t('USEFUL LINKS')}</h3>
            <ul className="footer-links-list">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href}>
                    <span className="footer-arrow">›</span>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social-block">
            <h3 className="footer-links-title">
              {t('SUBSCRIBE FOR UPDATES')}
            </h3>

            <div className="footer-social-icons">
              <a
                href="https://www.facebook.com/DPIDRDO"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover focus"
                data-bs-placement="top"
                data-bs-title="External site that Opens In new tab"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com/DRDO_India"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover focus"
                data-bs-placement="top"
                title="External site that Opens In new tab"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.instagram.com/drdo_india"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover focus"
                data-bs-placement="top"
                title="External site that Opens In new tab"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.youtube.com/drdo"
                target="_blank"
                rel=" noopenor noreferrer"
                className="social-icon-link"
                data-bs-toggle="tooltip"
                data-bs-trigger="hover focus"
                data-bs-placement="top"
                title="External site that Opens In new tab"
              >
                <FaYoutube />
              </a>
            </div>

            <div className="gov-logos">
              <a
                href="https://www.mygov.in/"
                target="_blank"
                rel="noopener noreferrer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="External site that Opens In new tab"
              >
                <img
                  src={footer1}
                  alt="MyGov"
                />
              </a>

              <a
                href="https://www.india.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="External site that Opens In new tab"
              >
                <img
                  src={footer2}
                  alt="India Gov"
                />
              </a>
            </div>

            <div className="footer-stats">
              <p>{t('Visitors: 3,490,258')}</p>
              <p>{t('Last Updated: 19/06/2026')}</p>
            </div>
          </div>
        </div>

        <div className="footer-copy-row">
          <p>
            {t('This Website belongs to, ')}<strong>{t("LAVANY JAIN")} </strong>
          </p>
        </div>
      </div>
    </footer>
  );
}