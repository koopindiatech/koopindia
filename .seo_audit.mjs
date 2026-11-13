import { readFileSync } from 'fs';

const gstPage = readFileSync('koop-india/app/gst-registration/page.jsx', 'utf8');
const gstContent = readFileSync('koop-india/app/documentation-compliance/gst-registration/GSTContent.jsx', 'utf8');
const tmPage = readFileSync('koop-india/app/trademark-registration/page.jsx', 'utf8');
const tmContent = readFileSync('koop-india/app/trademark-registration/TrademarkContent.jsx', 'utf8');
const webLayout = readFileSync('koop-india/app/website-development/layout.jsx', 'utf8');
const webPage = readFileSync('koop-india/app/website-development/page.jsx', 'utf8');

const schemas = ['Service','FAQPage','BreadcrumbList','LocalBusiness','HowTo','Organization','AggregateRating','ItemList','SpeakableSpecification'];
console.log('=== SCHEMA COVERAGE ===');
schemas.forEach(s => {
  const inGST = gstPage.includes(s);
  const inTM = tmPage.includes(s);
  const inWeb = webLayout.includes(s);
  console.log(s.padEnd(30) + '| GST:' + (inGST?'✓':'✗') + ' TM:' + (inTM?'✓':'✗') + ' WEB:' + (inWeb?'✓':'✗'));
});

console.log('\n=== GST FAQ COUNT ===');
console.log('Schema FAQs in page.jsx:', (gstPage.match(/@type.*Question/g)||[]).length);
console.log('Content FAQs (GSTContent):', (gstContent.match(/\{ q:/g)||[]).length);

console.log('\n=== TRADEMARK FAQ COUNT ===');
console.log('Schema FAQs in page.jsx:', (tmPage.match(/@type.*Question/g)||[]).length);
console.log('Content FAQs (TrademarkContent):', (tmContent.match(/\{ q:/g)||[]).length);

console.log('\n=== WEBSITE FAQ COUNT ===');
console.log('Schema FAQs in layout.jsx:', (webLayout.match(/@type.*Question/g)||[]).length);
console.log('Content FAQs (page.jsx):', (webPage.match(/\{ q:/g)||[]).length);

console.log('\n=== METADATA QUALITY ===');
const gstTitle = gstPage.match(/title:\s*"([^"]+)"/)?.[1] || 'NOT FOUND';
const tmTitle = tmPage.match(/title:\s*"([^"]+)"/)?.[1] || 'NOT FOUND';
const webTitle = webLayout.match(/title:\s*"([^"]+)"/)?.[1] || 'NOT FOUND';
console.log('GST title length:', gstTitle.length, '| title:', gstTitle.substring(0,70));
console.log('TM title length:', tmTitle.length, '| title:', tmTitle.substring(0,70));
console.log('WEB title length:', webTitle.length, '| title:', webTitle.substring(0,70));

const gstDesc = gstPage.match(/description:\s*"([^"]+)"/)?.[1] || '';
const tmDesc = tmPage.match(/description:\s*"([^"]+)"/)?.[1] || '';
const webDesc = webLayout.match(/description:\s*"([^"]+)"/)?.[1] || '';
console.log('\nGST desc length:', gstDesc.length, '(ideal 150-160)');
console.log('TM desc length:', tmDesc.length, '(ideal 150-160)');
console.log('WEB desc length:', webDesc.length, '(ideal 150-160)');

console.log('\n=== MISSING POWER SEO ELEMENTS ===');
const missing = [];
if (!gstPage.includes('sameAs')) missing.push('GST: sameAs social links');
if (!tmPage.includes('sameAs')) missing.push('TM: sameAs social links');
if (!webLayout.includes('sameAs')) missing.push('WEB: sameAs social links');
if (!gstPage.includes('openingHours')) missing.push('GST: openingHours');
if (!tmPage.includes('openingHours')) missing.push('TM: openingHours');
if (!webLayout.includes('openingHours')) missing.push('WEB: openingHours');
if (!gstPage.includes('review')) missing.push('GST: Review schema');
if (!tmPage.includes('review')) missing.push('TM: Review schema');
if (!webLayout.includes('review')) missing.push('WEB: Review schema');
if (!gstPage.includes('ItemList')) missing.push('GST: ItemList schema (top services)');
if (!tmPage.includes('ItemList')) missing.push('TM: ItemList schema');
if (!webLayout.includes('ItemList')) missing.push('WEB: ItemList schema');
if (!gstPage.includes('speakable')) missing.push('GST: Speakable schema (voice search)');
if (!tmPage.includes('speakable')) missing.push('TM: Speakable schema');
if (!webLayout.includes('speakable')) missing.push('WEB: Speakable schema');
missing.forEach(m => console.log('  MISSING: ' + m));

