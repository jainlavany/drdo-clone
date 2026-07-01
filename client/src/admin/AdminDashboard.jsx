import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, verifyToken, getStats,
  DrdoInNewsApi, PressReleaseApi, ActsPoliciesApi, VacanciesApi,
  HeroSlidesApi, NewsTickerApi, PhotosApi, PublicationsApi, FaqsApi, ImportantLinksApi,
  AvalancheApi, FormsManualsApi,
  SchemeServiceApi, IndustrySupportApi, CompetitionsAwardsApi, ProductsApi,
  VideosApi, ConferencesApi, ONOSPublisherApi,
  PMMessageApi, HomeMinisterApi, HomeOfferingApi, WhatsNewApi,
  HomeDocumentApi, HomePersonaApi, HomeSocialMediaApi, HomeMediaSlideApi, HomeBottomLinkApi,
  TeamMembersApi, ContactsApi, RtiStatsApi, RtiDocumentsApi, OnosContactApi,
} from './api';
import Section, { Toast } from './Section';
import { AboutDrdoCMS, TechClustersCMS, CorporateClustersCMS, OnosCMS } from './OrganisationCMS';
import {
  NEWS_CFG, PRESS_CFG, ACTS_CFG, VAC_CFG, HERO_CFG,
  TICKER_CFG, PHOTO_CFG, PUB_CFG, FAQ_CFG, LINKS_CFG,
  AVALANCHE_CFG, FM_CFG,
  SCHEME_CFG, IND_SUPPORT_CFG, AWARD_CFG, PRODUCT_CFG,
  VIDEO_CFG, CONFERENCE_CFG, ONOS_CFG,
  PM_MSG_CFG, MINISTER_CFG, HOME_OFFERING_CFG, WHATS_NEW_CFG,
  HOME_DOC_CFG, HOME_PERSONA_CFG, HOME_SOCIAL_CFG, HOME_MEDIA_SLIDE_CFG, HOME_BOTTOM_LINK_CFG,
  TEAM_CFG, CONTACT_CFG, RTI_STATS_CFG, RTI_DOCS_CFG, ONOS_CONTACT_CFG,
} from './sectionConfigs';
import './AdminDashboard.css';

