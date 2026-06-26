import { API_BASE_URL } from '../apiConfig';

const BASE = API_BASE_URL;

// ── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('drdo_admin_token');

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
}
function authHeadersNoContent() {
  return { Authorization: `Bearer ${getToken()}` };
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function login(username, password) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('drdo_admin_token', data.token);
  return data;
}

export function logout() { localStorage.removeItem('drdo_admin_token'); }

export async function verifyToken() {
  if (!getToken()) return false;
  try {
    const res = await fetch(`${BASE}/admin/verify`, { headers: authHeaders() });
    return res.ok;
  } catch { return false; }
}

export async function getStats() {
  const res = await fetch(`${BASE}/admin/stats`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Stats failed');
  return res.json();
}

// ── File uploads ──────────────────────────────────────────────────────────────
export async function uploadFile(type, file) {
  // type: 'image' | 'pdf'
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE}/upload/${type}`, {
    method: 'POST',
    headers: authHeadersNoContent(),
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data; // { url, size? }
}

// ── Generic CRUD factory ──────────────────────────────────────────────────────
function makeCrud(endpoint) {
  return {
    getAll:  ()        => fetch(`${BASE}/${endpoint}`).then(r => r.json()),
    create:  (body)    => fetch(`${BASE}/${endpoint}`,       { method: 'POST',   headers: authHeaders(), body: JSON.stringify(body) }).then(r => r.json()),
    update:  (id, body)=> fetch(`${BASE}/${endpoint}/${id}`, { method: 'PUT',    headers: authHeaders(), body: JSON.stringify(body) }).then(r => r.json()),
    remove:  (id)      => fetch(`${BASE}/${endpoint}/${id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json()),
  };
}

export const DrdoInNewsApi     = makeCrud('drdo-in-news');
export const PressReleaseApi   = makeCrud('press-release');
export const ActsPoliciesApi   = makeCrud('acts-policies');
export const VacanciesApi      = makeCrud('vacancies');
export const HeroSlidesApi     = makeCrud('hero-slides');
export const NewsTickerApi     = makeCrud('news-ticker');
export const PhotosApi         = makeCrud('photos');
export const PublicationsApi   = makeCrud('publications');
export const FaqsApi           = makeCrud('faqs');
export const ImportantLinksApi = makeCrud('important-links');
export const AvalancheApi      = makeCrud('avalanche-bulletin');
export const FormsManualsApi   = makeCrud('forms-manuals');
export const SchemeServiceApi  = makeCrud('schemes-services');
export const IndustrySupportApi = makeCrud('industry-support');
export const CompetitionsAwardsApi = makeCrud('competitions-awards');
export const ProductsApi       = makeCrud('products');
export const VideosApi         = makeCrud('videos');
export const ConferencesApi    = makeCrud('conferences');
export const ONOSPublisherApi  = makeCrud('onos-publishers');
export const AboutDrdoApi       = makeCrud('about-drdo');
export const TechClusterApi     = makeCrud('tech-clusters');
export const CorporateClusterApi = makeCrud('corporate-clusters');
export const PMMessageApi       = makeCrud('pm-message');
export const HomeMinisterApi    = makeCrud('home-ministers');
export const HomeOfferingApi    = makeCrud('home-offerings');
export const WhatsNewApi        = makeCrud('whats-new');
export const HomeDocumentApi    = makeCrud('home-documents');
export const HomePersonaApi     = makeCrud('home-personas');
export const HomeSocialMediaApi = makeCrud('home-social-media');
export const HomeMediaSlideApi  = makeCrud('home-media-slides');
export const HomeBottomLinkApi  = makeCrud('home-bottom-links');
