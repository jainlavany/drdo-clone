// Section configurations: fields, column headers, empty rows, row renderers
// Each field: { key, label, type, options, placeholder, rowStart, rowEnd, searchable, sizeKey }

const SERVER = window.SERVER_BASE_URL || 'http://localhost:4000';

function link(url) {
  if (!url) return <span style={{ color: '#d1d5db' }}>—</span>;
  const href = url.startsWith('http') ? url : `${SERVER}${url}`;
  return <a href={href} target="_blank" rel="noreferrer" style={{ color: '#1e4e8c', fontSize: '0.78rem' }}>🔗 View</a>;
}

function trunc(text, n = 60) {
  if (!text) return <span style={{ color: '#d1d5db' }}>—</span>;
  return <span title={text}>{String(text).length > n ? String(text).slice(0, n) + '…' : text}</span>;
}

function badge(text, cls) {
  return <span className={`adm-badge ${cls}`}>{text}</span>;
}

// ── DRDO In News ─────────────────────────────────────────────────────────────
export const NEWS_CFG = {
  fields: [
    { key: 'title',   label: 'Title',            type: 'textarea' },
    { key: 'date',    label: 'Date (DD/MM/YYYY)', placeholder: '04/06/2026', rowStart: true },
    { key: 'size',    label: 'File Size',          placeholder: '2.10 MB', rowEnd: true },
    { key: 'link',    label: 'External Link (URL)', type: 'url', placeholder: 'https://…' },
    { key: 'fileUrl', label: 'PDF File',            type: 'pdf', sizeKey: 'size' },
  ],
  colHeaders: ['Title', 'Date', 'Size', 'File/Link'],
  emptyRow:   { title: '', date: '', timestamp: 0, size: '', fileUrl: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.size || '—'}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Press Release ────────────────────────────────────────────────────────────
export const PRESS_CFG = {
  fields: [
    { key: 'title',   label: 'Title',            type: 'textarea' },
    { key: 'date',    label: 'Date (DD/MM/YYYY)', placeholder: '06/05/2026', rowStart: true },
    { key: 'link',    label: 'External Link',     rowEnd: true, type: 'url' },
    { key: 'fileUrl', label: 'PDF File',          type: 'pdf' },
  ],
  colHeaders: ['Title', 'Date', 'Link / File'],
  emptyRow:   { title: '', date: '', timestamp: 0, link: '', fileUrl: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Acts & Policies ──────────────────────────────────────────────────────────
const TYPE_OPTIONS = ['Guidelines', 'Policies', 'Patents', 'Transfer of Technology', 'Other'];
const TYPE_BADGE   = { Guidelines: 'adm-badge-green', Policies: 'adm-badge-blue', Patents: 'adm-badge-teal', 'Transfer of Technology': 'adm-badge-orange', Other: '' };

export const ACTS_CFG = {
  fields: [
    { key: 'title',   label: 'Title',            type: 'textarea' },
    { key: 'date',    label: 'Date (DD/MM/YYYY)', placeholder: '13/01/2026', rowStart: true },
    { key: 'type',    label: 'Type', type: 'select', options: TYPE_OPTIONS, rowEnd: true },
    { key: 'size',    label: 'File Size', placeholder: '1.25 MB' },
    { key: 'link',    label: 'External Link',     type: 'url', placeholder: 'https://…' },
    { key: 'fileUrl', label: 'PDF File',           type: 'pdf', sizeKey: 'size' },
  ],
  colHeaders: ['Title', 'Date', 'Type', 'File/Link'],
  emptyRow:   { title: '', date: '', timestamp: 0, type: 'Guidelines', size: '', fileUrl: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date}</td>
    <td>{badge(item.type, TYPE_BADGE[item.type] || '')}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Vacancies ────────────────────────────────────────────────────────────────
export const VAC_CFG = {
  fields: [
    { key: 'title',         label: 'Title',       type: 'textarea' },
    { key: 'advtNo',        label: 'Advt. No.',   placeholder: 'RAC/SCIENTIST/2026', rowStart: true },
    { key: 'publishedDate', label: 'Published Date', placeholder: '04/06/2026', rowEnd: true },
    { key: 'startDate',     label: 'Start Date',  placeholder: '04/06/2026', rowStart: true },
    { key: 'endDate',       label: 'End Date',    placeholder: '10/07/2026', rowEnd: true },
    { key: 'snippet',       label: 'Description', type: 'textarea' },
    { key: 'link',          label: 'Apply Link',  type: 'url', placeholder: 'https://rac.gov.in/…' },
    { key: 'fileUrl',       label: 'PDF / Notice File', type: 'pdf' },
  ],
  colHeaders: ['Title', 'Advt. No.', 'Published', 'End Date', 'Link'],
  emptyRow:   { title: '', advtNo: '', publishedDate: '', dateVal: 0, startDate: '', endDate: '', snippet: '', link: '', fileUrl: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.78rem' }}>{item.advtNo}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.publishedDate}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.endDate || '—'}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Hero Slides ──────────────────────────────────────────────────────────────
export const HERO_CFG = {
  fields: [
    { key: 'title',    label: 'Slide Title' },
    { key: 'subtitle', label: 'Subtitle / Description' },
    { key: 'link',     label: 'Click URL', type: 'url', placeholder: 'https://…' },
    { key: 'order',    label: 'Order (1, 2, 3…)', type: 'number', placeholder: '1' },
    { key: 'imageUrl', label: 'Slide Image', type: 'image' },
  ],
  colHeaders: ['Title', 'Subtitle', 'Order', 'Image'],
  emptyRow:   { title: '', subtitle: '', imageUrl: '', link: '#', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.subtitle, 50)}</td>
    <td style={{ color: '#6b7280' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── News Ticker ──────────────────────────────────────────────────────────────
export const TICKER_CFG = {
  fields: [
    { key: 'text',   label: 'Ticker Text', type: 'textarea' },
    { key: 'link',   label: 'Link URL',    type: 'url', placeholder: 'https://… or #' },
    { key: 'order',  label: 'Order',       type: 'number', rowStart: true },
    { key: 'active', label: 'Active',      type: 'checkbox', rowEnd: true },
  ],
  colHeaders: ['Text', 'Link', 'Active'],
  emptyRow:   { text: '', link: '#', active: true, order: 0 },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.text)}</td>
    <td>{link(item.link)}</td>
    <td>{item.active ? badge('Active', 'adm-badge-green') : badge('Hidden', '')}</td>
  </>),
};

// ── Photos ───────────────────────────────────────────────────────────────────
export const PHOTO_CFG = {
  fields: [
    { key: 'caption',  label: 'Caption' },
    { key: 'category', label: 'Category', placeholder: 'Events, Labs, etc.', rowStart: true },
    { key: 'date',     label: 'Date',     placeholder: 'DD/MM/YYYY', rowEnd: true },
    { key: 'link',     label: 'Link URL', type: 'url' },
    { key: 'imageUrl', label: 'Photo',    type: 'image' },
  ],
  colHeaders: ['Caption', 'Category', 'Date', 'Image'],
  emptyRow:   { caption: '', category: 'General', imageUrl: '', date: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.caption, 50)}</td>
    <td>{badge(item.category || 'General', 'adm-badge-teal')}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.date || '—'}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Publications ─────────────────────────────────────────────────────────────
export const PUB_CFG = {
  fields: [
    { key: 'title', label: 'Title', type: 'textarea' },
    { key: 'type',  label: 'Category', type: 'select', options: ['newsletter', 'journals', 'samachar', 'monograph', 'tech-focus', 'vishesh', 'other'], rowStart: true },
    { key: 'date',  label: 'Date (DD/MM/YYYY)', placeholder: '01/01/2026', rowEnd: true },
    { key: 'size',  label: 'File Size', placeholder: '2.50 MB', rowStart: true },
    { key: 'link',  label: 'External Link', type: 'url', placeholder: 'https://…', rowEnd: true },
    { key: 'fileUrl', label: 'PDF File', type: 'pdf', sizeKey: 'size' },
  ],
  colHeaders: ['Title', 'Date', 'Category', 'Size', 'File/Link'],
  emptyRow:   { title: '', date: '', timestamp: 0, type: 'newsletter', size: '', fileUrl: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date}</td>
    <td>{badge(item.type || 'newsletter', 'adm-badge-blue')}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.size || '—'}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── FAQs ─────────────────────────────────────────────────────────────────────
export const FAQ_CFG = {
  fields: [
    { key: 'question', label: 'Question', type: 'textarea' },
    { key: 'answer',   label: 'Answer',   type: 'textarea' },
    { key: 'order',    label: 'Order',    type: 'number', rowStart: true, placeholder: '1' },
    { key: 'active',   label: 'Active',   type: 'checkbox', rowEnd: true },
  ],
  colHeaders: ['Question', 'Answer (preview)', 'Active'],
  emptyRow:   { question: '', answer: '', order: 0, active: true },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.question, 60)}</td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.answer, 60)}</td>
    <td>{item.active ? badge('Active', 'adm-badge-green') : badge('Hidden', '')}</td>
  </>),
};