// ── Nav items ─────────────────────────────────────────────────────────────────
// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',           icon: '📊', label: 'Overview',                group: 'General' },
  { id: 'about-drdo',         icon: '📝', label: 'About DRDO',              group: 'Organisation' },
  { id: 'tech-clusters',      icon: '✈️', label: 'Tech Clusters',            group: 'Organisation' },
  { id: 'corporate-clusters', icon: '🏢', label: 'Corporate Clusters',       group: 'Organisation' },
  { id: 'team-members',       icon: '👥', label: 'Our Team Members',        group: 'Organisation' },
  { id: 'hero-slides',        icon: '🖼️', label: 'Hero Slides',             group: 'Home Page' },
  { id: 'news-ticker',        icon: '📡', label: 'News Ticker',             group: 'Home Page' },
  { id: 'pm-message',         icon: '💬', label: 'PM Message',              group: 'Home Page' },
  { id: 'home-ministers',     icon: '👔', label: 'Ministers',                group: 'Home Page' },
  { id: 'home-offerings',    icon: '📋', label: 'Key Offerings',            group: 'Home Page' },
  { id: 'whats-new',         icon: '🆕', label: "What's New",              group: 'Home Page' },
  { id: 'home-documents',    icon: '📄', label: 'Recent Documents',        group: 'Home Page' },
  { id: 'home-personas',     icon: '👥', label: 'User Personas',           group: 'Home Page' },
  { id: 'home-social-media', icon: '🌐', label: 'Social Media',            group: 'Home Page' },
  { id: 'home-media-slides', icon: '🎞️', label: 'Media Showcase',          group: 'Home Page' },
  { id: 'home-bottom-links', icon: '🔗', label: 'Bottom Links Carousel',   group: 'Home Page' },
  { id: 'publications',       icon: '📚', label: 'Publications',            group: 'Documents' },
  { id: 'avalanche-bulletin', icon: '🏔️', label: 'Avalanche Warning Bulletin', group: 'Documents' },
  { id: 'drdo-in-news',       icon: '📰', label: 'DRDO in News',            group: 'Documents' },
  { id: 'forms-manuals',      icon: '📄', label: 'Forms & Manuals',         group: 'Documents' },
  { id: 'press-release',      icon: '📢', label: 'Press Release',           group: 'Documents' },
  { id: 'acts-policies',      icon: '📋', label: 'Acts & Policies',         group: 'Documents' },
  { id: 'schemes-services',   icon: '🛠️', label: 'Schemes & Services',       group: 'Offerings' },
  { id: 'industry-support',   icon: '🏭', label: 'Industry Support',        group: 'Offerings' },
  { id: 'vacancies',          icon: '💼', label: 'Vacancies',               group: 'Offerings' },
  { id: 'competitions-awards',icon: '🏆', label: 'Competitions & Awards',   group: 'Offerings' },
  { id: 'products',           icon: '🚀', label: 'Products',                group: 'Offerings' },
  { id: 'photos',             icon: '🖼', label: 'Photo Gallery',           group: 'Resources' },
  { id: 'videos',             icon: '🎬', label: 'Video Gallery',           group: 'Resources' },
  { id: 'conferences',        icon: '🎤', label: 'Conference',              group: 'Resources' },
  { id: 'onos-publishers',    icon: '📖', label: 'ONOS Publishers',         group: 'Resources' },
  { id: 'onos-settings',      icon: '🌐', label: 'ONOS Settings',           group: 'Resources' },
  { id: 'onos-contacts',      icon: '📞', label: 'ONOS Contacts',           group: 'Resources' },
  { id: 'faqs',               icon: '❓', label: 'FAQs',                    group: 'Connect' },
  { id: 'important-links',    icon: '🔗', label: 'Important Links',           group: 'Connect' },
  { id: 'contacts',           icon: '📞', label: 'Contact Us Items',        group: 'Connect' },
  { id: 'rti-stats',          icon: '📊', label: 'RTI Statistics',          group: 'Connect' },
  { id: 'rti-documents',      icon: '📄', label: 'RTI Documents',           group: 'Connect' },
];

const STAT_KEYS = {
  'drdo-in-news':       'drdo_in_news',      'press-release':      'press_release',
  'acts-policies':      'acts_policies',     'vacancies':          'vacancies',
  'hero-slides':        'hero_slides',       'news-ticker':        'news_ticker',
  'photos':             'photos',            'publications':       'publications',
  'faqs':               'faqs',             'important-links':    'important_links',
  'avalanche-bulletin': 'avalanche_bulletin','forms-manuals':      'forms_manuals',
  'schemes-services':   'schemes_services',  'industry-support':   'industry_support',
  'competitions-awards':'competitions_awards','products':           'products',
  'videos':             'videos',            'conferences':        'conferences',
  'onos-publishers':    'onos_publishers',
  'onos-settings':      'onos_settings',
  'onos-contacts':      'onos_contacts',
  'about-drdo':         'about_drdo',
  'tech-clusters':      'tech_clusters',
  'corporate-clusters': 'corporate_clusters',
  'pm-message':         'pm_message',
  'home-ministers':      'home_ministers',
  'home-offerings':     'home_offerings',
  'whats-new':          'whats_new',
  'home-documents':     'home_documents',
  'home-personas':      'home_personas',
  'home-social-media':  'home_social_media',
  'home-media-slides':  'home_media_slides',
  'home-bottom-links':  'home_bottom_links',
  'team-members':       'team_members',
  'contacts':           'contacts',
  'rti-stats':          'rti_stats',
  'rti-documents':      'rti_documents',
};

