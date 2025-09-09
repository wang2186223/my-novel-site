/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextResponse } from 'next/server';

const BASE_URL = 'https://myfreenovel.com';   // 正式域名
const TOTAL_CHAPS = 200000;
const PER_FILE = 5000;

export async function GET() {
  const files = Math.ceil(TOTAL_CHAPS / PER_FILE);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: files }, (_, i) => `
  <sitemap>
    <loc>${BASE_URL}/sitemap-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}