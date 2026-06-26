import HeroSlider from "../components/HeroSlider";
import NewsTicker from "../components/NewsTicker";
import PMMessageSection from "../components/PMMessageSection";
import AboutSection from "../components/AboutSection";
import OfferingsSection from "../components/OfferingsSection";
import WhatsNewSection from "../components/WhatsNewSection";
import HomeHighlightsSection from "../components/HomeHighlightsSection";
import SocialMediaSection from "../components/SocialMediaSection";
import MediaShowcaseSection from "../components/MediaShowcaseSection";
import ImportantLinksCarousel from "../components/ImportantLinksCarousel";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <main>

        <HeroSlider />

        <NewsTicker />

        <PMMessageSection />

        <AboutSection />

        <section className="home-offerings-wrapper">
          <div className="home-offerings-grid">
            <div className="home-offerings-left">
              <OfferingsSection />
            </div >

            <div className="home-offerings-right">
              <WhatsNewSection />
            </div>
          </div >
        </section >

        
        < HomeHighlightsSection />

        
        < SocialMediaSection />
        <MediaShowcaseSection />
        <ImportantLinksCarousel />
      </main>


      
      <Footer />
    </>
  );
}