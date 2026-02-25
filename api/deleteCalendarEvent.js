// pages/api/deleteCalendarEvent.js
import admin from '../firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing id param' });
    }
    const db = admin.firestore();
    await db.collection('calendarEvents').doc(id).delete();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Chyba pri mazaní:', err);
    return res.status(500).json({ error: 'Chyba pri mazaní' });
  }
}
