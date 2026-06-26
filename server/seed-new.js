// One-time seed script for Avalanche Bulletin and Forms & Manuals
const mongoose = require('mongoose');
const { AvalancheBulletin, FormManual } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/drdo_admin').then(async () => {
  const ava = await AvalancheBulletin.countDocuments();
  const fm  = await FormManual.countDocuments();

  if (ava === 0) {
    await AvalancheBulletin.insertMany([
      { title: 'Avalanche Warning Bulletin - 03 June 2026', date: '03-06-2026', timestamp: 1780512000, size: '745.46 KB', fileUrl: '', link: '' },
      { title: 'Closing of Operational Avalanche Forecasting Services for Winter Season 2025-26', date: '03-06-2026', timestamp: 1780512000, size: '409.91 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 02 June 2026', date: '02-06-2026', timestamp: 1780425600, size: '720.12 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 01 June 2026', date: '01-06-2026', timestamp: 1780339200, size: '710.45 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 31 May 2026',  date: '31-05-2026', timestamp: 1780252800, size: '690.30 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 30 May 2026',  date: '30-05-2026', timestamp: 1780166400, size: '730.22 KB', fileUrl: '', link: '' },
      { title: 'Avalanche Warning Bulletin - 29 May 2026',  date: '29-05-2026', timestamp: 1780080000, size: '702.15 KB', fileUrl: '', link: '' },
    ]);
    console.log('✅ Avalanche Bulletins seeded');
  } else { console.log(`⏭  Avalanche already has ${ava} records`); }

  if (fm === 0) {
    await FormManual.insertMany([
      { title: 'Project Closure Form',                            docNo: '—',       type: 'Forms',   category: 'DIA-CoEs',    size: '180.45 KB', fileUrl: '', link: '' },
      { title: 'Summary of Proposal Basic Information - Form 1',  docNo: 'Form 1*', type: 'Forms',   category: 'DIA-CoEs',    size: '240.12 KB', fileUrl: '', link: '' },
      { title: 'Guidelines for DIA-CoE Research Proposals',       docNo: '—',       type: 'Manuals', category: 'DIA-CoEs',    size: '1.20 MB',   fileUrl: '', link: '' },
      { title: 'Research Grant Application Form',                  docNo: 'ER-03',   type: 'Forms',   category: 'ER&IPR',      size: '350.55 KB', fileUrl: '', link: '' },
      { title: 'Procurement Manual 2025',                          docNo: '—',       type: 'Manuals', category: 'Procurement', size: '4.80 MB',   fileUrl: '', link: '' },
      { title: 'Utilization Certificate Form',                     docNo: 'Form 5',  type: 'Forms',   category: 'ER&IPR',      size: '120.30 KB', fileUrl: '', link: '' },
      { title: 'Detailed Proposal Submission Format - Form 2',     docNo: 'Form 2',  type: 'Forms',   category: 'DIA-CoEs',    size: '290.40 KB', fileUrl: '', link: '' },
      { title: 'Vendor Registration Form',                         docNo: 'PM-02',   type: 'Forms',   category: 'Procurement', size: '185.00 KB', fileUrl: '', link: '' },
      { title: 'Financial Powers of DRDO Directors (DFPR-2024)',   docNo: '—',       type: 'Manuals', category: 'Admin',       size: '2.50 MB',   fileUrl: '', link: '' },
      { title: 'Quarterly Progress Report Format',                 docNo: 'Form 4',  type: 'Forms',   category: 'ER&IPR',      size: '145.22 KB', fileUrl: '', link: '' },
      { title: 'Prototype / Hardware Engineering Model - Form 5F', docNo: 'Form 5F', type: 'Forms',   category: 'DIA-CoEs',    size: '150.32 KB', fileUrl: '', link: '' },
      { title: 'Lab Infrastructure Upgrade - Form 5G',             docNo: 'Form 5G', type: 'Forms',   category: 'DIA-CoEs',    size: '210.15 KB', fileUrl: '', link: '' },
      { title: 'Details of Procured Services - Form 5H',           docNo: 'Form 5H', type: 'Forms',   category: 'DIA-CoEs',    size: '180.20 KB', fileUrl: '', link: '' },
      { title: 'Workshop / Conference - Form 5i',                  docNo: 'Form 5i', type: 'Forms',   category: 'DIA-CoEs',    size: '125.40 KB', fileUrl: '', link: '' },
      { title: 'Cost Estimation for Research Staff - Form 5J',     docNo: 'Form 5J', type: 'Forms',   category: 'DIA-CoEs',    size: '145.00 KB', fileUrl: '', link: '' },
    ]);
    console.log('✅ Forms & Manuals seeded');
  } else { console.log(`⏭  Forms already has ${fm} records`); }

  process.exit(0);
}).catch(e => { console.error(e); process.exit(1); });
