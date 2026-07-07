// One-time seed script for Offerings: Schemes, Industry Support, Competitions, Products
const mongoose = require('mongoose');
const { SchemeService, IndustrySupport, CompetitionAward, Product } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/drdo_admin').then(async () => {
  const schemes = await SchemeService.countDocuments();
  const support = await IndustrySupport.countDocuments();
  const awards = await CompetitionAward.countDocuments();
  const products = await Product.countDocuments();

  if (schemes === 0) {
    await SchemeService.insertMany([
      { title: "DTTC", desc: "Defence Technology & Test Centre (DTTC)", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dttc" },
      { title: "DIA-CoEs", desc: "DRDO Industry Academia Centre of Excellence (DIA-CoEs)", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/dia-coes" },
      { title: "TDF Projects", desc: "The Technology Development Fund (TDF)", link: "https://drdo.gov.in/drdo/en/offerings/projects" },
      { title: "Technology Foresight", desc: "Technology Foresight details", link: "https://drdo.gov.in/drdo/en/offerings/technology-foresight" },
      { title: "Certification Services", desc: "Certification Services", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/certification-services" }
    ]);
    console.log('✅ Schemes seeded');
  }

  if (support === 0) {
    await IndustrySupport.insertMany([
      { title: "ToT", desc: "Transfer of Technologies", link: "https://drdo.gov.in/drdo/en/offerings/transfer-of-technologies" },
      { title: "Export - support", desc: "DRDO support industries in evolving the specifications of the export variant of the products (based on DRDO technology) to enable industries.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/export-support" },
      { title: "Startups Support", desc: "Spearheading the innovations under 'Make in India' programme through Technology Development Fund (TDF) and DRDO laboratories.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/startups-support" },
      { title: "Test Facilities", desc: "DRDO is developing critical defence technologies and systems to cater to the needs of Indian Armed Forces and other agencies.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/test-facilities" },
      { title: "Industry Interaction Group", desc: "Industry interaction initiatives, MoUs, seminars and vendor collaboration programmes.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/industry-interaction-group" },
      { title: "Products for Export", desc: "Catalogue of DRDO developed products cleared for export to friendly foreign nations.", link: "https://drdo.gov.in/drdo/en/offerings/schemes-and-services/product-export" }
    ]);
    console.log('✅ Industry support seeded');
  }

  if (awards === 0) {
    await CompetitionAward.insertMany([
      { title: "National Technology Award", desc: "Award given to outstanding technology innovators and leaders.", link: "#", date: "11/05/2026", isArchive: false },
      { title: "DRDO Student Innovation Contest", desc: "Encouraging young innovators in defence sciences.", link: "#", date: "24/04/2026", isArchive: true }
    ]);
    console.log('✅ Competitions & awards seeded');
  }

  if (products === 0) {
    await Product.insertMany([
      { title: 'High-g MEMS switches', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/mems.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/high-g-mems-switches' },
      { title: 'Pru-Decorp', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/pru.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/pru-decorp-tm-and-pru-decorp-mg' },
      { title: 'KADAM', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/kadam.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/kadam' },
      { title: 'ACADA', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/acada.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/automatic-chemical-agent-detector-alarm-acada' },
      { title: 'HAPO Chamber', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/hapo.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/high-altitude-pulmonary-oedema-hapo-chamber' },
      { title: 'AIP System (Air Independent Propulsion)', imageUrl: 'https://drdo.gov.in/drdo/sites/default/files/styles/card_image/public/products/aip.jpg', link: 'https://drdo.gov.in/drdo/en/offerings/products/air-independent-propulsion-aip-system' },
    ]);
    console.log('✅ Products seeded');
  }

  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