const SECTION_MAP = {
  'drdo-in-news':       { api: DrdoInNewsApi,    cfg: NEWS_CFG,      title: 'DRDO in News' },
  'press-release':      { api: PressReleaseApi,  cfg: PRESS_CFG,     title: 'Press Release' },
  'acts-policies':      { api: ActsPoliciesApi,  cfg: ACTS_CFG,      title: 'Acts & Policies' },
  'vacancies':          { api: VacanciesApi,     cfg: VAC_CFG,       title: 'Vacancies' },
  'hero-slides':        { api: HeroSlidesApi,    cfg: HERO_CFG,      title: 'Hero Slides' },
  'news-ticker':        { api: NewsTickerApi,    cfg: TICKER_CFG,    title: 'News Ticker' },
  'photos':             { api: PhotosApi,        cfg: PHOTO_CFG,     title: 'Photo Gallery' },
  'publications':       { api: PublicationsApi,  cfg: PUB_CFG,       title: 'Publications' },
  'faqs':               { api: FaqsApi,          cfg: FAQ_CFG,       title: 'FAQs' },
  'important-links':    { api: ImportantLinksApi,cfg: LINKS_CFG,     title: 'Important Links' },
  'avalanche-bulletin': { api: AvalancheApi,     cfg: AVALANCHE_CFG, title: 'Avalanche Warning Bulletin' },
  'forms-manuals':      { api: FormsManualsApi,  cfg: FM_CFG,        title: 'Forms & Manuals' },
  'schemes-services':   { api: SchemeServiceApi, cfg: SCHEME_CFG,    title: 'Schemes & Services' },
  'industry-support':   { api: IndustrySupportApi, cfg: IND_SUPPORT_CFG, title: 'Industry Support' },
  'competitions-awards':{ api: CompetitionsAwardsApi, cfg: AWARD_CFG, title: 'Competitions & Awards' },
  'products':           { api: ProductsApi,      cfg: PRODUCT_CFG,   title: 'Products' },
  'videos':             { api: VideosApi,        cfg: VIDEO_CFG,     title: 'Video Gallery' },
  'conferences':        { api: ConferencesApi,   cfg: CONFERENCE_CFG,title: 'Conference' },
  'onos-publishers':    { api: ONOSPublisherApi, cfg: ONOS_CFG,      title: 'ONOS Publishers' },
  // ── Homepage sections ──
  'pm-message':         { api: PMMessageApi,       cfg: PM_MSG_CFG,           title: 'PM Message' },
  'home-ministers':      { api: HomeMinisterApi,    cfg: MINISTER_CFG,         title: 'Ministers' },
  'home-offerings':     { api: HomeOfferingApi,    cfg: HOME_OFFERING_CFG,    title: 'Key Offerings' },
  'whats-new':          { api: WhatsNewApi,        cfg: WHATS_NEW_CFG,        title: "What's New" },
  'home-documents':     { api: HomeDocumentApi,    cfg: HOME_DOC_CFG,         title: 'Recent Documents' },
  'home-personas':      { api: HomePersonaApi,     cfg: HOME_PERSONA_CFG,     title: 'User Personas' },
  'home-social-media':  { api: HomeSocialMediaApi, cfg: HOME_SOCIAL_CFG,      title: 'Social Media' },
  'home-media-slides':  { api: HomeMediaSlideApi,  cfg: HOME_MEDIA_SLIDE_CFG, title: 'Media Showcase Slides' },
  'home-bottom-links':  { api: HomeBottomLinkApi,  cfg: HOME_BOTTOM_LINK_CFG, title: 'Bottom Links Carousel' },
  'team-members':       { api: TeamMembersApi,     cfg: TEAM_CFG,             title: 'Our Team Members' },
  'contacts':           { api: ContactsApi,        cfg: CONTACT_CFG,          title: 'Contact Us Items' },
  'rti-stats':          { api: RtiStatsApi,        cfg: RTI_STATS_CFG,        title: 'RTI Statistics' },
  'rti-documents':      { api: RtiDocumentsApi,    cfg: RTI_DOCS_CFG,         title: 'RTI Documents' },
  'onos-contacts':      { api: OnosContactApi,     cfg: ONOS_CONTACT_CFG,     title: 'ONOS Contacts' },
};

