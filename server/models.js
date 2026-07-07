const mongoose = require('mongoose');

const { Schema } = mongoose;

// ── DRDO in News ─────────────────────────────────────────────────────────────
const DrdoNewsSchema = new Schema({
  title:     { type: String, required: true },
  date:      { type: String, required: true },
  timestamp: { type: Number, default: () => Date.now() },
  size:      { type: String, default: '' },
  fileUrl:   { type: String, default: '' },   // uploaded PDF path or external URL
  link:      { type: String, default: '' },   // optional external link
}, { timestamps: true });

// ── Press Release ─────────────────────────────────────────────────────────────
const PressReleaseSchema = new Schema({
  title:     { type: String, required: true },
  date:      { type: String, required: true },
  timestamp: { type: Number, default: () => Date.now() },
  link:      { type: String, default: '' },
  fileUrl:   { type: String, default: '' },
}, { timestamps: true });

// ── Acts and Policies ─────────────────────────────────────────────────────────
const ActsPoliciesSchema = new Schema({
  title:     { type: String, required: true },
  date:      { type: String, required: true },
  timestamp: { type: Number, default: () => Date.now() },
  type:      { type: String, enum: ['Guidelines', 'Policies', 'Patents', 'Transfer of Technology', 'Other'], default: 'Guidelines' },
  size:      { type: String, default: '' },
  fileUrl:   { type: String, default: '' },
  link:      { type: String, default: '' },
}, { timestamps: true });

// ── Vacancies ─────────────────────────────────────────────────────────────────
const VacanciesSchema = new Schema({
  title:         { type: String, required: true },
  advtNo:        { type: String, default: '' },
  publishedDate: { type: String, default: '' },
  dateVal:       { type: Number, default: 0 },
  startDate:     { type: String, default: '' },
  endDate:       { type: String, default: '' },
  snippet:       { type: String, default: '' },
  link:          { type: String, default: '' },
  fileUrl:       { type: String, default: '' },
}, { timestamps: true });

// ── Hero Slides ───────────────────────────────────────────────────────────────
const HeroSlideSchema = new Schema({
  title:     { type: String, required: true },
  subtitle:  { type: String, default: '' },
  imageUrl:  { type: String, default: '' },   // uploaded image or external URL
  link:      { type: String, default: '#' },
  order:     { type: Number, default: 0 },
}, { timestamps: true });

// ── News Ticker ───────────────────────────────────────────────────────────────
const NewsTickerSchema = new Schema({
  text:    { type: String, required: true },
  link:    { type: String, default: '#' },
  active:  { type: Boolean, default: true },
  order:   { type: Number, default: 0 },
}, { timestamps: true });

// ── Photo Gallery ─────────────────────────────────────────────────────────────
const PhotoSchema = new Schema({
  caption:  { type: String, default: '' },
  category: { type: String, default: 'General' },
  imageUrl: { type: String, required: true },
  date:     { type: String, default: '' },
  link:     { type: String, default: '' },
}, { timestamps: true });

// ── Publications ──────────────────────────────────────────────────────────────
const PublicationSchema = new Schema({
  title:     { type: String, required: true },
  date:      { type: String, default: '' },
  timestamp: { type: Number, default: () => Date.now() },
  type:      { type: String, default: 'PDF' },
  size:      { type: String, default: '' },
  fileUrl:   { type: String, default: '' },
  link:      { type: String, default: '' },
}, { timestamps: true });

// ── FAQs ──────────────────────────────────────────────────────────────────────
const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
}, { timestamps: true });

// ── Avalanche Warning Bulletin ───────────────────────────────────────────────
const AvalancheSchema = new Schema({
  title:     { type: String, required: true },
  date:      { type: String, required: true },
  timestamp: { type: Number, default: () => Date.now() },
  size:      { type: String, default: '' },
  fileUrl:   { type: String, default: '' },
  link:      { type: String, default: '' },
}, { timestamps: true });

