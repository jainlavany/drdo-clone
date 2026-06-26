import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./NewsTicker.css";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

const fallbackAnnouncements = [
  {
    text: "Login to e-Jagriti",
    href: "https://cdn.digialm.com/EForms/configuredHtml/1258/96576/login.html",
  },
  {
    text: "RAC invites applications for Scientist posts in the DRDS cadre of DRDO",
    href: "/drdo/en/offerings/vacancies/rac-invites-applications-scientist-posts-drds-cadre-drdo",
  },
  {
    text: "CENSUS 2027 - Self Enumeration",
    href: "https://se.census.gov.in",
  },
  {
    text: "Join DRDO Campaign",
    href: "https://drdo.gov.in/candidate21/index.php",
  },
];

export default function NewsTicker() {
  const { t } = useTranslation();
  const [paused, setPaused] = useState(false);
  const [announcements, setAnnouncements] = useState(fallbackAnnouncements);

  useEffect(() => {
    fetch(`${SERVER}/api/news-ticker`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const active = data
            .filter(d => d.active !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(d => ({ text: d.text, href: d.link || '#' }));
          if (active.length > 0) setAnnouncements(active);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="announcement-section">
      <div
        className="news-ticker-bar"
        role="region"
        aria-label={t("Announcements")}
      >
        <div className="ticker-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <span>{t("Announcements")}</span>
        </div>

        <div className="ticker-track-wrapper">
          <div className={`ticker-track ${paused ? "paused" : ""}`}>
            {[...announcements, ...announcements].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="ticker-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(item.text)}
                <span className="ticker-sep">|</span>
              </a>
            ))}
          </div>
        </div>

        <button
          className="ticker-toggle"
          onClick={() => setPaused(!paused)}
          title="Play/Pause Announcements"
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
    </section>
  );
}