// ── Overview panel ────────────────────────────────────────────────────────────
function Overview({ stats, onNavigate }) {
  const cards = [
    { id: 'about-drdo',         icon: '📝', label: 'About DRDO',              key: 'about_drdo' },
    { id: 'tech-clusters',      icon: '✈️', label: 'Tech Clusters',            key: 'tech_clusters' },
    { id: 'corporate-clusters', icon: '🏢', label: 'Corporate Clusters',       key: 'corporate_clusters' },
    { id: 'team-members',       icon: '👥', label: 'Team Members',              key: 'team_members' },
    { id: 'hero-slides',        icon: '🖼️', label: 'Hero Slides',              key: 'hero_slides' },
    { id: 'news-ticker',        icon: '📡', label: 'News Ticker',               key: 'news_ticker' },
    { id: 'pm-message',         icon: '💬', label: 'PM Message',               key: 'pm_message' },
    { id: 'home-ministers',      icon: '👔', label: 'Ministers',                 key: 'home_ministers' },
    { id: 'home-offerings',     icon: '📋', label: 'Key Offerings',             key: 'home_offerings' },
    { id: 'whats-new',          icon: '🆕', label: "What's New",               key: 'whats_new' },
    { id: 'home-documents',     icon: '📄', label: 'Recent Documents',         key: 'home_documents' },
    { id: 'home-personas',      icon: '👥', label: 'User Personas',            key: 'home_personas' },
    { id: 'home-social-media',  icon: '🌐', label: 'Social Media',             key: 'home_social_media' },
    { id: 'home-media-slides',  icon: '🎞️', label: 'Media Showcase',           key: 'home_media_slides' },
    { id: 'home-bottom-links',  icon: '🔗', label: 'Bottom Links',             key: 'home_bottom_links' },
    { id: 'publications',       icon: '📚', label: 'Publications',              key: 'publications' },
    { id: 'avalanche-bulletin', icon: '🏔️', label: 'Avalanche Bulletins',       key: 'avalanche_bulletin' },
    { id: 'drdo-in-news',       icon: '📰', label: 'DRDO in News',              key: 'drdo_in_news' },
    { id: 'forms-manuals',      icon: '📄', label: 'Forms & Manuals',           key: 'forms_manuals' },
    { id: 'press-release',      icon: '📢', label: 'Press Release',             key: 'press_release' },
    { id: 'acts-policies',      icon: '📋', label: 'Acts & Policies',           key: 'acts_policies' },
    { id: 'schemes-services',   icon: '🛠️', label: 'Schemes & Services',       key: 'schemes_services' },
    { id: 'industry-support',   icon: '🏭', label: 'Industry Support',        key: 'industry_support' },
    { id: 'vacancies',          icon: '💼', label: 'Vacancies',                 key: 'vacancies' },
    { id: 'competitions-awards',icon: '🏆', label: 'Competitions & Awards',   key: 'competitions_awards' },
    { id: 'products',           icon: '🚀', label: 'Products',                key: 'products' },
    { id: 'photos',             icon: '🖼', label: 'Photos',                    key: 'photos' },
    { id: 'videos',             icon: '🎬', label: 'Videos',                    key: 'videos' },
    { id: 'conferences',        icon: '🎤', label: 'Conferences',               key: 'conferences' },
    { id: 'onos-publishers',    icon: '📖', label: 'ONOS Publishers',           key: 'onos_publishers' },
    { id: 'faqs',               icon: '❓', label: 'FAQs',                      key: 'faqs' },
    { id: 'important-links',    icon: '🔗', label: 'Important Links',           key: 'important_links' },
    { id: 'contacts',           icon: '📞', label: 'Contacts info',             key: 'contacts' },
    { id: 'rti-stats',          icon: '📊', label: 'RTI Stats',                 key: 'rti_stats' },
    { id: 'rti-documents',      icon: '📄', label: 'RTI Documents',             key: 'rti_documents' },
    { id: 'onos-settings',      icon: '🌐', label: 'ONOS Settings',             key: 'onos_settings' },
    { id: 'onos-contacts',      icon: '📞', label: 'ONOS Contacts',             key: 'onos_contacts' },
  ];
  return (
    <>
      <div className="adm-stats">
        {cards.map(c => (
          <div key={c.id} className="adm-stat" onClick={() => onNavigate(c.id)}>
            <div className="adm-stat-icon">{c.icon}</div>
            <div className="adm-stat-num">{stats ? (stats[c.key] ?? 0) : '…'}</div>
            <div className="adm-stat-label">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="adm-guide">
        <h3>Quick Guide</h3>
        <ul>
          <li>Click any stat card above to jump to that section.</li>
          <li>Use <strong>+ Add New</strong> to create new entries in each section.</li>
          <li>You can attach <strong>external links</strong>, <strong>upload PDF files</strong>, and <strong>upload images</strong> to most entries.</li>
          <li>Use the <strong>Edit</strong> button to modify any existing entry.</li>
          <li>Changes are saved instantly to MongoDB.</li>
        </ul>
      </div>
    </>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate                 = useNavigate();
  const [tab, setTab]            = useState('overview');
  const [stats, setStats]        = useState(null);
  const [toast, setToast]        = useState(null);

  useEffect(() => {
    verifyToken().then(ok => {
      if (!ok) navigate('/admin', { replace: true });
      else getStats().then(setStats).catch(console.error);
    });
  }, [navigate]);

  const handleToast = (msg, type) => setToast({ msg, type });

  const handleLogout = () => { logout(); navigate('/admin', { replace: true }); };

  // Group nav items
  const groups = [...new Set(NAV.map(n => n.group))];

  const activeNav = NAV.find(n => n.id === tab);
  const section   = SECTION_MAP[tab];

  return (
    <div className="adm-wrap">

      {/* ── Sidebar ── */}
      <aside className="adm-sb">
        <div className="adm-sb-brand">
          <div className="adm-sb-brand-icon">🛡️</div>
          <div className="adm-sb-brand-text">
            <strong>DRDO Admin</strong>
            <small>CMS</small>
          </div>
        </div>

        <nav className="adm-sb-nav">
          {groups.map(g => (
            <div key={g}>
              <div className="adm-sb-section-label">{g}</div>
              {NAV.filter(n => n.group === g).map(n => (
                <div
                  key={n.id}
                  className={`adm-sb-item ${tab === n.id ? 'active' : ''}`}
                  onClick={() => setTab(n.id)}
                >
                  <span className="si">{n.icon}</span>
                  {n.label}
                  {stats && STAT_KEYS[n.id] && (
                    <span className="adm-sb-count">{stats[STAT_KEYS[n.id]] ?? ''}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sb-footer">
          <button className="adm-logout" onClick={handleLogout}>🚪 Sign out</button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="adm-main">
        <div className="adm-topbar">
          <div className="adm-topbar-title">
            {activeNav?.icon} {activeNav?.label}
          </div>
          <div className="adm-topbar-user">
            <div className="adm-topbar-av">A</div>
            <span>admin</span>
          </div>
        </div>

        <div className="adm-content">
          {tab === 'overview' && (
            <Overview stats={stats} onNavigate={id => setTab(id)} />
          )}

          {tab === 'about-drdo' && (
            <AboutDrdoCMS onToast={handleToast} />
          )}

          {tab === 'tech-clusters' && (
            <TechClustersCMS onToast={handleToast} />
          )}

          {tab === 'corporate-clusters' && (
            <CorporateClustersCMS onToast={handleToast} />
          )}

          {tab === 'onos-settings' && (
            <OnosCMS onToast={handleToast} />
          )}

          {section && (
            <Section
              key={tab}
              title={section.title}
              icon={activeNav?.icon}
              api={section.api}
              fields={section.cfg.fields}
              colHeaders={section.cfg.colHeaders}
              emptyRow={section.cfg.emptyRow}
              renderRow={section.cfg.renderRow}
              onToast={handleToast}
            />
          )}
        </div>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onHide={() => setToast(null)} />}
    </div>
  );
}