// ── Forms and Manuals ────────────────────────────────────────────────────────
const FormManualSchema = new Schema({
  title:    { type: String, required: true },
  docNo:    { type: String, default: '—' },
  type:     { type: String, enum: ['Forms', 'Manuals', 'Other'], default: 'Forms' },
  category: { type: String, default: 'General' },
  size:     { type: String, default: '' },
  fileUrl:  { type: String, default: '' },
  link:     { type: String, default: '' },
}, { timestamps: true });

// ── Schemes and Services ──────────────────────────────────────────────────────
const SchemeServiceSchema = new Schema({
  title: { type: String, required: true },
  desc:  { type: String, default: '' },
  link:  { type: String, default: '' },
}, { timestamps: true });

// ── Industry Support ──────────────────────────────────────────────────────────
const IndustrySupportSchema = new Schema({
  title: { type: String, required: true },
  desc:  { type: String, default: '' },
  link:  { type: String, default: '' },
}, { timestamps: true });

// ── Competitions and Awards ───────────────────────────────────────────────────
const CompetitionAwardSchema = new Schema({
  title:     { type: String, required: true },
  desc:      { type: String, default: '' },
  link:      { type: String, default: '' },
  date:      { type: String, default: '' },
  isArchive: { type: Boolean, default: false },
}, { timestamps: true });

// ── Products ──────────────────────────────────────────────────────────────────
const ProductSchema = new Schema({
  title:    { type: String, required: true },
  imageUrl: { type: String, default: '' },
  link:     { type: String, default: '' },
}, { timestamps: true });

// ── Important Links ───────────────────────────────────────────────────────────
const ImportantLinkSchema = new Schema({
  label:    { type: String, required: true },
  url:      { type: String, required: true },
  imageUrl: { type: String, default: '' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

// ── Video Gallery ────────────────────────────────────────────────────────────────
const VideoSchema = new Schema({
  title:     { type: String, required: true },
  dateStr:   { type: String, default: '' },
  dateVal:   { type: Number, default: 0 },
  youtubeId: { type: String, default: '' },
  href:      { type: String, default: '' },
}, { timestamps: true });

// ── Conference ──────────────────────────────────────────────────────────────────
const ConferenceSchema = new Schema({
  title:     { type: String, required: true },
  startDate: { type: String, default: '' },
  endDate:   { type: String, default: '' },
  link:      { type: String, default: '' },
}, { timestamps: true });

// ── ONOS Publishers ──────────────────────────────────────────────────────────
const ONOSPublisherSchema = new Schema({
  name:  { type: String, required: true },
  url:   { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── About DRDO ────────────────────────────────────────────────────────────────
const AboutDrdoSchema = new Schema({
  vision: { type: String, default: '' },
  mission: { type: [String], default: [] },
  aboutText: { type: [String], default: [] },
  lastUpdated: { type: String, default: '01 Jun 2026' }
}, { timestamps: true });

// ── Technology Cluster ────────────────────────────────────────────────────────
const TechClusterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '#003a70' },
  description: { type: String, default: '' },
  href: { type: String, default: '' },
  labs: { type: [String], default: [] },
  focus: { type: [String], default: [] }
}, { timestamps: true });

// ── Corporate Cluster ─────────────────────────────────────────────────────────
const CorporateClusterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: '#003a70' },
  description: { type: String, default: '' },
  href: { type: String, default: '' },
  externalLink: { type: String, default: '' },
  focus: { type: [String], default: [] },
  directorGeneral: {
    title: { type: String, default: '' },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    fax: { type: String, default: '' },
    email: { type: String, default: '' }
  },
  directorates: [{
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    fax: { type: String, default: '' },
    email: { type: String, default: '' }
  }]
}, { timestamps: true });

