import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import "./SocialMediaSection.css";
import twitterImg from "../assets/twitter.png";
import facebookImg from "../assets/facebook.png";
import instagramImg from "../assets/insta.png";

const SERVER = 'http://localhost:4000';

const fallbackPlatformImages = {
  'X': twitterImg,
  'Facebook': facebookImg,
  'Instagram': instagramImg,
};

const fallbackSocials = [
  { platform: 'X', profileUrl: 'https://x.com/DRDO_India', imageUrl: '' },
  { platform: 'Youtube', profileUrl: 'https://www.youtube.com/watch?v=TMWlA81SX78', imageUrl: '' },
  { platform: 'Facebook', profileUrl: 'https://www.facebook.com/DPIDRDO', imageUrl: '' },
  { platform: 'Instagram', profileUrl: 'https://www.instagram.com/dpi.drdo', imageUrl: '' },
];

export default function SocialMediaSection() {
  const { t } = useTranslation();
  const [socials, setSocials] = useState(fallbackSocials);

  useEffect(() => {
    fetch(`${SERVER}/api/home-social-media`)
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSocials(sorted);
        }
      })
      .catch(() => {});
  }, []);

  const getImage = (social) => {
    if (social.imageUrl) {
      return social.imageUrl.startsWith('http') ? social.imageUrl : `${SERVER}${social.imageUrl}`;
    }
    return fallbackPlatformImages[social.platform] || null;
  };

    return (
        <section className="social-media-section">
            <div className="social-container">
                <div className="social-heading">
                    <span className="social-icon">🌐</span>
                    <h2>{t("In Social Media")}</h2>
                </div>

                <div className="social-grid">
                    {socials.map((social, index) => {
                        const img = getImage(social);
                        return (
                            <a
                                key={social._id || index}
                                href={social.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card"
                            >
                                <div className="social-card-header">{t(social.platform)}</div>
                                <div className="social-image-placeholder">
                                    {img && <img src={img} alt={`DRDO ${social.platform}`} />}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}