import admin from '../firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { kurz } = req.body; // Text, ktorý chceme uložiť
    
    // Firestore db inštancia
    const db = admin.firestore();

    // Uložíme do kolekcie "settings", dokument "kurzText"
    await db.collection('settings').doc('kurzText').set({
      value: kurz
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Chyba pri ukladaní textu do Firestore:', error);
    return res.status(500).json({ error: 'Nastala chyba pri ukladaní textu' });
  }
}