// ── PM Message (Homepage) ─────────────────────────────────────────────────────
const PMMessageSchema = new Schema({
  quote:     { type: String, required: true },
  name:      { type: String, required: true },
  imageUrl:  { type: String, default: '' },
  eventLink: { type: String, default: '' },
}, { timestamps: true });

// ── Home About / Minister Cards (Homepage) ────────────────────────────────────
const HomeMinisterSchema = new Schema({
  name:      { type: String, required: true },
  title:     { type: String, required: true },
  imageUrl:  { type: String, default: '' },
  order:     { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Offerings (Homepage tabbed section) ──────────────────────────────────
const HomeOfferingSchema = new Schema({
  tab:   { type: String, required: true, enum: ['schemes','vacancies','messageboard','events','keyproducts','productsexport'] },
  title: { type: String, required: true },
  link:  { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── What's New (Homepage) ─────────────────────────────────────────────────────
const WhatsNewSchema = new Schema({
  text:  { type: String, required: true },
  link:  { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Documents (Homepage Recent Documents) ────────────────────────────────
const HomeDocumentSchema = new Schema({
  title:    { type: String, required: true },
  subtitle: { type: String, default: '' },
  link:     { type: String, default: '' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Personas (Homepage User Personas carousel) ───────────────────────────
const HomePersonaSchema = new Schema({
  title:    { type: String, required: true },
  imageUrl: { type: String, default: '' },
  link:     { type: String, default: '' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Social Media (Homepage social cards) ─────────────────────────────────
const HomeSocialMediaSchema = new Schema({
  platform: { type: String, required: true },
  profileUrl: { type: String, default: '' },
  imageUrl:   { type: String, default: '' },
  order:      { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Media Slides (Homepage product slider) ───────────────────────────────
const HomeMediaSlideSchema = new Schema({
  imageUrl: { type: String, default: '' },
  link:     { type: String, default: '' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

// ── Home Bottom Links (Homepage bottom carousel banners) ──────────────────────
const HomeBottomLinkSchema = new Schema({
  imageUrl: { type: String, default: '' },
  link:     { type: String, default: '' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

// ── Uploaded Files (Database-backed storage) ──────────────────────────────
const UploadedFileSchema = new Schema({
  filename:    { type: String, required: true, unique: true },
  contentType: { type: String, required: true },
  data:        { type: Buffer, required: true },
}, { timestamps: true });

// ── Team Members ─────────────────────────────────────────────────────────────
const TeamMemberSchema = new Schema({
  name:        { type: String, required: true },
  designation: { type: String, required: true },
  category:    { type: String, enum: ['Technical', 'Corporate', 'Nodal'], default: 'Technical' },
  cluster:     { type: String, default: '' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

// ── Contact Items ────────────────────────────────────────────────────────────
const ContactSchema = new Schema({
  label: { type: String, required: true },
  org:   { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// ── RTI Statistics ───────────────────────────────────────────────────────────
const RtiStatSchema = new Schema({
  title:  { type: String, required: true },
  label1: { type: String, required: true },
  value1: { type: String, required: true },
  label2: { type: String, required: true },
  value2: { type: String, required: true },
  order:  { type: Number, default: 0 },
}, { timestamps: true });

// ── RTI Documents ────────────────────────────────────────────────────────────
const RtiDocumentSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  link:        { type: String, default: '' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

// ── ONOS Settings ────────────────────────────────────────────────────────────
const OnosSettingSchema = new Schema({
  homeDesc:           { type: String, default: '' },
  homeAccessHeader:   { type: String, default: '' },
  homePhaseText:      { type: String, default: '' },
  homeOnCampusLabel:  { type: String, default: '' },
  homeOnCampusLink:   { type: String, default: '' },
  homeOffCampusLabel: { type: String, default: '' },
  homeOffCampusLink:  { type: String, default: '' },
  journalsDesc:       { type: String, default: '' },
  journalsLink:       { type: String, default: '' },
  remoteDesc:         { type: String, default: '' },
  remoteLink:         { type: String, default: '' },
  sopTitle:           { type: String, default: '' },
  sopDesc:            { type: String, default: '' },
  sopFileUrl:         { type: String, default: '' },
  sopLink:            { type: String, default: '' },
  contactNote:        { type: String, default: '' },
  contactEmail:       { type: String, default: '' },
  contactEmailLabel:  { type: String, default: '' },
}, { timestamps: true });

// ── ONOS Contacts ────────────────────────────────────────────────────────────
const OnosContactSchema = new Schema({
  name:        { type: String, required: true },
  designation: { type: String, default: '' },
  phone:       { type: String, default: '' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = {
  DrdoNews:         mongoose.model('DrdoNews',         DrdoNewsSchema),
  PressRelease:     mongoose.model('PressRelease',     PressReleaseSchema),
  ActsPolicy:       mongoose.model('ActsPolicy',       ActsPoliciesSchema),
  Vacancy:          mongoose.model('Vacancy',          VacanciesSchema),
  HeroSlide:        mongoose.model('HeroSlide',        HeroSlideSchema),
  NewsTicker:       mongoose.model('NewsTicker',       NewsTickerSchema),
  Photo:            mongoose.model('Photo',            PhotoSchema),
  Publication:      mongoose.model('Publication',      PublicationSchema),
  FAQ:              mongoose.model('FAQ',              FAQSchema),
  ImportantLink:    mongoose.model('ImportantLink',    ImportantLinkSchema),
  AvalancheBulletin:mongoose.model('AvalancheBulletin',AvalancheSchema),
  FormManual:       mongoose.model('FormManual',       FormManualSchema),
  SchemeService:    mongoose.model('SchemeService',    SchemeServiceSchema),
  IndustrySupport:  mongoose.model('IndustrySupport',  IndustrySupportSchema),
  CompetitionAward: mongoose.model('CompetitionAward', CompetitionAwardSchema),
  Product:          mongoose.model('Product',          ProductSchema),
  Video:            mongoose.model('Video',            VideoSchema),
  Conference:       mongoose.model('Conference',       ConferenceSchema),
  ONOSPublisher:    mongoose.model('ONOSPublisher',    ONOSPublisherSchema),
  AboutDrdo:        mongoose.model('AboutDrdo',        AboutDrdoSchema),
  TechCluster:      mongoose.model('TechCluster',      TechClusterSchema),
  CorporateCluster: mongoose.model('CorporateCluster', CorporateClusterSchema),
  PMMessage:        mongoose.model('PMMessage',        PMMessageSchema),
  HomeMinister:     mongoose.model('HomeMinister',     HomeMinisterSchema),
  HomeOffering:     mongoose.model('HomeOffering',     HomeOfferingSchema),
  WhatsNew:         mongoose.model('WhatsNew',         WhatsNewSchema),
  HomeDocument:     mongoose.model('HomeDocument',     HomeDocumentSchema),
  HomePersona:      mongoose.model('HomePersona',      HomePersonaSchema),
  HomeSocialMedia:  mongoose.model('HomeSocialMedia',  HomeSocialMediaSchema),
  HomeMediaSlide:   mongoose.model('HomeMediaSlide',   HomeMediaSlideSchema),
  HomeBottomLink:   mongoose.model('HomeBottomLink',   HomeBottomLinkSchema),
  UploadedFile:     mongoose.model('UploadedFile',     UploadedFileSchema),
  TeamMember:       mongoose.model('TeamMember',       TeamMemberSchema),
  Contact:          mongoose.model('Contact',          ContactSchema),
  RtiStat:          mongoose.model('RtiStat',          RtiStatSchema),
  RtiDocument:      mongoose.model('RtiDocument',      RtiDocumentSchema),
  OnosSetting:      mongoose.model('OnosSetting',      OnosSettingSchema),
  OnosContact:      mongoose.model('OnosContact',      OnosContactSchema),
};

