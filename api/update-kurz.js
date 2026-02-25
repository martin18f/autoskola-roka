// Príklad s Next.js v /pages/api/update-kurz.js
import admin from '../firebaseAdmin.js';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1) Načítame text z req.body
    const { kurz } = req.body;

    // 2) Vygenerujeme cestu k data.json (závisí od projektu)
    const dataFilePath = path.join(process.cwd(), 'public', 'data.json');

    // 3) Zapíšeme do data.json nový obsah
    const newData = { kurz };
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');

    // 4) Hotovo
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Chyba pri update textu:', error);
    return res.status(500).json({ error: 'Niečo sa pokazilo' });
  }
}
