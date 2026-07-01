const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  DrdoNews, PressRelease, ActsPolicy, Vacancy,
  HeroSlide, NewsTicker, Photo, Publication, FAQ, ImportantLink,
  AvalancheBulletin, FormManual,
  SchemeService, IndustrySupport, CompetitionAward, Product,
  Video, Conference, ONOSPublisher,
  AboutDrdo, TechCluster, CorporateCluster,
  PMMessage, HomeMinister, HomeOffering, WhatsNew,
  HomeDocument, HomePersona, HomeSocialMedia, HomeMediaSlide, HomeBottomLink,
  UploadedFile, TeamMember, Contact, RtiStat, RtiDocument,
} = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'drdo_admin_jwt_secret_2026';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lavanyjain25_db_user:lavanyjain@cluster0.9fsuqrc.mongodb.net/?appName=Cluster0';

// ── Connect to MongoDB ────────────────────────────────────────────────────────
let cachedDb = null;

async function ensureDb(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  if (!cachedDb) {
    cachedDb = mongoose.connect(MONGO_URI).then(async (db) => {
      console.log('✅ MongoDB connected');
      await seedIfEmpty();
      return db;
    }).catch(err => {
      cachedDb = null;
      console.error('❌ MongoDB connection error:', err);
      throw err;
    });
  }

  try {
    await cachedDb;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
}

// Trigger initial connection (non-blocking)
mongoose.connect(MONGO_URI).then(async () => {
  console.log('✅ MongoDB connected (initial)');
  await seedIfEmpty();
}).catch(err => console.error('❌ MongoDB error (initial):', err));

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    const isAllowed = allowedOrigins.includes(origin) ||
                      origin === 'https://drdo-clone-client.vercel.app' ||
                      (origin.startsWith('https://') && origin.endsWith('.vercel.app')) ||
                      origin.includes('localhost') ||
                      origin.includes('127.0.0.1');
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(ensureDb);

app.get('/uploads/:folder/:filename', async (req, res) => {
  const { folder, filename } = req.params;
  try {
    const dbFile = await UploadedFile.findOne({ filename });
    if (dbFile) {
      res.set('Content-Type', dbFile.contentType);
      return res.send(dbFile.data);
    }
    const localPath = path.join(__dirname, 'uploads', folder, filename);
    if (fs.existsSync(localPath)) {
      return res.sendFile(localPath);
    }
    res.status(404).send('File not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ── Admin credentials ─────────────────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_HASH = '$2a$10$3sWa8mIt9yUVemP4qf8vQ.129OJGWohx.wrYdvf3SDLe9PTKKEJZu';

// ── Auth middleware ───────────────────────────────────────────────────────────
function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(h.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
}

// ── Multer setup ──────────────────────────────────────────────────────────────
const storage = multer.memoryStorage();
const uploadImage = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
const uploadPdf = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// ── File upload routes ────────────────────────────────────────────────────────
app.post('/api/upload/image', auth, uploadImage.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const filename = unique + path.extname(req.file.originalname);

    const dbFile = new UploadedFile({
      filename,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    await dbFile.save();

    res.json({ url: `/uploads/images/${filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/upload/pdf', auth, uploadPdf.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const filename = unique + path.extname(req.file.originalname);

    const dbFile = new UploadedFile({
      filename,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    await dbFile.save();

    res.json({ url: `/uploads/pdfs/${filename}`, size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── Auth routes ───────────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER || !bcrypt.compareSync(password, ADMIN_HASH))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, username });
});

app.get('/api/admin/verify', auth, (req, res) => res.json({ valid: true }));

app.get('/api/admin/stats', auth, async (req, res) => {
  const [
    news, press, acts, vac, hero, ticker, photos, pubs, faqs, links, ava, fm,
    schemes, indSupport, awards, products, videos, conferences, onos,
    aboutDrdo, techClusters, corporateClusters,
    pmMsg, ministers, homeOfferings, whatsNew, homeDocs, personas, socialMedia, mediaSlides, bottomLinks,
    teamMembers, contacts, rtiStats, rtiDocuments
  ] = await Promise.all([
    DrdoNews.countDocuments(), PressRelease.countDocuments(), ActsPolicy.countDocuments(),
    Vacancy.countDocuments(), HeroSlide.countDocuments(), NewsTicker.countDocuments(),
    Photo.countDocuments(), Publication.countDocuments(), FAQ.countDocuments(), ImportantLink.countDocuments(),
    AvalancheBulletin.countDocuments(), FormManual.countDocuments(),
    SchemeService.countDocuments(), IndustrySupport.countDocuments(), CompetitionAward.countDocuments(), Product.countDocuments(),
    Video.countDocuments(), Conference.countDocuments(), ONOSPublisher.countDocuments(),
    AboutDrdo.countDocuments(), TechCluster.countDocuments(), CorporateCluster.countDocuments(),
    PMMessage.countDocuments(), HomeMinister.countDocuments(), HomeOffering.countDocuments(), WhatsNew.countDocuments(),
    HomeDocument.countDocuments(), HomePersona.countDocuments(), HomeSocialMedia.countDocuments(), HomeMediaSlide.countDocuments(), HomeBottomLink.countDocuments(),
    TeamMember.countDocuments(), Contact.countDocuments(), RtiStat.countDocuments(), RtiDocument.countDocuments(),
  ]);
  res.json({
    drdo_in_news: news, press_release: press, acts_policies: acts, vacancies: vac,
    hero_slides: hero, news_ticker: ticker, photos, publications: pubs, faqs,
    important_links: links, avalanche_bulletin: ava, forms_manuals: fm,
    schemes_services: schemes, industry_support: indSupport, competitions_awards: awards, products,
    videos, conferences, onos_publishers: onos,
    about_drdo: aboutDrdo, tech_clusters: techClusters, corporate_clusters: corporateClusters,
    pm_message: pmMsg, home_ministers: ministers, home_offerings: homeOfferings, whats_new: whatsNew,
    home_documents: homeDocs, home_personas: personas, home_social_media: socialMedia,
    home_media_slides: mediaSlides, home_bottom_links: bottomLinks,
    team_members: teamMembers, contacts, rti_stats: rtiStats, rti_documents: rtiDocuments,
  });
});

// ── Generic CRUD factory ──────────────────────────────────────────────────────
function crud(Model) {
  const router = express.Router();
  router.get('/', async (req, res) => { try { res.json(await Model.find().sort({ createdAt: -1 })); } catch (e) { res.status(500).json({ error: e.message }); } });
  router.get('/:id', async (req, res) => { try { const d = await Model.findById(req.params.id); if (!d) return res.status(404).json({ error: 'Not found' }); res.json(d); } catch (e) { res.status(500).json({ error: e.message }); } });
  router.post('/', auth, async (req, res) => { try { const d = await Model.create(req.body); res.status(201).json(d); } catch (e) { res.status(400).json({ error: e.message }); } });
  router.put('/:id', auth, async (req, res) => { try { const d = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!d) return res.status(404).json({ error: 'Not found' }); res.json(d); } catch (e) { res.status(400).json({ error: e.message }); } });
  router.delete('/:id', auth, async (req, res) => { try { const d = await Model.findByIdAndDelete(req.params.id); if (!d) return res.status(404).json({ error: 'Not found' }); res.json({ deleted: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
  return router;
}

app.use('/api/drdo-in-news', crud(DrdoNews));
app.use('/api/press-release', crud(PressRelease));
app.use('/api/acts-policies', crud(ActsPolicy));
app.use('/api/vacancies', crud(Vacancy));
app.use('/api/hero-slides', crud(HeroSlide));
app.use('/api/news-ticker', crud(NewsTicker));
app.use('/api/photos', crud(Photo));
app.use('/api/publications', crud(Publication));
app.use('/api/faqs', crud(FAQ));
app.use('/api/important-links', crud(ImportantLink));
app.use('/api/avalanche-bulletin', crud(AvalancheBulletin));
app.use('/api/forms-manuals', crud(FormManual));
app.use('/api/schemes-services', crud(SchemeService));
app.use('/api/industry-support', crud(IndustrySupport));
app.use('/api/competitions-awards', crud(CompetitionAward));
app.use('/api/products', crud(Product));
app.use('/api/videos', crud(Video));
app.use('/api/conferences', crud(Conference));
app.use('/api/onos-publishers', crud(ONOSPublisher));
app.use('/api/about-drdo', crud(AboutDrdo));
app.use('/api/tech-clusters', crud(TechCluster));
app.use('/api/corporate-clusters', crud(CorporateCluster));
app.use('/api/pm-message', crud(PMMessage));
app.use('/api/home-ministers', crud(HomeMinister));
app.use('/api/home-offerings', crud(HomeOffering));
app.use('/api/whats-new', crud(WhatsNew));
app.use('/api/home-documents', crud(HomeDocument));
app.use('/api/home-personas', crud(HomePersona));
app.use('/api/home-social-media', crud(HomeSocialMedia));
app.use('/api/home-media-slides', crud(HomeMediaSlide));
app.use('/api/home-bottom-links', crud(HomeBottomLink));
app.use('/api/team-members', crud(TeamMember));
app.use('/api/contacts', crud(Contact));
app.use('/api/rti-stats', crud(RtiStat));
app.use('/api/rti-documents', crud(RtiDocument));

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json({ results: [] });

  const regex = new RegExp(query.trim(), 'i');

  try {
    const [
      news, press, acts, vacs, pubs, faqs, ava, fm, schemes, support, awards, products, videos, conferences, onos
    ] = await Promise.all([
      DrdoNews.find({ title: regex }).limit(10),
      PressRelease.find({ title: regex }).limit(10),
      ActsPolicy.find({ $or: [{ title: regex }, { type: regex }] }).limit(10),
      Vacancy.find({ $or: [{ title: regex }, { snippet: regex }] }).limit(10),
      Publication.find({ title: regex }).limit(10),
      FAQ.find({ $or: [{ question: regex }, { answer: regex }] }).limit(10),
      AvalancheBulletin.find({ title: regex }).limit(10),
      FormManual.find({ $or: [{ title: regex }, { category: regex }] }).limit(10),
      SchemeService.find({ $or: [{ title: regex }, { desc: regex }] }).limit(10),
      IndustrySupport.find({ $or: [{ title: regex }, { desc: regex }] }).limit(10),
      CompetitionAward.find({ $or: [{ title: regex }, { desc: regex }] }).limit(10),
      Product.find({ title: regex }).limit(10),
      Video.find({ title: regex }).limit(10),
      Conference.find({ title: regex }).limit(10),
      ONOSPublisher.find({ name: regex }).limit(10)
    ]);

    const results = [];

    news.forEach(item => results.push({ title: item.title, type: 'DRDO in News', link: '/documents/drdo-in-news', date: item.date }));
    press.forEach(item => results.push({ title: item.title, type: 'Press Release', link: '/documents/press-release', date: item.date }));
    acts.forEach(item => results.push({ title: `${item.type}: ${item.title}`, type: 'Acts & Policies', link: '/documents/acts-and-policies', date: item.date }));
    vacs.forEach(item => results.push({ title: item.title, type: 'Vacancy', link: '/offerings/vacancies', date: item.publishedDate, snippet: item.snippet }));
    pubs.forEach(item => results.push({ title: item.title, type: 'Publication', link: '/documents/publications', date: item.date }));
    faqs.forEach(item => results.push({ title: item.question, type: 'FAQ', link: '/connect/faqs', snippet: item.answer }));
    ava.forEach(item => results.push({ title: item.title, type: 'Avalanche Bulletin', link: '/documents/avalanche-warning-bulletin', date: item.date }));
    fm.forEach(item => results.push({ title: `[${item.type}] ${item.title}`, type: 'Forms & Manuals', link: '/documents/form-and-manual', category: item.category }));
    schemes.forEach(item => results.push({ title: item.title, type: 'Scheme / Service', link: '/offerings/schemes-and-services', snippet: item.desc }));
    support.forEach(item => results.push({ title: item.title, type: 'Industry Support', link: '/offerings/industry-support', snippet: item.desc }));
    awards.forEach(item => results.push({ title: item.title, type: 'Competition / Award', link: '/offerings/competitions-and-awards', snippet: item.desc, date: item.date }));
    products.forEach(item => results.push({ title: item.title, type: 'Product', link: '/offerings/products' }));
    videos.forEach(item => results.push({ title: item.title, type: 'Video', link: '/resources/video-gallery', date: item.dateStr }));
    conferences.forEach(item => results.push({ title: item.title, type: 'Conference', link: '/resources/conference', date: `${item.startDate} - ${item.endDate}` }));
    onos.forEach(item => results.push({ title: item.name, type: 'ONOS Publisher', link: '/resources/onos' }));

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (_, res) => res.json({
  status: 'ok',
  db: mongoose.connection.readyState,
  allowedOrigins,
  corsEnv: process.env.CORS_ORIGIN || 'not set'
}));

// ── Seed initial data ─────────────────────────────────────────────────────────
async function seedIfEmpty() {
  console.log('🌱 Checking seed data...');

  // 1. DrdoNews
  if ((await DrdoNews.countDocuments()) === 0) {
    console.log('🌱 Seeding DrdoNews...');
    await DrdoNews.insertMany([
      { title: 'DRDO News - 04 June 2026', date: '04/06/2026', timestamp: 1780598400, size: '2.10 MB', fileUrl: '', link: '' },
      { title: 'DRDO News - 03 June 2026', date: '03/06/2026', timestamp: 1780512000, size: '2.13 MB', fileUrl: '', link: '' },
      { title: 'DRDO News - 02 June 2026', date: '02/06/2026', timestamp: 1780425600, size: '1.85 MB', fileUrl: '', link: '' },
      { title: 'DRDO News - 01 June 2026', date: '01/06/2026', timestamp: 1780339200, size: '2.05 MB', fileUrl: '', link: '' },
      { title: 'DRDO News - 31 May 2026', date: '31/05/2026', timestamp: 1780252800, size: '1.92 MB', fileUrl: '', link: '' },
    ]);
  }

  // 2. PressRelease
  if ((await PressRelease.countDocuments()) === 0) {
    console.log('🌱 Seeding PressRelease...');
    await PressRelease.insertMany([
      { title: 'DRDO opens CBRN Field Training & Demonstration Centre in Delhi', date: '06/05/2026', timestamp: 1778112000, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2258463' },
      { title: 'Successful flight test of Long-Range Glide Bomb (LRGB) Gaurav', date: '12/04/2026', timestamp: 1776038400, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2248102' },
      { title: 'DRDO conducts successful flight test of Rudra-II', date: '08/04/2026', timestamp: 1775692800, link: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246059' },
    ]);
  }

  // 3. ActsPolicy
  if ((await ActsPolicy.countDocuments()) === 0) {
    console.log('🌱 Seeding ActsPolicy...');
    await ActsPolicy.insertMany([
      { title: 'DRDO Policy for Transfer of Technology 2025', date: '13/01/2026', timestamp: 1768262400, type: 'Transfer of Technology', size: '3.40 MB', fileUrl: '' },
      { title: 'DRDO Policy for Use of Patents by Indian Industry', date: '13/01/2026', timestamp: 1768262400, type: 'Patents', size: '211.68 KB', fileUrl: '' },
      { title: 'Guidelines for Transfer of Technology (ToT) to Industry', date: '12/12/2025', timestamp: 1765497600, type: 'Guidelines', size: '1.25 MB', fileUrl: '' },
    ]);
  }

  // 4. Vacancy
  if ((await Vacancy.countDocuments()) === 0) {
    console.log('🌱 Seeding Vacancy...');
    await Vacancy.insertMany([
      { title: 'RAC invites applications for Scientist posts in the DRDS cadre', advtNo: 'RAC/SCIENTIST/147/2026', publishedDate: '04/06/2026', dateVal: 20260604, startDate: '04/06/2026', endDate: '10/07/2026', snippet: 'Recruitment and Assessment Centre invites online applications for direct recruitment of Scientist B, C, D, E and F in DRDO.', link: '' },
      { title: 'HEMRL, Pune invites applications for paid internships', advtNo: 'HEMRL/INTERN/2026/03', publishedDate: '19/06/2026', dateVal: 20260619, startDate: '19/06/2026', endDate: '10/07/2026', snippet: 'High Energy Materials Research Laboratory invites application from eligible UG/PG students for Selection of Paid Internship.', link: '' },
    ]);
  }

  // 5. HeroSlide
  if ((await HeroSlide.countDocuments()) === 0) {
    console.log('🌱 Seeding HeroSlide...');
    await HeroSlide.insertMany([
      { title: 'Advanced Defence Technologies', subtitle: 'Empowering the Nation through Science & Technology', imageUrl: '', link: '#', order: 1 },
      { title: 'Missile Systems & Aerospace', subtitle: 'Cutting-edge research for national security', imageUrl: '', link: '#', order: 2 },
    ]);
  }

  // 6. NewsTicker
  if ((await NewsTicker.countDocuments()) === 0) {
    console.log('🌱 Seeding NewsTicker...');
    await NewsTicker.insertMany([
      { text: 'DRDO successfully tests VSHORAD missile system', link: '#', active: true, order: 1 },
      { text: 'New MOU signed with IIT Delhi for defence R&D collaboration', link: '#', active: true, order: 2 },
      { text: 'DRDO opens new research facility in Hyderabad', link: '#', active: true, order: 3 },
    ]);
  }

  // 7. FAQ
  if ((await FAQ.countDocuments()) === 0) {
    console.log('🌱 Seeding FAQ...');
    await FAQ.insertMany([
      { question: 'What is the full form of DRDO?', answer: 'Defence Research and Development Organisation.', order: 1, active: true },
      { question: 'When was DRDO formed?', answer: 'DRDO was formed in 1958 from the amalgamation of the Technical Development Establishment (TDEs), Directorate of Technical Development & Production (DTDP) and Defence Science Organisation (DSO).', order: 2, active: true },
      { question: 'How can I join DRDO?', answer: 'There are two primary modes of joining DRDO: RAC (Recruitment to Scientific cadre) and CEPTAM (Recruitment to Technical cadre posts).', order: 3, active: true },
      { question: 'What are the pay scales of scientists/technical cadre staff at various levels?', answer: 'For updated pay scales please visit the RAC website.', order: 4, active: true },
      { question: 'How can I apply for JRF/SRF/RA/Apprentice Schemes in DRDO?', answer: 'Individual DRDO laboratories publish openings for JRF/SRF/RA/Apprentices from time to time.', order: 5, active: true },
      { question: 'What are various modes of induction of scientists into DRDO system?', answer: 'Direct Recruitment, Lateral Recruitment, Talent Search Scheme, and Deputation & Absorption.', order: 6, active: true },
      { question: 'Can I join DRDO at a higher post with significant experience?', answer: 'Yes. Experienced candidates can join through lateral recruitment at higher grades.', order: 7, active: true },
      { question: 'Whom should I contact for recruitment-related queries?', answer: 'Recruitment related queries may be addressed through RAC.', order: 8, active: true },
      { question: 'Where are DRDO laboratories situated?', answer: 'DRDO laboratories are located across India including Delhi, Hyderabad, Bengaluru, Pune, Chennai, Kochi and other cities.', order: 9, active: true },
      { question: 'What is the procedure for summer training in DRDO laboratories?', answer: 'Students should directly apply to the Director of the concerned DRDO laboratory.', order: 10, active: true }
    ]);
  }

  // 8. AvalancheBulletin
  if ((await AvalancheBulletin.countDocuments()) === 0) {
    console.log('🌱 Seeding AvalancheBulletin...');
    await AvalancheBulletin.insertMany([
      { title: 'Avalanche Warning Bulletin - 03 June 2026', date: '03-06-2026', timestamp: 1780512000, size: '745.46 KB', fileUrl: '', link: '' },
      { title: 'Closing of Operational Avalanche Forecasting Services for Winter Season 2025-26', date: '03-06-2026', timestamp: 1780512000, size: '409.91 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 02 June 2026', date: '02-06-2026', timestamp: 1780425600, size: '720.12 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 01 June 2026', date: '01-06-2026', timestamp: 1780339200, size: '710.45 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 31 May 2026', date: '31-05-2026', timestamp: 1780252800, size: '690.30 KB', fileUrl: '', link: '' },
    ]);
  }

  // 9. FormManual
  if ((await FormManual.countDocuments()) === 0) {
    console.log('🌱 Seeding FormManual...');
    await FormManual.insertMany([
      { title: 'Project Closure Form', docNo: '—', type: 'Forms', category: 'DIA-CoEs', size: '180.45 KB', fileUrl: '', link: '' },
      { title: 'Summary of Proposal Basic Information - Form 1', docNo: 'Form 1*', type: 'Forms', category: 'DIA-CoEs', size: '240.12 KB', fileUrl: '', link: '' },
      { title: 'Guidelines for DIA-CoE Research Proposals', docNo: '—', type: 'Manuals', category: 'DIA-CoEs', size: '1.20 MB', fileUrl: '', link: '' },
      { title: 'Research Grant Application Form', docNo: 'ER-03', type: 'Forms', category: 'ER&IPR', size: '350.55 KB', fileUrl: '', link: '' },
      { title: 'Procurement Manual 2025', docNo: '—', type: 'Manuals', category: 'Procurement', size: '4.80 MB', fileUrl: '', link: '' },
      { title: 'Utilization Certificate Form', docNo: 'Form 5', type: 'Forms', category: 'ER&IPR', size: '120.30 KB', fileUrl: '', link: '' },
      { title: 'Detailed Proposal Submission Format - Form 2', docNo: 'Form 2', type: 'Forms', category: 'DIA-CoEs', size: '290.40 KB', fileUrl: '', link: '' },
      { title: 'Vendor Registration Form', docNo: 'PM-02', type: 'Forms', category: 'Procurement', size: '185.00 KB', fileUrl: '', link: '' },
      { title: 'Financial Powers of DRDO Directors (DFPR-2024)', docNo: '—', type: 'Manuals', category: 'Admin', size: '2.50 MB', fileUrl: '', link: '' },
      { title: 'Quarterly Progress Report Format', docNo: 'Form 4', type: 'Forms', category: 'ER&IPR', size: '145.22 KB', fileUrl: '', link: '' },
    ]);
  }

  // 10. SchemeService
  if ((await SchemeService.countDocuments()) === 0) {
    console.log('🌱 Seeding SchemeService...');
    await SchemeService.insertMany([
      { title: "DTTC", desc: "Defence Technology & Test Centre (DTTC)", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dttc" },
      { title: "DIA-CoEs", desc: "DRDO Industry Academia Centre of Excellence (DIA-CoEs)", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dia-coes" },
      { title: "TDF Projects", desc: "The Technology Development Fund (TDF)", link: "https://drdo.gov.in/drdo/en/offerings/projects" },
      { title: "Technology Foresight", desc: "Technology Foresight details", link: "https://drdo.gov.in/drdo/en/offerings/technology-foresight" },
      { title: "Certification Services", desc: "Certification Services", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/certification-services" }
    ]);
  }

  // 11. IndustrySupport
  if ((await IndustrySupport.countDocuments()) === 0) {
    console.log('🌱 Seeding IndustrySupport...');
    await IndustrySupport.insertMany([
      { title: "ToT", desc: "Transfer of Technologies", link: "https://drdo.gov.in/drdo/en/offerings/transfer-of-technologies" },
      { title: "Export - support", desc: "DRDO support industries in evolving the specifications of the export variant of the products (based on DRDO technology) to enable industries.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/export-support" },
      { title: "Startups Support", desc: "Spearheading the innovations under 'Make in India' programme through Technology Development Fund (TDF) and DRDO laboratories.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/startups-support" },
      { title: "Test Facilities", desc: "DRDO is developing critical defence technologies and systems to cater to the needs of Indian Armed Forces and other agencies.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/test-facilities" },
      { title: "Industry Interaction Group", desc: "Industry interaction initiatives, MoUs, seminars and vendor collaboration programmes.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/industry-interaction-group" },
      { title: "Products for Export", desc: "Catalogue of DRDO developed products cleared for export to friendly foreign nations.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/product-export" }
    ]);
  }

  // 12. CompetitionAward
  if ((await CompetitionAward.countDocuments()) === 0) {
    console.log('🌱 Seeding CompetitionAward...');
    await CompetitionAward.insertMany([
      { title: "National Technology Award", desc: "Award given to outstanding technology innovators and leaders.", link: "#", date: "11/05/2026", isArchive: false },
      { title: "DRDO Student Innovation Contest", desc: "Encouraging young innovators in defence sciences.", link: "#", date: "24/04/2026", isArchive: true }
    ]);
  }

  // 13. Product
  if ((await Product.countDocuments()) === 0) {
    console.log('🌱 Seeding Product...');
    await Product.insertMany([
      { title: 'High-g MEMS switches', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/mems.jpg' },
      { title: 'Pru-Decorp', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/pru.jpg' },
      { title: 'KADAM', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/kadam.jpg' },
      { title: 'ACADA', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/acada.jpg' },
      { title: 'HAPO Chamber', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/hapo.jpg' },
      { title: 'AIP System (Air Independent Propulsion)', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/aip.jpg' },
    ]);
  }

  // 14. Video
  if ((await Video.countDocuments()) === 0) {
    console.log('🌱 Seeding Video...');
    await Video.insertMany([
      { title: 'DRDO conducts successful flight trial of 1500-km range missile', dateStr: '11/03/2025', dateVal: 20250311, youtubeId: 'zfkJ1kA-kgA', href: 'https://www.youtube.com/watch?v=zfkJ1kA-kgA' },
      { title: 'SRIJAN Defence Establishment and Entrepreneurs Platform', dateStr: '31/10/2025', dateVal: 20251031, youtubeId: 'ArAaGdJhJSo', href: 'https://www.youtube.com/watch?v=ArAaGdJhJSo' },
      { title: 'Join DRDO', dateStr: '14/11/2024', dateVal: 20241114, youtubeId: '', href: 'https://drdo.gov.in/drdo/en/resources/video-gallery/join-drdo' },
    ]);
  }

  // 15. Conference
  if ((await Conference.countDocuments()) === 0) {
    console.log('🌱 Seeding Conference...');
    await Conference.insertMany([
      { title: 'DRDO is going to organise Unmesh-2027 Fourth All India Technical Rajbhasha Conference on Dated 10-11 January 2027', startDate: '14/05/2026', endDate: '11/01/2027', link: 'https://drdo.gov.in/drdo/en/announcement/drdo-going-organise-unmesh-2027-fourth-all-india-technical-rajbhasha-conference-dated' },
      { title: 'International Conference on Autonomous Aerial Vehicles ICAAV - 2026 On 20-21 Aug 2026 Jointly Organized by ADE-DRDO and Design Division-AeSI', startDate: '25/03/2026', endDate: '21/08/2026', link: 'https://www.ddaesi.in/icaav-2026' },
    ]);
  }

  // 16. ONOSPublisher
  if ((await ONOSPublisher.countDocuments()) === 0) {
    console.log('🌱 Seeding ONOSPublisher...');
    await ONOSPublisher.insertMany([
      { name: 'AAAS-Science', url: 'https://www.science.org/journal/science', order: 1 },
      { name: 'ACM Digital Library', url: 'http://dl.acm.org/', order: 2 },
      { name: 'American Chemical Society Journals', url: 'http://pubs.acs.org/', order: 3 },
      { name: 'IEEE Journals', url: 'http://ieeexplore.ieee.org/', order: 4 },
      { name: 'Elsevier ScienceDirect Journals', url: 'http://www.sciencedirect.com/', order: 5 },
      { name: 'Springer Nature Journals', url: 'https://link.springer.com/', order: 6 },
      { name: 'Wiley Journals', url: 'https://onlinelibrary.wiley.com/', order: 7 },
      { name: 'Oxford University Press Journals', url: 'https://academic.oup.com/journals/', order: 8 },
      { name: 'Taylor and Francis Journals', url: 'https://www.tandfonline.com/', order: 9 },
      { name: 'Cambridge University Press Journals', url: 'https://www.cambridge.org/core', order: 10 },
      { name: 'DRDO Research Journals', url: 'https://publicationsdrdo.in/', order: 11 },
      { name: 'IndianJournals.com', url: 'http://indianjournals.com/', order: 12 },
      { name: 'Sage Publishing Journals', url: 'http://journals.sagepub.com/', order: 13 },
      { name: 'Royal Society of Chemistry (RSC) Journals', url: 'https://pubs.rsc.org/en/journals', order: 14 },
      { name: 'Thieme Journals', url: 'https://www.thieme-connect.com/products/all/home.html', order: 15 },
    ]);
  }

  // 17. AboutDrdo
  if ((await AboutDrdo.countDocuments()) === 0) {
    console.log('🌱 Seeding About DRDO...');
    await AboutDrdo.create({
      vision: "Empowering the nation with state-of-the-art indigenous Defence and Security technologies and systems.",
      mission: [
        "Design & develop state of the art sensors, weapon systems, platforms & allied equipment in defense & security domains of land, air, sea, space & cyber.",
        "Facilitate production and induction of Systems & technologies developed through Department's R&D ecosystem.",
        "Provide technological solutions to the Services to enhance combat effectiveness.",
        "Nurture & Strengthen Defence R&D capability in Indian industry Science & Technology institutions & academia through collaboration.",
        "Development of infrastructure and test & evaluation facilities; design certification; skill development and strengthen human resources."
      ],
      aboutText: [
        "Defence Research & Development Organisation (DRDO) under the Department of Defence Research & Development (DD R&D) of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services.",
        "DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.",
        "\"Balasya Mulam Vigyanam\"—the source of strength is science-drives the nation in peace and war. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of military technologies.",
        "DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Army and the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10 establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories, achievements and stature.",
        "Today, DRDO is a network of around 41 laboratories and 05 DRDO Young Scientist Laboratories (DYSLs) which are deeply engaged in developing defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems, instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems and agriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are on hand and significant achievements have already been made in several such technologies."
      ],
      lastUpdated: "01 Jun 2026"
    });
  }

  // 18. TechCluster
  if ((await TechCluster.countDocuments()) === 0) {
    console.log('🌱 Seeding TechCluster...');
    await TechCluster.insertMany([
      {
        id: 'aeronautical-systems',
        name: 'Aeronautical Systems (Aero)',
        shortName: 'Aero',
        icon: '✈️',
        color: '#003a70',
        description: 'Aeronautical Systems cluster is engaged in the development of state-of-the-art unmanned Air Vehicles, Aero Gas Turbine Engine Technology, Airborne Surveillance Systems, Parachutes, Decelerators and various other airborne systems.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/aeronautical-systems',
        labs: ['ADE', 'CABS', 'CEMILAC', 'GTRE', 'NAL-DRDO'],
        focus: [
          'Unmanned Air Vehicles (UAVs)',
          'Aero Gas Turbine Engine Technology',
          'Airborne Surveillance Systems',
          'Parachutes & Decelerators',
          'Aeronautics Research & Development'
        ]
      },
      {
        id: 'armament-combat-engineering',
        name: 'Armament & Combat Engineering Systems (ACE)',
        shortName: 'ACE',
        icon: '🛡️',
        color: '#1a3a5c',
        description: 'Armament & Combat Engineering Systems (ACE) Cluster focuses on research & development of armaments, explosives, land based combat vehicles & engineering equipment. Labs under this cluster are engaged in development of weapons, explosives, vehicle systems and combat engineering solutions.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/armament-combat-engineering-systems',
        labs: ['ARDE', 'CFEES', 'CVRDE', 'HEMRL', 'TBR&L'],
        focus: [
          'Armaments & Weapons Systems',
          'Explosives & Propellants',
          'Land-based Combat Vehicles',
          'Engineering Equipment',
          'Fire Safety & Survivability'
        ]
      },
      {
        id: 'electronics-communication-systems',
        name: 'Electronics and Communication Systems (ECS)',
        shortName: 'ECS',
        icon: '📡',
        color: '#0d5c75',
        description: 'ECS Cluster has a mandate to design and develop electronic, electro-optical and laser based sensors and systems. The Cluster consists of laboratories DARE, DEAL, DLRL, IRDE, LASTEC, LRDE and others engaged in cutting-edge electronics and communication research.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/electronics-and-communication-systems',
        labs: ['DARE', 'DEAL', 'DLRL', 'IRDE', 'LASTEC', 'LRDE'],
        focus: [
          'Electronic Warfare Systems',
          'Electro-optical Sensors',
          'Laser-based Systems',
          'Radar Development',
          'Communication Systems'
        ]
      },
      {
        id: 'micro-electronic-devices',
        name: 'Micro Electronic Devices, Computational Systems & Cyber Security (MCC)',
        shortName: 'MCC',
        icon: '💻',
        color: '#114b5f',
        description: 'The MCC Cluster encompasses two areas viz. Micro Electronic Devices (MED) and Computational Systems & Cyber Security. The Micro Electronic Devices (MED) sub-cluster focuses on thrust areas of semiconductor devices, microelectronics, and cyber security.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/electronics-and-communication-systems',
        labs: ['CAIR', 'CEERI', 'CHESS', 'DYSL-QT', 'SAG'],
        focus: [
          'Micro Electronic Devices',
          'Semiconductor Technologies',
          'Computational Systems',
          'Cyber Security',
          'Artificial Intelligence & Robotics'
        ]
      },
      {
        id: 'missiles-strategic-systems',
        name: 'Missiles and Strategic Systems (MSS)',
        shortName: 'MSS',
        icon: '🚀',
        color: '#1a5276',
        description: 'MSS Cluster is responsible for the design and development of state-of-the-art Missiles and Strategic Systems required for the deterrence and defence of the country. The Cluster comprises of five premier laboratories developing missiles, strategic systems and associated technologies.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/missiles-and-strategic-systems',
        labs: ['ADRDE', 'ASL', 'DRDL', 'RCI', 'SSPD'],
        focus: [
          'Ballistic Missiles (Agni, Prithvi)',
          'Cruise Missiles',
          'Anti-tank Missiles',
          'Hypersonic Technologies',
          'Strategic Defence Systems'
        ]
      },
      {
        id: 'naval-systems-materials',
        name: 'Naval Systems and Materials (NS & M)',
        shortName: 'NS&M',
        icon: '⚓',
        color: '#1a4a6b',
        description: 'The Naval Systems & Materials (NS & M) Cluster comprises of six laboratories - Naval Physical & Oceanographic Laboratory (NPOL) at Kochi, Naval Science & Technological Laboratory (NSTL) at Visakhapatnam and others developing advanced naval warfare technologies.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/naval-systems-and-materials',
        labs: ['NMRL', 'NPOL', 'NSTL', 'DMSRDE', 'DTRL'],
        focus: [
          'Naval Warfare Systems',
          'Underwater Sensors & Acoustics',
          'Torpedoes & Mines',
          'Advanced Materials',
          'Oceanographic Systems'
        ]
      },
      {
        id: 'soldier-support-system',
        name: 'Soldier Support System (SSS)',
        shortName: 'SSS',
        icon: '🧬',
        color: '#1d6a4a',
        description: 'Equipping the Services with the best, cutting-edge weapon systems and platforms do not really achieve their intended purpose until the integral human component of the war machine is also optimized. The SSS Cluster focuses on life sciences, food, environment and medicine for defence personnel.',
        href: 'https://drdo.gov.in/drdo/en/organisation/technology-cluster/life-sciences',
        labs: ['DFRL', 'DIBER', 'DIPAS', 'DIPR', 'DRDE', 'INMAS'],
        focus: [
          'Defence Food Research',
          'Bio-medical Sciences',
          'High Altitude Medicine',
          'Human Performance Optimisation',
          'NBC Protection'
        ]
      }
    ]);
  }

  // 19. CorporateCluster
  if ((await CorporateCluster.countDocuments()) === 0) {
    console.log('🌱 Seeding CorporateCluster...');
    await CorporateCluster.insertMany([
      {
        id: 'technology-management',
        name: 'Technology Management (TM)',
        shortName: 'TM',
        icon: '🔬',
        color: '#003a70',
        description: 'The cluster has a mandate to create a research ecosystem in the academia, research institutions and industry for meeting the science and technology needs of defence and security of the nation.',
        href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/technology-management',
        directorGeneral: {
          title: 'Director General',
          name: 'Technology Management',
          address: 'Room No. 301, 3rd Floor, DRDO Bhawan,\nRajaji Marg, New Delhi- 110 011',
          phone: '011 - 23013476',
          fax: '011 - 23013472',
          email: 'dgtm.hqr@gov.in'
        },
        directorates: [
          {
            name: 'Directorate of Extramural Research & Intellectual Property Rights (ER&IPR)',
            address: 'Room No. 510, DRDO HQ Annexe,\nMetcalfe House, Civil Lines, Delhi-110054',
            fax: '011 - 23902719',
            email: 'erip-er.hqr@gov.in (Extramural Projects) / erip-ipr.hqr@gov.in (IPR)'
          },
          {
            name: 'Directorate of Futuristic Technology Management (DFTM)',
            address: 'Room No. 309, 3rd Floor, DRDO HQ Annexe (Old Lastec Building)\nMetcalfe House, Civil Lines, Delhi 110054',
            phone: '011 - 23902792',
            fax: '011 - 23902797, 23792946',
            email: 'directorftm.hqr@gov.in'
          },
          {
            name: 'Directorate of Technology Development Fund (DTDF)',
            address: 'DRDO Bhawan\nRajaji Marg, New Delhi - 110011',
            phone: '011 - 23007794',
            email: 'director.tdf.hqr@gov.in'
          }
        ],
        focus: [
          'Extramural Research Funding',
          'Intellectual Property Rights (IPR)',
          'Technology Development Fund (TDF)',
          'Futuristic Technology Management',
          'Academia–Defence Interface'
        ]
      },
      {
        id: 'production-coordination',
        name: 'Production Coordination & Services Interaction (PC&SI)',
        shortName: 'PC&SI',
        icon: '🏭',
        color: '#1a3a5c',
        description: 'The Cluster of Production Coordination & Services Interaction (PC&SI) formulates policies for facilitating faster induction of DRDO developed systems by Armed Forces; advocating DRDO products to Services and MoD.',
        href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/production-coordination-services-interaction',
        directorGeneral: {
          title: 'Director General',
          name: 'Production Coordination & Services Interaction (PC&SI)',
          address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
          phone: '011 - 23016132',
          fax: '011 - 23016127',
          email: 'dgpcsi.hqr@gov.in'
        },
        directorates: [
          {
            name: 'Directorate of Industry Interface & Quality Management (DIIQM)',
            address: 'Room No 447, DRDO Bhawan, DRDO HQrs,\nRajaji Marg, New Delhi-110011',
            phone: '011 - 23013209, 23015291',
            fax: '011 - 23793008',
            email: 'director-diiqm-hqr@gov.in'
          },
          {
            name: 'Directorate of Technology Development & Transfer (DTDT)',
            address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
            phone: '011 - 23007325',
            fax: '011 - 23013462',
            email: 'dtdt.hqr@gov.in'
          }
        ],
        focus: [
          'Induction of DRDO Systems by Armed Forces',
          'Industry Coordination & Production',
          'Technology Export Facilitation',
          'Coordination with MoD, DDP, OFB',
          'Quality Management'
        ]
      },
      {
        id: 'resource-management',
        name: 'Resource & Management (R&M)',
        shortName: 'R&M',
        icon: '📊',
        color: '#0d5c75',
        description: 'R&M is the nodal cluster for the resource management of DRDO and deals in the planning and execution of projects and programmes taken up by the organization. It is responsible for financial planning, resource allocation and project monitoring.',
        href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/resource-management',
        directorGeneral: {
          title: 'Director General',
          name: 'Resource & Management (R&M)',
          address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
          phone: '011 - 23019134',
          fax: '011 - 23015637',
          email: 'dgrm.hqr@gov.in'
        },
        directorates: [
          {
            name: 'Directorate of Finance',
            address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
            phone: '011 - 23013200',
            fax: '011 - 23015220',
            email: 'findir.hqr@gov.in'
          },
          {
            name: 'Directorate of Works & Estates',
            address: 'DRDO Bhawan, Rajaji Marg,\nNew Delhi-110011',
            phone: '011 - 23013400',
            fax: '011 - 23015414',
            email: 'dwe.hqr@gov.in'
          }
        ],
        focus: [
          'Financial Planning & Resource Allocation',
          'Project Monitoring & Management',
          'Infrastructure Development',
          'Works & Estates Management',
          'Budget & Accounts Management'
        ]
      },
      {
        id: 'human-resources',
        name: 'Human Resources (HR)',
        shortName: 'HR',
        icon: '👥',
        color: '#114b5f',
        description: 'HR cluster is responsible for HR planning, organization in recruitment, selection, compensations, performance assessment, training and development of DRDO\'s human capital. The HR corporate addresses various aspects of acquisition, nurturing and retention of best available talent.',
        href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/human-resources',
        directorGeneral: {
          title: 'Director General',
          name: 'Human Resources (HR)',
          address: 'DRDO Bhawan, DRDO HQrs\nRajaji Marg, New Delhi-110 011',
          phone: '011 - 23016132, 23016163',
          fax: '011 - 23016127',
          email: 'dghr.hqr@gov.in'
        },
        focus: [
          'HR Planning & Recruitment',
          'Compensation & Performance Assessment',
          'Training & Development',
          'Establishment Policies',
          'Talent Acquisition & Retention'
        ]
      },
      {
        id: 'brahmos',
        name: 'BrahMos (BM)',
        shortName: 'BM',
        icon: '🚀',
        color: '#1a5276',
        description: 'BrahMos Aerospace is a joint venture between India\'s Defence Research and Development Organisation (DRDO) and Russia\'s NPO Mashinostroyenia. It produces the BrahMos supersonic cruise missile, the world\'s fastest operational supersonic cruise missile.',
        href: 'https://drdo.gov.in/drdo/en/organisation/corporate-clusters/brahmos-aerospace',
        externalLink: 'https://www.brahmos.com/',
        focus: [
          'BrahMos Supersonic Cruise Missile',
          'Multi-platform Launch Capability',
          'India–Russia Joint Venture',
          'Export of Defence Systems',
          'Next-generation Hypersonic Missile (BrahMos-II)'
        ]
      }
    ]);
  }

  // 20. Publication
  if ((await Publication.countDocuments()) === 0) {
    console.log('🌱 Seeding initial Publication data...');
    await Publication.insertMany([
      { title: 'DRDO Newsletter - June 2026: Celebrating National Technology Day & Defence Excellence', date: '01/06/2026', type: 'newsletter', size: '1.14 MB', fileUrl: '', link: '' },
      { title: 'DRDO Newsletter - May 2026: Advances in Drone and Anti-Drone Technologies', date: '01/05/2026', type: 'newsletter', size: '1.25 MB', fileUrl: '', link: '' },
      { title: 'Defence Science Journal - Vol. 76, No. 3: Special Issue on Hypersonic Aerodynamics', date: '15/05/2026', type: 'journals', size: '3.42 MB', fileUrl: '', link: '' },
      { title: 'DRDO Samachar - March-April 2026: Bi-Monthly Issue (Hindi)', date: '30/04/2026', type: 'samachar', size: '2.80 MB', fileUrl: '', link: '' },
      { title: 'Monograph: Flight Simulation and Control of Modern Fighter Aircraft', date: '10/01/2026', type: 'monograph', size: '12.4 MB', fileUrl: '', link: '' },
      { title: 'Technology Focus - May 2026: Advanced Composite Materials for Stealth Platforms', date: '12/05/2026', type: 'tech-focus', size: '2.10 MB', fileUrl: '', link: '' },
      { title: 'Prodhyogiki Vishesh - May 2026: Cyber Security Concepts (Hindi)', date: '20/05/2026', type: 'vishesh', size: '1.80 MB', fileUrl: '', link: '' },
      { title: 'DRDO Year Book 2025: Overviews and Profiles of All Labs', date: '12/01/2026', type: 'other', size: '15.2 MB', fileUrl: '', link: '' }
    ]);
  }

  // 21. Photo
  if ((await Photo.countDocuments()) === 0) {
    console.log('🌱 Seeding initial Photo Gallery data...');
    await Photo.insertMany([
      { caption: 'Photo Gallery: March and April 2026', category: 'Events', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/mems.jpg', date: '13/04/2026', link: '' },
      { caption: 'Photo Gallery: January and February 2026', category: 'Visits', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/mems.jpg', date: '19/02/2026', link: '' },
      { caption: 'Photo Gallery: November and December 2025', category: 'Inaugurations', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/mems.jpg', date: '08/12/2025', link: '' }
    ]);
  }

  // 22. ImportantLink
  if ((await ImportantLink.countDocuments()) === 0) {
    console.log('🌱 Seeding initial ImportantLink data...');
    await ImportantLink.insertMany([
      { label: 'RTI', url: 'https://drdo.gov.in/drdo/en/rti', order: 1 },
      { label: 'Feedback', url: 'https://drdo.gov.in/drdo/en/feedback', order: 2 },
      { label: 'Tenders', url: 'https://drdo.gov.in/drdo/en/tenders', order: 3 },
    ]);
  }

  // 23. PMMessage
  if ((await PMMessage.countDocuments()) === 0) {
    console.log('🌱 Seeding PMMessage...');
    await PMMessage.create({
      quote: "Proud of our DRDO scientists for Mission Divyastra, the first flight test of indigenously developed Agni-5 missile with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology.",
      name: "HON'BLE PM SHRI NARENDRA MODI",
      imageUrl: '',
      eventLink: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2013610&reg=3&lang=2',
    });
  }

  // 24. HomeMinister
  if ((await HomeMinister.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeMinister...');
    await HomeMinister.insertMany([
      { name: 'Shri Rajnath Singh', title: "HON'BLE RAKSHA MANTRI", imageUrl: '', order: 1 },
      { name: 'Shri Sanjay Seth', title: 'RAKSHA RAJYA MANTRI', imageUrl: '', order: 2 },
    ]);
  }

  // 25. HomeOffering
  if ((await HomeOffering.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeOffering...');
    await HomeOffering.insertMany([
      { tab: 'schemes', title: 'ToT', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/tot', order: 1 },
      { tab: 'schemes', title: 'DTTC', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dttc', order: 2 },
      { tab: 'schemes', title: 'DIA-CoEs', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dia-coes1', order: 3 },
      { tab: 'schemes', title: 'TDF Projects', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/tdf-projects', order: 4 },
      { tab: 'schemes', title: 'Technology Foresight', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/technology-foresight-0', order: 5 },
      { tab: 'schemes', title: 'DRDO Patents', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/drdo-patents', order: 6 },
      { tab: 'schemes', title: 'Export - Support', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/export-support', order: 7 },
      { tab: 'schemes', title: 'Certification Services', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/certification-services-1', order: 8 },
      { tab: 'schemes', title: 'Startups Support', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/startups-support', order: 9 },
      { tab: 'schemes', title: 'Test Facilities', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/test-facilities', order: 10 },
      { tab: 'schemes', title: 'Industry Interaction Group', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/industry-interaction-group', order: 11 },
      { tab: 'schemes', title: 'Product for Export', link: 'https://drdo.gov.in/drdo/en/offerings/schemes-and-services/product-for-export', order: 12 },
      { tab: 'vacancies', title: 'List of selected candidate for JRF/RA 2026 in DIPR, Delhi', link: 'https://drdo.gov.in/drdo/en/vacancies/list-selected-candidate-jrfra-2026-dipr-delhi', order: 1 },
      { tab: 'vacancies', title: 'DYSL-QT, Pune invites applications for JRF', link: 'https://drdo.gov.in/drdo/en/vacancies/dysl-qt-pune-invites-applications-jrf', order: 2 },
      { tab: 'vacancies', title: 'CABS, Bengaluru invites applications from eligible doctors', link: 'https://drdo.gov.in/drdo/en/vacancies/cabs-bengaluru-invites-applications-eligible-doctors', order: 3 },
      { tab: 'messageboard', title: 'Industry Interaction Group (IIG)', link: 'https://drdo.gov.in/drdo/en/message-board', order: 1 },
      { tab: 'messageboard', title: 'Unmesh-2027 Technical Rajbhasha Conference', link: 'https://drdo.gov.in/drdo/en/message-board', order: 2 },
      { tab: 'events', title: 'International Conference on Autonomous Aerial Vehicles', link: '#', order: 1 },
      { tab: 'events', title: 'Unmesh-2027 Conference', link: '#', order: 2 },
      { tab: 'keyproducts', title: 'Akash', link: 'https://drdo.gov.in/drdo/en/offerings/products/akash', order: 1 },
      { tab: 'keyproducts', title: 'BrahMos', link: 'https://drdo.gov.in/drdo/en/offerings/products/brahmos', order: 2 },
      { tab: 'keyproducts', title: 'Panchi', link: 'https://drdo.gov.in/drdo/en/offerings/products/panchi', order: 3 },
      { tab: 'keyproducts', title: 'Varunastra', link: 'https://drdo.gov.in/drdo/en/offerings/products/varunastra', order: 4 },
      { tab: 'productsexport', title: '2D Low Level Radar', link: 'https://drdo.gov.in/drdo/en/offerings/products-for-export/2d-low-level-radar-0', order: 1 },
      { tab: 'productsexport', title: '3D Low Level Radar Aslesha Mk I', link: 'https://drdo.gov.in/drdo/en/offerings/products-for-export/3d-low-level-radar-aslesha-mk-i', order: 2 },
    ]);
  }

  // 26. WhatsNew
  if ((await WhatsNew.countDocuments()) === 0) {
    console.log('🌱 Seeding WhatsNew...');
    await WhatsNew.insertMany([
      { text: 'Question Challenge portal for Tier-II CBT under CEPTAM-11 Advt.', link: 'https://cdn.digialm.com/EForms/configuredHtml/1258/96576/login.html', order: 1 },
      { text: 'Industry Interaction Group (IIG)', link: 'https://drdo.gov.in/drdo/en/announcement/industry-interaction-group-iig', order: 2 },
      { text: 'RAC invites applications for Scientist posts in the DRDS cadre of DRDO', link: 'https://drdo.gov.in/drdo/en/offerings/vacancies/rac-invites-applications-scientist-posts-drds-cadre-drdo', order: 3 },
      { text: 'NATIONAL TECHNOLOGY DAY: CELEBRATING THE SPIRIT OF INNOVATION & DEFENCE EXCELLENCE', link: 'https://drdo.gov.in/drdo/en/documents/publications/drdo-newsletter/drdo-newsletter-june-2026', order: 4 },
      { text: 'Final Answer Key for Tier-I CBT under CEPTAM-11', link: 'https://cdn.digialm.com/EForms/configuredHtml/1258/96724/login.html', order: 5 },
      { text: 'Expression of Interest (EoI) for Development of Indigenous Large Language Model', link: 'https://drdo.gov.in/drdo/en/eois/expression-interest-eoi-development-indigenous-large-language-model', order: 6 },
    ]);
  }

  // 27. HomeDocument
  if ((await HomeDocument.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeDocument...');
    await HomeDocument.insertMany([
      { title: 'DRDO in News', subtitle: 'DRDO News - 05 to 19 June 2026', link: 'https://drdo.gov.in/drdo/en/documents/drdo-in-news/drdo-news-05-19-june-2026', order: 1 },
      { title: 'Publication', subtitle: 'DRDO Samachar November 2021 (Hindi)', link: 'https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-november-2021-hindi', order: 2 },
      { title: 'Publication', subtitle: 'DRDO Samachar August 2021 (Hindi)', link: 'https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-august-2021-hindi', order: 3 },
      { title: 'Publication', subtitle: 'DRDO Samachar July 2021 (Hindi)', link: 'https://drdo.gov.in/drdo/en/documents/publications/drdo-samachar/drdo-samachar-july-2021-hindi', order: 4 },
    ]);
  }

  // 28. HomePersona
  if ((await HomePersona.countDocuments()) === 0) {
    console.log('🌱 Seeding HomePersona...');
    await HomePersona.insertMany([
      { title: 'Armed Force', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Armed-Forces', order: 1 },
      { title: 'Academia', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Academia', order: 2 },
      { title: 'Industry Partner', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Industry-Partner', order: 3 },
      { title: 'Skill Seeker', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Skill-Seeker', order: 4 },
      { title: 'Media', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Media', order: 5 },
      { title: 'Researcher', imageUrl: '', link: 'https://www.drdo.gov.in/drdo/persona-content/Researcher', order: 6 },
    ]);
  }

  // 29. HomeSocialMedia
  if ((await HomeSocialMedia.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeSocialMedia...');
    await HomeSocialMedia.insertMany([
      { platform: 'X', profileUrl: 'https://x.com/DRDO_India', imageUrl: '', order: 1 },
      { platform: 'Youtube', profileUrl: 'https://www.youtube.com/watch?v=TMWlA81SX78', imageUrl: '', order: 2 },
      { platform: 'Facebook', profileUrl: 'https://www.facebook.com/DPIDRDO', imageUrl: '', order: 3 },
      { platform: 'Instagram', profileUrl: 'https://www.instagram.com/dpi.drdo', imageUrl: '', order: 4 },
    ]);
  }

  // 30. HomeMediaSlide
  if ((await HomeMediaSlide.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeMediaSlide...');
    await HomeMediaSlide.insertMany([
      { imageUrl: '', link: 'https://drdo.gov.in/drdo/en/offerings/products/akash', order: 1 },
      { imageUrl: '', link: 'https://drdo.gov.in/drdo/en/offerings/products/brahmos', order: 2 },
      { imageUrl: '', link: 'https://drdo.gov.in/drdo/en/offerings/products/varunastra', order: 3 },
    ]);
  }

  // 31. HomeBottomLink
  if ((await HomeBottomLink.countDocuments()) === 0) {
    console.log('🌱 Seeding HomeBottomLink...');
    await HomeBottomLink.insertMany([
      { imageUrl: '', link: 'https://www.india.gov.in/', order: 1 },
      { imageUrl: '', link: 'https://www.gallantryawards.gov.in/', order: 2 },
      { imageUrl: '', link: 'https://indiainvestmentgrid.gov.in/', order: 3 },
      { imageUrl: '', link: 'https://www.eci.gov.in/', order: 4 },
      { imageUrl: '', link: 'https://pib.gov.in/', order: 5 },
      { imageUrl: '', link: 'https://wcd.nic.in/bbbp-schemes/', order: 6 },
      { imageUrl: '', link: 'https://www.digitalindia.gov.in/', order: 7 },
    ]);
  }

  // 32. TeamMember
  if ((await TeamMember.countDocuments()) === 0) {
    console.log('🌱 Seeding TeamMember...');
    await TeamMember.insertMany([
      { name: "Dr. B K Das", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Electronics and Communication Systems", order: 1 },
      { name: "Sh. Ummalaneni Raja Babu", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Missiles and Strategic Systems", order: 2 },
      { name: "Dr. Upendra Kumar Singh", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Soldier Support System", order: 3 },
      { name: "Dr. K Rajalakshmi Menon", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Aeronautical Systems", order: 4 },
      { name: "Sh. RVH Prasad", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Naval Systems and Materials", order: 5 },
      { name: "Sh. Prateek Kishore", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Armament & Combat Engineering Systems", order: 6 },
      { name: "Ms Sheena Rani R", designation: "Distinguished Scientist & Director General", category: "Technical", cluster: "Micro Electronic Devices, Computational Systems & Cyber Security", order: 7 },
      { name: "Sh. Mangal Lal Chand", designation: "Distinguished Scientist & Director General", category: "Corporate", cluster: "Technology Management", order: 8 },
      { name: "Dr. (Smt) Chandrika Kaushik", designation: "Distinguished Scientist & Director General", category: "Corporate", cluster: "Production Coordination & Services Interaction", order: 9 },
      { name: "Dr. Mayank Dwivedi", designation: "Outstanding Scientist & Director General", category: "Corporate", cluster: "Human Resources", order: 10 },
      { name: "Dr. Jaiteerth R. Joshi", designation: "Outstanding Scientist & Director General", category: "Corporate", cluster: "BrahMos", order: 11 },
      { name: "Dr. Ravindra Singh", designation: "Outstanding Scientist & Director General", category: "Corporate", cluster: "Resource & Management", order: 12 },
      { name: "Dr. Sanjai K Dwivedi", designation: "Scientist 'G' & Director", category: "Nodal", cluster: "-", order: 13 }
    ]);
  }

  // 33. Contact
  if ((await Contact.countDocuments()) === 0) {
    console.log('🌱 Seeding Contact...');
    await Contact.insertMany([
      { label: "1. DIIQM : For Queries Pertaining - Transfer of Technology (ToT), Product for Industry, Products for Export, Industry Interaction Group, Test facilities and Industry Support", org: "Directorate of Industry Interface & Quality Management (DIIQM)", phone: "011 - 23013209, 23015291", email: "director-diiqm-hqr@gov.in", order: 1 },
      { label: "2. DFTM : For Queries Pertaining - Advanced Technology Centres", org: "Directorate of Futuristic Technology Management (DFTM)", phone: "011 - 23007794", email: "", order: 2 },
      { label: "3. ER&IPR : For Queries Pertaining - Academia", org: "Directorate of Extramural Research & Intellectual Property Rights", phone: "011 - 23017661", email: "erip_er.hqr@gov.in", order: 3 },
      { label: "4. TDF : For Queries Pertaining - Technology Development Fund", org: "Technology Development Fund", phone: "011 - 23007325", email: "", order: 4 },
      { label: "5. RTI Cell : For Queries Pertaining - Right to Information Act", org: "RTI Cell, DRDO HQ", phone: "011 - 23015433", email: "", order: 5 },
      { label: "6. CEPTAM : For Queries Pertaining - Recruitment & Assessment of Technical Cadre", org: "Centre for Personnel Talent Management", phone: "011 - 23882323", email: "", order: 6 },
      { label: "7. RAC : For Queries Pertaining - Recruitment & Assessment of Scientific Cadre", org: "Recruitment and Assessment Centre", phone: "011 - 23817833", email: "director.rac@gov.in", order: 7 },
      { label: "8. DPI : For Queries Pertaining - Public Relations & Social Media", org: "Directorate of Public Interface", phone: "011 - 23011073", email: "dpidrdo.hqr@gov.in", order: 8 },
      { label: "9. DESIDOC : For Queries Pertaining - DRDO Website", org: "Defence Scientific Information & Documentation Centre", phone: "011 - 23812252", email: "director.desidoc@gov.in", order: 9 },
      { label: "10. DTTC : For Queries Pertaining - Testing, Consultation & Incubation", org: "Defence Technology & Test Centre", phone: "0522-2317619", email: "dttc-drdo@gov.in", order: 10 },
      { label: "11. DRDO HQ : Headquarters Contact Information", org: "Defence Research and Development Organisation", phone: "", email: "", order: 11 }
    ]);
  }

  // 34. RtiStat
  if ((await RtiStat.countDocuments()) === 0) {
    console.log('🌱 Seeding RtiStat...');
    await RtiStat.insertMany([
      { title: "RTI Applications", label1: "Received", value1: "579", label2: "Disposed", value2: "565", order: 1 },
      { title: "RTI First Appeals", label1: "Received", value1: "54", label2: "Orders Issued", value2: "54", order: 2 },
      { title: "RTI Second Appeals", label1: "Received", value1: "66", label2: "Disposed", value2: "66", order: 3 },
      { title: "Parliament Questions", label1: "Questions Asked", value1: "242", label2: "Replies Given", value2: "206", order: 4 }
    ]);
  }

  // 35. RtiDocument
  if ((await RtiDocument.countDocuments()) === 0) {
    console.log('🌱 Seeding RtiDocument...');
    await RtiDocument.insertMany([
      { title: "Public Authorities under DRDO", description: "List of Public Information Officers & Appellate Authorities at DRDO HQs", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Public_Authorities_under_DRDO_12_06_2026.pdf", order: 1 },
      { title: "RTI Officials at DRDO HQ", description: "List of PIOs & First Appellate Authorities at DRDO HQs", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/RTI_Officials_at_DRDO_HQ_12_06_2026.pdf", order: 2 },
      { title: "RTI Act 2005 (English & Hindi)", description: "Right to Information Act, 2005", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/RTI_Act_2005_12_06_2026.pdf", order: 3 },
      { title: "How to Submit RTI Form & Fee", description: "Guidelines for RTI submission and fee payment", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/How_to_Submit_RTI_Form_Fee_12_06_2026.pdf", order: 4 },
      { title: "Exemption under RTI Act 2005", description: "RTI exemptions applicable to DRDO", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Exemption_under_RTI_Act_2005_12_06_2026.pdf", order: 5 },
      { title: "Guidelines for Information Seekers", description: "Information seeker guidelines", link: "https://drdo.gov.in/drdo/sites/default/files/Basic-PDF/Guidelines_for_Information_Seeders_12_06_2026.pdf", order: 6 }
    ]);
  }

  console.log('✅ Seed complete');
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 DRDO Admin API → http://localhost:${PORT}`);
    console.log(`   Auth: admin / admin@123`);
  });
}

module.exports = app;
