import { db } from './db.js';

db.prepare(`
  UPDATE invitation_settings 
  SET brideName = 'Amina',
      groomName = 'Muhammad',
      bridePhoto = '/assets/sample-couple.jpg',
      groomPhoto = '/assets/sample-couple.jpg',
      weddingDate = '2026-09-21',
      weddingTime = '19:00',
      venueName = 'Yakkasaroy to‘yxonasi',
      venueAddress = 'Toshkent shahri, Yakkasaroy to‘yxonasi',
      mapUrl = 'https://www.google.com/maps/search/?api=1&query=Yakkasaroy+to%27yxonasi',
      invitationText = 'Hurmatli aziz mehmonimiz!\n\nSizni Muhammad va Aminaning nikoh to‘yi munosabati bilan quvonchli marosimimizga taklif etamiz. Quvonchimizga sherik bo‘ling!',
      parentsNames = 'Botirovlar oilasi',
      musicTrack = '/assets/yor-yor-BtPjvRN1.mp3',
      musicTitle = 'Yor-yor an''anaviy to‘y musiqasi'
  WHERE id = 'main'
`).run();

console.log('Database successfully updated with authentic defaults!');
