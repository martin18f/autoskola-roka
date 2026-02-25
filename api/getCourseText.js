import admin from '../firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const db = admin.firestore();
    const docRef = db.collection('settings').doc('kurzText');
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // Ak záznam ešte neexistuje, vrátime nejaké "default"
      return res.status(200).json({ value: 'Zatiaľ nie je nastavený žiadny termín kurzu.' });
    }

    // Z Firestore
    const data = docSnap.data();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chyba pri čítaní textu z Firestore:', error);
    return res.status(500).json({ error: 'Nastala chyba pri načítaní textu' });
  }
}
