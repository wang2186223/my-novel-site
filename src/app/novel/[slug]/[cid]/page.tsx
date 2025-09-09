import { promises as fs } from 'fs';
import path from 'path';

export default async function ChapterPage({ params }: { params: { slug: string; cid: string } }) {
  const { slug, cid } = params;
  // 本地样本，先用 public 文件夹
  const filePath = path.join(process.cwd(), 'public', 'novels', slug, `${cid}.txt`);
  let text = '';
  try {
    text = await fs.readFile(filePath, 'utf-8');
  } catch {
    text = 'Chapter not found.';
  }
  return (
    <main className="p-8 max-w-3xl mx-auto text-lg leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Chapter {cid}</h1>
      <pre className="whitespace-pre-wrap font-sans">{text}</pre>
    </main>
  );
}