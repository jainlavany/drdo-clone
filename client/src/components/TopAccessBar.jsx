import { useTranslation } from 'react-i18next';
import './TopAccessBar.css';

export default function TopAccessBar() {
  const { t } = useTranslation();
  return (
    <div className="top-access-bar">
      <div className="tab-skip">
        <a href="#main_content" className="skip-link">{t("Skip to Main Content")}</a>
      </div>
      <div className="access-bar-inner">
        <div className="lang-links">
          <a href="#" className="lang-active">{t("English")}</a>
          <span className="divider">|</span>
          <a href="#">{t("हिंदी")}</a>
        </div>
        <div className="text-size-controls">
          <span className="ts-label">{t("TEXT SIZE")}</span>
          <button id="ts-decrease" title="Decrease text size" aria-label="Decrease text size">{t("A-")}</button>
          <button id="ts-normal" title="Normal text size" aria-label="Normal text size">A</button>
          <button id="ts-increase" title="Increase text size" aria-label="Increase text size">{t("A+")}</button>
        </div>
        <div className="color-scheme-controls">
          <button id="high-contrast" title="High Contrast" aria-label="High Contrast">A</button>
        </div>
        <div className="screen-reader-link">
          <a href="#">{t("Screen Reader Access")}</a>
        </div>
      </div>
    </div>
  );
}