// ── Important Links ──────────────────────────────────────────────────────────
export const LINKS_CFG = {
  fields: [
    { key: 'label',    label: 'Link Label' },
    { key: 'url',      label: 'URL', type: 'url', placeholder: 'https://…' },
    { key: 'order',    label: 'Order', type: 'number', rowStart: true, placeholder: '1' },
    { key: 'imageUrl', label: 'Icon / Image', type: 'image', rowEnd: true },
  ],
  colHeaders: ['Label', 'URL', 'Order', 'Icon'],
  emptyRow:   { label: '', url: '', imageUrl: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.label}</strong></td>
    <td className="trunc">{link(item.url)}</td>
    <td style={{ color: '#6b7280' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Avalanche Warning Bulletin ────────────────────────────────────────────────
export const AVALANCHE_CFG = {
  fields: [
    { key: 'title',   label: 'Title',              type: 'textarea' },
    { key: 'date',    label: 'Date (DD-MM-YYYY)',   placeholder: '03-06-2026', rowStart: true },
    { key: 'size',    label: 'File Size',            placeholder: '745.46 KB',  rowEnd: true },
    { key: 'link',    label: 'External Link (URL)', type: 'url', placeholder: 'https://drdo.gov.in/…' },
    { key: 'fileUrl', label: 'PDF File',             type: 'pdf', sizeKey: 'size' },
  ],
  colHeaders: ['Title', 'Date', 'Size', 'File / Link'],
  emptyRow:   { title: '', date: '', timestamp: 0, size: '', fileUrl: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.size || '—'}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Forms and Manuals ─────────────────────────────────────────────────────────
const FM_TYPE_OPTIONS     = ['Forms', 'Manuals', 'Other'];
const FM_CATEGORY_OPTIONS = ['DIA-CoEs', 'ER&IPR', 'Procurement', 'Admin', 'General'];
const FM_TYPE_BADGE       = { Forms: 'adm-badge-blue', Manuals: 'adm-badge-teal', Other: '' };

export const FM_CFG = {
  fields: [
    { key: 'title',    label: 'Title',    type: 'textarea' },
    { key: 'docNo',    label: 'Doc No.',  placeholder: 'Form 1 / ER-03 / —', rowStart: true },
    { key: 'type',     label: 'Type',     type: 'select', options: FM_TYPE_OPTIONS,     rowEnd: true },
    { key: 'category', label: 'Category', type: 'select', options: FM_CATEGORY_OPTIONS, rowStart: true },
    { key: 'size',     label: 'File Size', placeholder: '250.00 KB',                   rowEnd: true },
    { key: 'link',     label: 'External Link (URL)', type: 'url', placeholder: 'https://drdo.gov.in/…' },
    { key: 'fileUrl',  label: 'PDF File', type: 'pdf', sizeKey: 'size' },
  ],
  colHeaders: ['Title', 'Doc No.', 'Type', 'Category', 'File / Link'],
  emptyRow:   { title: '', docNo: '—', type: 'Forms', category: 'General', size: '', fileUrl: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.78rem' }}>{item.docNo || '—'}</td>
    <td>{badge(item.type, FM_TYPE_BADGE[item.type] || '')}</td>
    <td>{badge(item.category || 'General', 'adm-badge-orange')}</td>
    <td>{link(item.fileUrl || item.link)}</td>
  </>),
};

// ── Schemes and Services ──────────────────────────────────────────────────────
export const SCHEME_CFG = {
  fields: [
    { key: 'title', label: 'Scheme Title',      placeholder: 'DTTC / TDF Projects' },
    { key: 'desc',  label: 'Short Description',  type: 'textarea', placeholder: 'Defence Technology & Test Centre' },
    { key: 'link',  label: 'Web Link (URL)',    type: 'url', placeholder: 'https://…' },
  ],
  colHeaders: ['Title', 'Description', 'Link'],
  emptyRow:   { title: '', desc: '', link: '' },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.desc, 70)}</td>
    <td>{link(item.link)}</td>
  </>),
};

// ── Industry Support ──────────────────────────────────────────────────────────
export const IND_SUPPORT_CFG = {
  fields: [
    { key: 'title', label: 'Industry Support Item Title', placeholder: 'ToT / Startups Support' },
    { key: 'desc',  label: 'Short Description',           type: 'textarea', placeholder: 'Transfer of Technologies' },
    { key: 'link',  label: 'Web Link (URL)',              type: 'url', placeholder: 'https://…' },
  ],
  colHeaders: ['Title', 'Description', 'Link'],
  emptyRow:   { title: '', desc: '', link: '' },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.desc, 70)}</td>
    <td>{link(item.link)}</td>
  </>),
};

