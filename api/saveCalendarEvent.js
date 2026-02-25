// pages/api/saveCalendarEvent.js
import admin from '../firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { day, month, year, title } = req.body;

    // Kontrola vstupov
    if (!day || !month || !year || !title) {
      return res.status(400).json({ error: 'Neplatné dáta - chýba day, month, year alebo title.' });
    }

    const db = admin.firestore();
    // Pridáme nový dokument do kolekcie "calendarEvents"
    const newDocRef = await db.collection('calendarEvents').add({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      title: title
    });

    return res.status(200).json({ success: true, id: newDocRef.id });
  } catch (error) {
    console.error('Chyba pri ukladaní udalosti:', error);
    return res.status(500).json({ error: 'Nastala chyba pri ukladaní udalosti.' });
  }
}
