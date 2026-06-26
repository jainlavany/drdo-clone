import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import drdoBhawan from '../assets/drdoBhawan.png';
import './AboutDRDOPage.css';

export default function AboutDRDOPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="connect-page-wrapper">

        <div className="connect-hero">
          <div className="connect-hero-content">
            <div className="connect-breadcrumb-mini">
              <Link to="/" className="hero-link">
                {t("Home")}
              </Link>
              <span> / </span>
              <Link to="/organisation/about-drdo" className="hero-link">
                {t("Organisation")}
              </Link>
              <span> / </span>
            </div>
            <h1>{t("About DRDO")}</h1>
          </div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
          <div className="hero-circle"></div>
        </div>

        <div className="connect-pill-nav">
          <Link
            to="/organisation/about-drdo"
            className="connect-subnav-link active"
          >
            {t("About DRDO")}
          </Link>

          <Link
            to="/organisation/our-team"
            className="connect-subnav-link"
          >
            {t("Our Team")}
          </Link>

          <Link
            to="/organisation/technology-clusters"
            className="connect-subnav-link"
          >
            {t("Technology Clusters")}
          </Link>

          <Link
            to="/organisation/corporate-clusters"
            className="connect-subnav-link"
          >
            {t("Corporate Clusters")}
          </Link>
        </div>


        <div className="about-content-container">

          <div className="about-main-section">


            <div className="about-image-box">

              <img
                src={drdoBhawan}
                alt="DRDO Bhawan"
                className="about-drdo-image"
              />

              <div className="about-vm-content">

                <h3>{t("Vision")}</h3>

                <p>
                  {t("Empowering the nation with state-of-the-art indigenous Defence and Security technologies and systems.")}
                </p>

                <h3>{t("Mission")}</h3>

                <ul>

                  <li>
                    {t("Design & develop state of the art sensors, weapon systems, platforms & allied equipment in defense & security domains of land, air, sea, space & cyber.")}
                  </li>

                  <li>
                    {t("Facilitate production and induction of Systems & technologies developed through Department's R&D ecosystem.")}
                  </li>

                  <li>
                    {t("Provide technological solutions to the Services to enhance combat effectiveness.")}
                  </li>

                  <li>
                    {t("Nurture & Strengthen Defence R&D capability in Indian industry Science & Technology institutions & academia through collaboration.")}
                  </li>

                  <li>
                    {t("Development of infrastructure and test & evaluation facilities; design certification; skill development and strengthen human resources.")}
                  </li>

                </ul>

              </div>

            </div>

            {/* Right Side */}
            <div className="about-text-box">

              <p>
                {t("Defence Research & Development Organisation (DRDO) under the Department of Defence Research & Development (DD R&D) of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services.")}
              </p>

              <p>
                {t("DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.")}
              </p>

              <p>
                {t("\"Balasya Mulam Vigyanam\"—the source of strength is science-drives the nation in peace and war. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of military technologies.")}
              </p>

              <p>
                {t("DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Army and the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10 establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories, achievements and stature.")}
              </p>

              <p>
                {t("Today, DRDO is a network of around 41 laboratories and 05 DRDO Young Scientist Laboratories (DYSLs) which are deeply engaged in developing defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems, instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems and agriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are on hand and significant achievements have already been made in several such technologies.")}
              </p>

              <div className="about-update-date">
                {t("Last Update: 01 Jun 2026")}
              </div>

            </div>

          </div>

          <div className="connect-back-row">
            <button onClick={() => navigate(-1)} className="connect-back-btn" id="onos-back-btn">
              {t('← BACK TO PREVIOUS PAGE')}
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}