// ── Competitions and Awards ───────────────────────────────────────────────────
export const AWARD_CFG = {
  fields: [
    { key: 'title',     label: 'Award / Competition Title', type: 'textarea' },
    { key: 'desc',      label: 'Description',               type: 'textarea' },
    { key: 'link',      label: 'Info Link (URL)',           type: 'url', placeholder: 'https://…' },
    { key: 'date',      label: 'Date (DD/MM/YYYY)',         placeholder: '11/05/2026', rowStart: true },
    { key: 'isArchive', label: 'Move to Archive?',          type: 'checkbox',          rowEnd: true },
  ],
  colHeaders: ['Title', 'Date', 'Archive Status', 'Link'],
  emptyRow:   { title: '', desc: '', link: '', date: '', isArchive: false },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.date || '—'}</td>
    <td>{item.isArchive ? badge('Archived', 'adm-badge-blue') : badge('Active', 'adm-badge-green')}</td>
    <td>{link(item.link)}</td>
  </>),
};

// ── Products ──────────────────────────────────────────────────────────────────
export const PRODUCT_CFG = {
  fields: [
    { key: 'title',    label: 'Product Name' },
    { key: 'imageUrl', label: 'Product Image', type: 'image' },
  ],
  colHeaders: ['Product Name', 'Image Link'],
  emptyRow:   { title: '', imageUrl: '' },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Video Gallery ─────────────────────────────────────────────────────────────
export const VIDEO_CFG = {
  fields: [
    { key: 'title',     label: 'Video Title',              type: 'textarea' },
    { key: 'dateStr',   label: 'Date (DD/MM/YYYY)',         placeholder: '11/03/2025', rowStart: true },
    { key: 'dateVal',   label: 'Sort Value (YYYYMMDD)',     placeholder: '20250311',   rowEnd: true },
    { key: 'youtubeId', label: 'YouTube Video ID',          placeholder: 'zfkJ1kA-kgA (leave blank if no YouTube)' },
    { key: 'href',      label: 'Full Video / Page URL',     type: 'url', placeholder: 'https://www.youtube.com/watch?v=…' },
  ],
  colHeaders: ['Title', 'Date', 'YouTube ID', 'Link'],
  emptyRow:   { title: '', dateStr: '', dateVal: 0, youtubeId: '', href: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.dateStr || '—'}</td>
    <td style={{ color: '#6b7280', fontSize: '0.78rem' }}>{item.youtubeId || <span style={{ color: '#d1d5db' }}>—</span>}</td>
    <td>{link(item.href)}</td>
  </>),
};

