// pages/api/getCalendarEvents.js
import admin from '../firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    const db = admin.firestore();
    const snapshot = await db.collection('calendarEvents').get();

    // Zložíme pole udalostí
    const events = [];
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Chyba pri získavaní udalostí:', error);
    return res.status(500).json({ error: 'Niečo sa pokazilo pri získavaní udalostí.' });
  }
}
