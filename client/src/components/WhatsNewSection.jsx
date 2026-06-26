import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import "./WhatsNewSection.css";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackItems = [
  {
    text: "Question Challenge ( Questions/ Questions Paper Responses Keys / Option Keys ) portal for Tier-II CBT under CEPTAM-11 Advt.",
    link: "https://cdn.digialm.com/EForms/configuredHtml/1258/96576/login.html"
  },
  {
    text: "Industry Interaction Group (IIG)",
    link: "https://drdo.gov.in/drdo/en/announcement/industry-interaction-group-iig"
  },
  {
    text: "RAC invites applications for Scientist posts in the DRDS cadre of DRDO",
    link: "https://drdo.gov.in/drdo/en/offerings/vacancies/rac-invites-applications-scientist-posts-drds-cadre-drdo"
  },
];

export default function WhatsNewSection() {
  const { t } = useTranslation();
  const [whatsNewItems, setWhatsNewItems] = useState(fallbackItems);

  useEffect(() => {
    fetch(`${SERVER}/api/whats-new`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const sorted = data
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(d => ({ text: d.text, link: d.link || '#' }));
          setWhatsNewItems(sorted);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="whats-new-section">
      <h2 className="whats-new-heading">
        {t("What's New")}
      </h2>

      <div className="whats-new-box">
        <div className="whats-new-scroll">
          {whatsNewItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-item"
            >
              <span>{t(item.text)}</span>
              <span className="arrow">›</span>
            </a>
          ))}
        </div>
      </div>

      <div className="whats-new-footer">
        <a
          href="https://www.drdo.gov.in/drdo/what-is-news"
          target="_blank"
          rel="noopener noreferrer"
          className="whats-new-btn"
        >
          VIEW ALL
          <span>›</span>
        </a>
      </div>
    </section>
  )
}