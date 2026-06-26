import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./PMMessageSection.css";
import modiImg from "../assets/modi.webp";

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

export default function PMMessageSection() {
  const { t } = useTranslation();
  const [data, setData] = useState({
    quote: "Proud of our DRDO scientists for Mission Divyastra, the first flight test of indigenously developed Agni-5 missile with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology.",
    name: "HON'BLE PM SHRI NARENDRA MODI",
    imageUrl: '',
    eventLink: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2013610&reg=3&lang=2',
  });

  useEffect(() => {
    fetch(`${SERVER}/api/pm-message`)
      .then(r => r.json())
      .then(items => {
        if (items && items.length > 0) {
          setData(items[0]);
        }
      })
      .catch(() => {});
  }, []);

  const pmImage = data.imageUrl
    ? (data.imageUrl.startsWith('http') ? data.imageUrl : `${SERVER}${data.imageUrl}`)
    : modiImg;

  return (
    <section className="pm-message-section">
      <div className="pm-message-container">
        <div className="pm-image-wrapper">
          <img
            src={pmImage}
            alt="Prime Minister Narendra Modi"
            className="pm-image"
          />
        </div>

        <div className="pm-content">
          <div className="quote-mark">❝</div>
          <h2 className="pm-quote">
            {t(data.quote)}
          </h2>

          <div className="pm-bottom-row">
            <div className="pm-name">
              {t(data.name)}
            </div>

            <a
              href={data.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-event-btn"
            >
              <span className="event-icon">↗</span>
              {t("VIEW EVENT")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}