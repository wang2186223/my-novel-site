import { NextResponse } from 'next/server';

const BASE_URL = 'https://myfreenovel.com';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);   // ← 只留这一行取 id
  const PER_FILE = 5000;
  const start = (id - 1) * PER_FILE + 1;

  const urls = Array.from({ length: PER_FILE }, (_, i) => {
    const cid = String(start + i).padStart(3, '0');
    return `
  <url>
    <loc>${BASE_URL}/novel/slime/${cid}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}