// ── Conference ────────────────────────────────────────────────────────────────
export const CONFERENCE_CFG = {
  fields: [
    { key: 'title',     label: 'Conference Title',         type: 'textarea' },
    { key: 'startDate', label: 'Start Date (DD/MM/YYYY)',  placeholder: '25/03/2026', rowStart: true },
    { key: 'endDate',   label: 'End Date (DD/MM/YYYY)',    placeholder: '21/08/2026', rowEnd: true },
    { key: 'link',      label: 'Info / Register Link',     type: 'url', placeholder: 'https://…' },
  ],
  colHeaders: ['Title', 'Start Date', 'End Date', 'Link'],
  emptyRow:   { title: '', startDate: '', endDate: '', link: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.title)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.startDate || '—'}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{item.endDate || '—'}</td>
    <td>{link(item.link)}</td>
  </>),
};

// ── ONOS Publishers ───────────────────────────────────────────────────────────
export const ONOS_CFG = {
  fields: [
    { key: 'name',  label: 'Publisher Name', placeholder: 'IEEE Journals' },
    { key: 'url',   label: 'Publisher URL',  type: 'url', placeholder: 'https://ieeexplore.ieee.org/' },
    { key: 'order', label: 'Display Order',  placeholder: '1', rowStart: true },
  ],
  colHeaders: ['Publisher Name', 'URL', 'Order'],
  emptyRow:   { name: '', url: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.name}</strong></td>
    <td>{link(item.url)}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem', textAlign: 'center' }}>{item.order ?? '—'}</td>
  </>),
};

