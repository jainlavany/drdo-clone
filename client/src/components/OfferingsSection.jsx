import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './OfferingsSection.css';
import { FaHandsHelping } from 'react-icons/fa';

const SERVER = 'http://localhost:4000';

const tabs = [
  { id: 'schemes', label: 'Schemes' },
  { id: 'vacancies', label: 'Vacancies' },
  { id: 'messageboard', label: 'Message Board' },
  { id: 'events', label: 'Events' },
  { id: 'keyproducts', label: 'Key Products' },
  { id: 'productsexport', label: 'Products for Export' },
];

const viewAllLinks = {
  schemes: 'https://drdo.gov.in/drdo/offerings/schemes-and-services',
  vacancies: 'https://drdo.gov.in/drdo/offerings/vacancies',
  messageboard: 'https://drdo.gov.in/drdo/message-board',
  events: 'https://drdo.gov.in/drdo/events-archives',
  keyproducts: 'https://drdo.gov.in/drdo/offerings/products?field_product_type_target_id=7',
  productsexport: 'https://drdo.gov.in/drdo/offerings/products?field_product_type_target_id=8',
};

// Fallback static data
const fallbackData = {
  schemes: [
    { title: 'ToT', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/tot' },
    { title: 'DTTC', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dttc' },
    { title: 'DIA-CoEs', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dia-coes1' },
    { title: 'TDF Projects', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/tdf-projects' },
  ],
  vacancies: [],
  messageboard: [],
  events: [],
  keyproducts: [],
  productsexport: [],
};

function RowList({ data }) {
  const { t } = useTranslation();
  return (
    <div className="scheme-list">
      {data.map((item, index) => (
        <a
          href={item.link}
          key={index}
          className="scheme-row"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t(item.title)}</span>
          <span className="scheme-arrow">›</span>
        </a>
      ))}
    </div>
  );
}

export default function OfferingsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('schemes');
  const [offeringsData, setOfferingsData] = useState(fallbackData);

  useEffect(() => {
    fetch(`${SERVER}/api/home-offerings`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const grouped = {};
          tabs.forEach(tab => { grouped[tab.id] = []; });
          data
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .forEach(item => {
              if (grouped[item.tab]) {
                grouped[item.tab].push({ title: item.title, link: item.link || '#' });
              }
            });
          setOfferingsData(grouped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="offerings-section">
      <div className="offerings-title">
        <FaHandsHelping className="offerings-icon" />
        <h2>{t("Key Offerings")}</h2>
      </div>

      <div className="offerings-box">
        <div className="offerings-tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`offering-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        <div className="offering-tab-content">
          <RowList data={offeringsData[activeTab] || []} />
        </div>
      </div>

      <div className="offerings-footer">
        <a
          href={viewAllLinks[activeTab]}
          className="view-all-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("VIEW ALL")}
        </a>
      </div>
    </section>
  );
}