// ── PM Message ───────────────────────────────────────────────────────────────
export const PM_MSG_CFG = {
  fields: [
    { key: 'quote',     label: 'Quote Text',      type: 'textarea' },
    { key: 'name',      label: 'Person Name',      placeholder: "HON'BLE PM SHRI NARENDRA MODI" },
    { key: 'eventLink', label: 'Event Link (URL)', type: 'url', placeholder: 'https://www.pib.gov.in/…' },
    { key: 'imageUrl',  label: 'Person Image',     type: 'image' },
  ],
  colHeaders: ['Quote (preview)', 'Name', 'Event Link', 'Image'],
  emptyRow:   { quote: '', name: '', imageUrl: '', eventLink: '' },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.quote, 60)}</td>
    <td><strong>{item.name}</strong></td>
    <td>{link(item.eventLink)}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Home Ministers ───────────────────────────────────────────────────────────
export const MINISTER_CFG = {
  fields: [
    { key: 'name',     label: 'Minister Name',   placeholder: 'Shri Rajnath Singh' },
    { key: 'title',    label: 'Designation',      placeholder: "HON'BLE RAKSHA MANTRI" },
    { key: 'order',    label: 'Display Order',    type: 'number', placeholder: '1', rowStart: true },
    { key: 'imageUrl', label: 'Minister Photo',   type: 'image', rowEnd: true },
  ],
  colHeaders: ['Name', 'Designation', 'Order', 'Image'],
  emptyRow:   { name: '', title: '', imageUrl: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.name}</strong></td>
    <td style={{ color: '#6b7280' }}>{item.title}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Home Offerings (tabbed items) ───────────────────────────────────────────
const OFFERING_TAB_OPTIONS = ['schemes','vacancies','messageboard','events','keyproducts','productsexport'];

export const HOME_OFFERING_CFG = {
  fields: [
    { key: 'tab',   label: 'Tab Category', type: 'select', options: OFFERING_TAB_OPTIONS },
    { key: 'title', label: 'Item Title',   placeholder: 'ToT / DTTC / Akash' },
    { key: 'link',  label: 'Link (URL)',   type: 'url', placeholder: 'https://drdo.gov.in/…' },
    { key: 'order', label: 'Order',        type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Tab', 'Title', 'Link', 'Order'],
  emptyRow:   { tab: 'schemes', title: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td>{badge(item.tab, 'adm-badge-teal')}</td>
    <td><strong>{item.title}</strong></td>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── What's New ──────────────────────────────────────────────────────────────
export const WHATS_NEW_CFG = {
  fields: [
    { key: 'text',  label: 'Item Text', type: 'textarea' },
    { key: 'link',  label: 'Link (URL)', type: 'url', placeholder: 'https://…' },
    { key: 'order', label: 'Order', type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Text', 'Link', 'Order'],
  emptyRow:   { text: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.text, 70)}</td>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── Home Documents ──────────────────────────────────────────────────────────
export const HOME_DOC_CFG = {
  fields: [
    { key: 'title',    label: 'Document Title',    placeholder: 'DRDO in News' },
    { key: 'subtitle', label: 'Document Subtitle', placeholder: 'DRDO News - 05 to 19 June 2026' },
    { key: 'link',     label: 'Link (URL)',        type: 'url', placeholder: 'https://…' },
    { key: 'order',    label: 'Order',             type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Title', 'Subtitle', 'Link', 'Order'],
  emptyRow:   { title: '', subtitle: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.subtitle, 50)}</td>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── Home Personas ───────────────────────────────────────────────────────────
export const HOME_PERSONA_CFG = {
  fields: [
    { key: 'title',    label: 'Persona Title',  placeholder: 'Armed Force / Academia' },
    { key: 'link',     label: 'Link (URL)',     type: 'url', placeholder: 'https://…' },
    { key: 'order',    label: 'Order',          type: 'number', placeholder: '1', rowStart: true },
    { key: 'imageUrl', label: 'Persona Image',  type: 'image', rowEnd: true },
  ],
  colHeaders: ['Title', 'Link', 'Order', 'Image'],
  emptyRow:   { title: '', imageUrl: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Home Social Media ───────────────────────────────────────────────────────
export const HOME_SOCIAL_CFG = {
  fields: [
    { key: 'platform',   label: 'Platform Name',    placeholder: 'X / Facebook / Youtube' },
    { key: 'profileUrl', label: 'Profile Link',     type: 'url', placeholder: 'https://x.com/DRDO_India' },
    { key: 'order',      label: 'Order',            type: 'number', placeholder: '1', rowStart: true },
    { key: 'imageUrl',   label: 'Screenshot/Image', type: 'image', rowEnd: true },
  ],
  colHeaders: ['Platform', 'Profile URL', 'Order', 'Image'],
  emptyRow:   { platform: '', profileUrl: '', imageUrl: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.platform}</strong></td>
    <td>{link(item.profileUrl)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Home Media Slides ───────────────────────────────────────────────────────
export const HOME_MEDIA_SLIDE_CFG = {
  fields: [
    { key: 'link',     label: 'Product Link (URL)', type: 'url', placeholder: 'https://drdo.gov.in/…' },
    { key: 'order',    label: 'Order',               type: 'number', placeholder: '1', rowStart: true },
    { key: 'imageUrl', label: 'Slide Image',         type: 'image', rowEnd: true },
  ],
  colHeaders: ['Link', 'Order', 'Image'],
  emptyRow:   { imageUrl: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Home Bottom Links Carousel ──────────────────────────────────────────────
export const HOME_BOTTOM_LINK_CFG = {
  fields: [
    { key: 'link',     label: 'Destination URL',  type: 'url', placeholder: 'https://www.india.gov.in/' },
    { key: 'order',    label: 'Order',             type: 'number', placeholder: '1', rowStart: true },
    { key: 'imageUrl', label: 'Banner Image',      type: 'image', rowEnd: true },
  ],
  colHeaders: ['Link', 'Order', 'Image'],
  emptyRow:   { imageUrl: '', link: '', order: 0 },
  renderRow:  item => (<>
    <td>{link(item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
    <td>{link(item.imageUrl)}</td>
  </>),
};

// ── Our Team Members ────────────────────────────────────────────────────────
export const TEAM_CFG = {
  fields: [
    { key: 'name',        label: 'Name', placeholder: 'Dr. B K Das' },
    { key: 'designation', label: 'Designation', placeholder: 'Distinguished Scientist & Director General' },
    { key: 'category',    label: 'Category', type: 'select', options: ['Technical', 'Corporate', 'Nodal'], rowStart: true },
    { key: 'cluster',     label: 'Cluster / Directorate', placeholder: 'Electronics and Communication Systems (or - if Nodal)', rowEnd: true },
    { key: 'order',       label: 'Display Order', type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Name', 'Designation', 'Category', 'Cluster', 'Order'],
  emptyRow:   { name: '', designation: '', category: 'Technical', cluster: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.name}</strong></td>
    <td>{item.designation}</td>
    <td>{badge(item.category, item.category === 'Technical' ? 'adm-badge-blue' : item.category === 'Corporate' ? 'adm-badge-teal' : 'adm-badge-orange')}</td>
    <td>{item.cluster || '—'}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── Contact Us Items ─────────────────────────────────────────────────────────
export const CONTACT_CFG = {
  fields: [
    { key: 'label', label: 'Accordion Label / Query Description', type: 'textarea', placeholder: '1. DIIQM : For Queries Pertaining - Transfer of Technology...' },
    { key: 'org',   label: 'Organisation Name', placeholder: 'Directorate of Industry Interface & Quality Management (DIIQM)' },
    { key: 'phone', label: 'Phone Number(s)', placeholder: '011 - 23013209', rowStart: true },
    { key: 'email', label: 'Email Address(es)', placeholder: 'director-diiqm-hqr@gov.in', rowEnd: true },
    { key: 'order', label: 'Display Order', type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Label Description', 'Organisation', 'Phone', 'Email', 'Order'],
  emptyRow:   { label: '', org: '', phone: '', email: '', order: 0 },
  renderRow:  item => (<>
    <td className="trunc">{trunc(item.label, 50)}</td>
    <td><strong>{item.org}</strong></td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.phone || '—'}</td>
    <td style={{ color: '#6b7280', fontSize: '0.8rem' }}>{item.email || '—'}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── RTI Statistics ───────────────────────────────────────────────────────────
export const RTI_STATS_CFG = {
  fields: [
    { key: 'title',  label: 'Card Title / Category', placeholder: 'RTI Applications' },
    { key: 'label1', label: 'Row 1 Label', placeholder: 'Received', rowStart: true },
    { key: 'value1', label: 'Row 1 Value', placeholder: '579', rowEnd: true },
    { key: 'label2', label: 'Row 2 Label', placeholder: 'Disposed / Orders Issued', rowStart: true },
    { key: 'value2', label: 'Row 2 Value', placeholder: '565', rowEnd: true },
    { key: 'order',  label: 'Display Order', type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Category', 'Row 1 (Label: Val)', 'Row 2 (Label: Val)', 'Order'],
  emptyRow:   { title: '', label1: 'Received', value1: '0', label2: 'Disposed', value2: '0', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td style={{ fontSize: '0.8rem' }}>{item.label1}: <span style={{ color: '#1e4e8c', fontWeight: 'bold' }}>{item.value1}</span></td>
    <td style={{ fontSize: '0.8rem' }}>{item.label2}: <span style={{ color: '#1e4e8c', fontWeight: 'bold' }}>{item.value2}</span></td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};

// ── RTI Documents ────────────────────────────────────────────────────────────
export const RTI_DOCS_CFG = {
  fields: [
    { key: 'title',       label: 'Document Title', placeholder: 'RTI Officials at DRDO HQ' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'List of PIOs & First Appellate Authorities...' },
    { key: 'link',        label: 'External Link / PDF URL', type: 'url', placeholder: 'https://…' },
    { key: 'fileUrl',     label: 'Upload PDF File', type: 'pdf' },
    { key: 'order',       label: 'Display Order', type: 'number', placeholder: '1' },
  ],
  colHeaders: ['Title', 'Description', 'Link', 'Order'],
  emptyRow:   { title: '', description: '', link: '', fileUrl: '', order: 0 },
  renderRow:  item => (<>
    <td><strong>{item.title}</strong></td>
    <td className="trunc" style={{ color: '#6b7280' }}>{trunc(item.description, 50)}</td>
    <td>{link(item.fileUrl || item.link)}</td>
    <td style={{ color: '#6b7280', textAlign: 'center' }}>{item.order}</td>
  </>),
};
